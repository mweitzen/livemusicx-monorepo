import type { MetadataRoute } from "next";
import { routes } from "@/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData = routes.map((link) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  })) satisfies MetadataRoute.Sitemap;

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
