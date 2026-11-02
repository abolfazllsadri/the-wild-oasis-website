import { getCabins } from "@/lib/data-service";
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cabins = await getCabins();

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/cabins`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...cabins.map((cabin) => ({
      url: `${siteUrl}/cabins/${cabin.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
