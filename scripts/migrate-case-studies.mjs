#!/usr/bin/env node
/**
 * Migrates Webflow case-study HTML snapshots into local fragments + images.
 * Usage: node scripts/migrate-case-studies.mjs [slug ...]
 */
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const REF = join(ROOT, "reference");
const OUT_HTML = join(ROOT, "src", "content", "case-studies");
const OUT_IMG = join(ROOT, "public", "images", "case-studies");

const DEFAULT_SLUGS = [
  "feltspace",
  "bone-hunters",
  "community-threads",
  "lavender-haze",
  "spatial",
  "levelten-energy",
  "drift",
  "sentimental-cloud",
  "noya",
];

function safeName(url) {
  try {
    const u = new URL(url);
    let name = decodeURIComponent(u.pathname.split("/").pop() || "asset");
    name = name.replace(/[^a-zA-Z0-9._-]+/g, "-");
    return name || `asset-${Math.random().toString(36).slice(2)}`;
  } catch {
    return `asset-${Math.random().toString(36).slice(2)}`;
  }
}

async function download(url, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(dest) && (await import("node:fs")).statSync(dest).size > 0) {
    return;
  }
  const fetchUrl = url.replaceAll(" ", "%20");
  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!m) throw new Error("no body");
  let body = m[1];
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  // Drop Webflow home button — we render our own
  body = body.replace(
    /<a[^>]*class="[^"]*home-button[^"]*"[\s\S]*?<\/a>/i,
    "",
  );
  // Drop footer/nav chrome if present at end
  body = body.replace(/<div class="footer[\s\S]*$/i, "");
  return body.trim();
}

function collectCdnUrls(html) {
  const urls = new Set();
  const starts = [];
  const needle = "https://cdn.prod.website-files.com/";
  let idx = 0;
  while ((idx = html.indexOf(needle, idx)) !== -1) {
    starts.push(idx);
    idx += needle.length;
  }
  for (const s of starts) {
    const chunk = html.slice(s, s + 800);
    let end = chunk.length;
    for (const delim of ['"', "'", "&quot;", "<"]) {
      const i = chunk.indexOf(delim);
      if (i !== -1) end = Math.min(end, i);
    }
    const piece = chunk.slice(0, end).replace(/&amp;/g, "&");
    for (const part of piece.split(",")) {
      let u = part.trim().replace(/[,;.)]+$/, "");
      if (!u.startsWith("http")) continue;
      if (/\.(js|css)(\?|$)/i.test(u)) continue;
      // drop srcset density descriptors accidentally glued on
      u = u.replace(/\s+\d+w$/, "").trim();
      urls.add(u);
    }
  }
  return [...urls];
}

async function migrateSlug(slug) {
  const srcPath = join(REF, `page-${slug}.html`);
  if (!existsSync(srcPath)) {
    console.warn(`skip missing ${srcPath}`);
    return null;
  }

  const raw = readFileSync(srcPath, "utf8");
  const titleMatch = raw.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : slug;

  let body = extractBody(raw);
  const urls = collectCdnUrls(body);
  const imgDir = join(OUT_IMG, slug);
  mkdirSync(imgDir, { recursive: true });

  /** @type {Map<string, string>} */
  const map = new Map();
  let i = 0;
  for (const url of urls) {
    i += 1;
    const name = safeName(url);
    const dest = join(imgDir, name);
    try {
      await download(url, dest);
      map.set(url, `/images/case-studies/${slug}/${name}`);
      // also map amp-encoded form
      map.set(url.replace(/&/g, "&amp;"), `/images/case-studies/${slug}/${name}`);
      process.stdout.write(`\r${slug}: ${i}/${urls.length} assets`);
    } catch (err) {
      console.warn(`\nfail ${slug} ${name}: ${err.message}`);
    }
  }
  console.log(`\n${slug}: downloaded ${map.size / 2} mappings`);

  // Rewrite longest URLs first to avoid partial replaces
  const sorted = [...map.keys()].sort((a, b) => b.length - a.length);
  for (const from of sorted) {
    const to = map.get(from);
    body = body.split(from).join(to);
  }

  // Remove leftover srcset CDN entries that failed / weren't mapped
  body = body.replace(
    /\s+srcset="[^"]*cdn\.prod\.website-files\.com[^"]*"/gi,
    "",
  );
  body = body.replace(
    /\s+sizes="[^"]*"/gi,
    "",
  );

  // Normalize empty alts already fine
  mkdirSync(OUT_HTML, { recursive: true });
  const outPath = join(OUT_HTML, `${slug}.html`);
  writeFileSync(outPath, body);

  const meta = { slug, title, assetCount: urls.length };
  writeFileSync(join(OUT_HTML, `${slug}.json`), JSON.stringify(meta, null, 2));
  return meta;
}

async function main() {
  const slugs = process.argv.slice(2);
  const list = slugs.length ? slugs : DEFAULT_SLUGS;
  const results = [];
  for (const slug of list) {
    results.push(await migrateSlug(slug));
  }
  writeFileSync(
    join(OUT_HTML, "index.json"),
    JSON.stringify(results.filter(Boolean), null, 2),
  );
  console.log("done", results.filter(Boolean).map((r) => r.slug).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
