#!/usr/bin/env node
/**
 * Downloads media + shared CSS from the live Webflow site into this repo.
 * Run before canceling Webflow: `npm run assets:download`
 */
import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

const SITE = "https://www.notwinter.me";
const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const OUT_IMAGES = join(ROOT, "public", "images");
const OUT_PROJECTS = join(OUT_IMAGES, "projects");
const OUT_RAW = join(OUT_IMAGES, "raw");
const OUT_REF = join(ROOT, "reference");

const PAGES = [
  "/",
  "/feltspace",
  "/lavender-haze",
  "/spatial",
  "/qlo",
  "/drift",
  "/sentimental-cloud",
  "/community-threads",
  "/bone-hunters",
  "/noya",
  "/levelten-energy",
];

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function download(url, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(dest)) {
    console.log(`skip  ${dest}`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log(`saved ${dest}`);
}

function collectAssetUrls(html) {
  const urls = new Set();
  // Stop at quotes/whitespace only so filenames with () stay intact
  const re = /https:\/\/cdn\.prod\.website-files\.com\/[^\s"']+/g;
  for (const match of html.matchAll(re)) {
    const cleaned = match[0].replace(/&amp;/g, "&").replace(/[,;]+$/, "");
    // Skip Webflow runtime JS — we are not shipping their scripts
    if (/\.js(\?|$)/i.test(cleaned)) continue;
    urls.add(cleaned);
  }
  return urls;
}

function safeName(url) {
  const u = new URL(url);
  return decodeURIComponent(u.pathname.split("/").pop() || "asset");
}

async function loadProjectMap() {
  const projectsPath = join(ROOT, "src", "content", "projects.ts");
  const src = await (await import("node:fs/promises")).readFile(
    projectsPath,
    "utf8",
  );
  const entries = [];
  const blockRe =
    /id:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?sourceImage:\s*\n?\s*"([^"]+)"/g;
  for (const match of src.matchAll(blockRe)) {
    entries.push({
      id: match[1],
      image: match[2],
      sourceImage: match[3],
    });
  }
  return entries;
}

async function main() {
  mkdirSync(OUT_PROJECTS, { recursive: true });
  mkdirSync(OUT_RAW, { recursive: true });
  mkdirSync(OUT_REF, { recursive: true });

  const allUrls = new Set();
  for (const path of PAGES) {
    const url = `${SITE}${path === "/" ? "/" : path}`;
    console.log(`scan  ${url}`);
    const html = await fetchText(url);
    writeFileSync(
      join(
        OUT_REF,
        `page${path === "/" ? "-home" : path.replaceAll("/", "-")}.html`,
      ),
      html,
    );
    for (const asset of collectAssetUrls(html)) allUrls.add(asset);
  }

  const cssUrl = [...allUrls].find((u) => u.includes(".css"));
  if (cssUrl) {
    const css = await fetchText(cssUrl);
    writeFileSync(join(OUT_REF, "webflow.shared.css"), css);
    console.log("saved reference/webflow.shared.css");
  }

  for (const url of allUrls) {
    if (url.includes(".css")) continue;
    try {
      await download(url, join(OUT_RAW, safeName(url)));
    } catch (err) {
      console.warn(`fail  ${url}: ${err.message}`);
    }
  }

  const map = await loadProjectMap();
  for (const item of map) {
    const ext = extname(new URL(item.sourceImage).pathname) || ".bin";
    const dest = join(ROOT, "public", item.image.replace(/^\//, ""));
    try {
      await download(item.sourceImage, dest);
    } catch (err) {
      console.warn(`fail  ${item.id}${ext}: ${err.message}`);
    }
  }

  // Favicons
  const favicon =
    "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6522ffc8fe162ad420f79d92_logo%201.png";
  await download(favicon, join(OUT_IMAGES, "favicon.png"));

  console.log(`\nDone. ${allUrls.size} CDN URLs found; ${map.length} project images mapped.`);
  console.log("Snapshots: reference/");
  console.log("Raw dump: public/images/raw/");
  console.log("Named cards: public/images/projects/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
