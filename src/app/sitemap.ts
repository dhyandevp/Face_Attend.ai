import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faceattendai.dhyandev.sbs";
  const buildDate = new Date("2026-11-26T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
