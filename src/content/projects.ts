export type ProjectLink =
  | { kind: "internal"; href: string }
  | { kind: "external"; href: string };

export type ImageAspect = "1" | "3/2" | "4/3" | "16/15" | "16/9" | "auto";

export type Project = {
  /** Unique id for React keys (some projects appear multiple times with different angles) */
  id: string;
  title: string;
  tag: string;
  award?: string;
  /** Local path under /public once assets are downloaded */
  image: string;
  /** Original Webflow CDN URL — used by assets:download mapping */
  sourceImage: string;
  link: ProjectLink;
  column: "left" | "middle" | "right";
  /** Grid media aspect — left/middle use 4/3; right uses 16/15 to even column bottoms */
  aspect: ImageAspect;
};

function toLink(href: string): ProjectLink {
  if (href.startsWith("http") && !href.includes("notwinter.me")) {
    return { kind: "external", href: href.replaceAll("&amp;", "&") };
  }
  const path = href.replace("https://www.notwinter.me", "");
  return { kind: "internal", href: path };
}

/**
 * Inventory from https://www.notwinter.me/ (3-column grid).
 * Image paths point at public/images/projects/* after download + rename.
 */
export const projects: Project[] = [
  {
    id: "feltspace",
    title: "Ambient Co-Presence",
    tag: "Emotional Communication Devices",
    image: "/images/projects/feltspace.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6a0c8733fa6568b266988452_IMG%202709%20optimized.gif",
    link: toLink("/feltspace"),
    column: "left",
    aspect: "4/3",
  },
  {
    id: "cyclist-safety",
    title: "Real Time Sensing System for Cyclist Safety",
    tag: "Machine Learning / Embedded Sensor",
    image: "/images/projects/cyclist-safety.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6a0c7ad4cb182d5805b153ef_Carr%20Animated%20GIF.gif",
    link: toLink(
      "https://drive.google.com/file/d/1u-IaH0O3K0RgmTTp6YyOSwgyMSxzvjjC/view?usp=sharing",
    ),
    column: "left",
    aspect: "4/3",
  },
  {
    id: "bone-hunters-table",
    title: "The Bone Hunters",
    tag: "Interactive Table  / Prototyping",
    award: "🏆 Core77 / Indigo / MUSE",
    image: "/images/projects/bone-hunters-table.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6778a662878bfd727a62e3e4_Bone6.gif",
    link: toLink("/bone-hunters#interactive-table"),
    column: "left",
    aspect: "4/3",
  },
  {
    id: "qlo-mirror",
    title: "Qlo",
    tag: "Smart Mirror  / Prototyping",
    image: "/images/projects/qlo-mirror.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6775dea0a262e00a404a0504_mirror%20outfit.gif",
    link: toLink("/qlo#mirror"),
    column: "left",
    aspect: "4/3",
  },
  {
    id: "community-threads-interface",
    title: "Community Threads",
    tag: "Interface Design  / Prototyping",
    image: "/images/projects/community-threads-interface.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/695ec479468d137c9573ae17_quizz.gif",
    link: toLink("/community-threads#fabric-table"),
    column: "left",
    aspect: "4/3",
  },
  {
    id: "backbone-plm",
    title: "Backbone PLM",
    tag: "Enterprise SaaS",
    image: "/images/projects/backbone-plm.png",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/695f18a4ee9b22c13c18c944_c8f10e22f0c51f6e0b55d3683906937f_bb.png",
    link: toLink("https://bamboorose.com/backbone/"),
    column: "left",
    aspect: "4/3",
  },
  {
    id: "lavender-haze",
    title: "Lavender Haze",
    tag: "IoT Devices",
    image: "/images/projects/lavender-haze.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6948330a7f5690871a616714_lav3.gif",
    link: toLink("/lavender-haze"),
    column: "middle",
    aspect: "4/3",
  },
  {
    id: "spatial",
    title: "Spatial++",
    tag: "Real Time GenAI Interaction",
    image: "/images/projects/spatial.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6a0ea3b61ed67693be5ca5c7_Convert%20to%20MP4%20May%2021%202026.gif",
    link: toLink("/spatial"),
    column: "middle",
    aspect: "4/3",
  },
  {
    id: "community-threads-table",
    title: "Community Threads",
    tag: "Interactive Table  / Prototyping",
    image: "/images/projects/community-threads-table.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/694476ae3fbb1d0d559ad539_fabric1.gif",
    link: toLink("/community-threads#fabric-table"),
    column: "middle",
    aspect: "4/3",
  },
  {
    id: "qlo-conversation",
    title: "Qlo",
    tag: "Conversation AI",
    image: "/images/projects/qlo-cover.jpg",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/695f0ccb229b54c622ac4678_qlo1.png",
    link: toLink("/qlo"),
    column: "middle",
    aspect: "16/9",
  },
  {
    id: "dear-future",
    title: "Dear Future",
    tag: "Speculative Design",
    award: "🏆 FigBuild 2025 CMU winner",
    image: "/images/projects/dear-future.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/695eb84d09fff72d685a271c_dear%20future.gif",
    link: toLink(
      "https://www.figma.com/proto/NQ7abvu9Ra4NIoS4i6vXU7/%E7%A7%98%E5%AF%86%E5%B0%8F%E6%97%A5%E8%A8%98-%F0%9F%AB%A6?page-id=25%3A566&node-id=52-1805&p=f&viewport=1315%2C-868%2C0.37&t=4w9r4aHVV7l8lJqG-1&scaling=scale-down-width&content-scaling=fixed",
    ),
    column: "middle",
    aspect: "4/3",
  },
  {
    id: "drift",
    title: "Drift",
    tag: "Browser Extension  / Creative Coding",
    image: "/images/projects/drift.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6a0c8196b86726fe636b16ff_Screen%20Recording%20Aug%2025%20from%20ezgif.gif",
    link: toLink("https://www.youtube.com/watch?v=n4d6gTFTqmE"),
    column: "middle",
    aspect: "4/3",
  },
  {
    id: "sentimental-cloud",
    title: "Sentimental Cloud",
    tag: "Soft Robotics Installation",
    image: "/images/projects/sentimental-cloud.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6a0b8e4e460b7639f9210bf5_storm.gif",
    link: toLink("/sentimental-cloud"),
    column: "right",
    aspect: "16/15",
  },
  {
    id: "community-threads-exhibition",
    title: "Community Threads",
    tag: "Interactive Exhibition",
    image: "/images/projects/community-threads-exhibition.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/69446f1a93d4158e5080b9c8_wall%203.gif",
    link: toLink("/community-threads"),
    column: "right",
    aspect: "16/15",
  },
  {
    id: "bone-hunters-exhibition",
    title: "The Bone Hunters",
    tag: "Interactive Exhibition",
    award: "🏆 Core77 / Indigo / MUSE",
    image: "/images/projects/bone-hunters-exhibition.gif",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/6778a8016eedf50292c3becc_Bone8.gif",
    link: toLink("/bone-hunters"),
    column: "right",
    aspect: "16/15",
  },
  {
    id: "noya",
    title: "Noya",
    tag: "Creativity Tool",
    image: "/images/projects/noya.png",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/694773bdaf84227880f9713b_temp.png",
    link: toLink("/noya"),
    column: "right",
    aspect: "16/15",
  },
  {
    id: "levelten-energy",
    title: "LevelTen Energy",
    tag: "0-1 Product Design",
    image: "/images/projects/levelten-energy.png",
    sourceImage:
      "https://cdn.prod.website-files.com/5e4f5dd292480f3bc956bc06/695f096d85b599e533d6f7da_4d0c4aeee1a0d761be52b7b1a1cbf861_gc1.png",
    link: toLink("/levelten-energy"),
    column: "right",
    aspect: "16/15",
  },
];

/** Slugs that have on-site case study pages (HTML-migrated) */
export const caseStudySlugs = [
  "feltspace",
  "bone-hunters",
  "community-threads",
  "lavender-haze",
  "spatial",
  "levelten-energy",
  "sentimental-cloud",
  "noya",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return (caseStudySlugs as readonly string[]).includes(slug);
}
