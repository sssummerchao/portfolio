import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.notwinter.me";
  const pages = ["qlo", ...caseStudySlugs];
  return [
    { url: base, lastModified: new Date() },
    ...pages.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
