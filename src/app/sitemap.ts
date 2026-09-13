import type { MetadataRoute } from "next";

const SITE = "https://icebreakerlab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
}
