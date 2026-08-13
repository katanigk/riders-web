import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riders-hq.co.il";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/knowledge`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/community`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/gear`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gear/bigud`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/gear/bigud/kayitz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/gear/bigud/choref`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/gear/migun`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/gear/tosafot`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/training`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
