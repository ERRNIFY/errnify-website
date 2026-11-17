import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/portfolio",
    "/about",
    "/blog",
    "/faq",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/portfolio/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    })),
  );
}
