import type { MetadataRoute } from "next";

const SITE = "https://icebreakerlab.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /frost es el cuestionario de intake: útil por enlace directo, no en buscadores.
      disallow: ["/frost", "/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
