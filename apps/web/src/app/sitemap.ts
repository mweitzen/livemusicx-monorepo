import type { MetadataRoute } from "next";
import { links, appConfig } from "@repo/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sitemapData: MetadataRoute.Sitemap = [];

  for (var section in links) {
    /**
     * Links is defined as an object
     * Each key is a different section
     * Iterate over the sections to generate route data
     */
    links[section as keyof typeof links].forEach((link) =>
      sitemapData.push({
        url: `${appConfig.baseUrl}${link.href}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    );
  }

  // Todo: Add dynamic routes to sitemapData
  // const dynamicRoutes = await getDynamicRoutes();
  // const dynamicRoutesData = dynamicRoutes.map((route) => ({
  //   url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
  //   lastModified: new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.8,
  // })) satisfies MetadataRoute.Sitemap;

  return [
    ...sitemapData,
    // ...dynamicRoutesData
  ];
}
