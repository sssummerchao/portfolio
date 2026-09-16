import { CaseStudyHtml } from "@/components/CaseStudyHtml";
import {
  caseStudySlugs,
  isCaseStudySlug,
  type CaseStudySlug,
} from "@/content/projects";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";

const titles: Record<CaseStudySlug, string> = {
  feltspace: "FeltSpace",
  "bone-hunters": "The Bone Hunters",
  "community-threads": "Community Threads",
  "lavender-haze": "Lavender Haze",
  spatial: "Spatial++",
  "levelten-energy": "LevelTen Energy",
  "sentimental-cloud": "Sentimental Cloud",
  noya: "Noya",
};

function loadCaseStudyHtml(slug: string) {
  const path = join(process.cwd(), "src/content/case-studies", `${slug}.html`);
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) return {};
  return { title: titles[slug] };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) notFound();

  const html = loadCaseStudyHtml(slug);
  if (!html) notFound();

  return <CaseStudyHtml title={titles[slug]} html={html} />;
}
