import type { Metadata } from "next";
import { getPost, posts } from "@/content/posts";
import { getProject, projects, projectTitle } from "@/content/projects";
import { getService, services } from "@/content/services";
import { locales, type Locale } from "./i18n";

/** Sayfa başlığı, açıklaması ve dil alternatifleri */
export function pageMeta(locale: Locale, path: string, title: string, description: string): Metadata {
  const clean = path === "/" ? "" : path;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${clean}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${clean}`])),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${clean}`,
      siteName: "Errnify",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

/* Adresinde ad (slug) taşıyan sayfalar: hizmet, proje ve yazı detayları */

export type SlugKind = "services" | "portfolio" | "blog";

export const slugParams = (kind: SlugKind) =>
  (kind === "services" ? services : kind === "portfolio" ? projects : posts).map((item) => ({ slug: item.slug }));

export const slugExists = (kind: SlugKind, slug: string) =>
  !!(kind === "services" ? getService(slug) : kind === "portfolio" ? getProject(slug) : getPost(slug));

export function slugMeta(locale: Locale, kind: SlugKind, slug: string): Metadata {
  const path = `/${kind}/${slug}`;
  if (kind === "services") {
    const s = getService(slug);
    return s ? pageMeta(locale, path, s.title[locale], s.short[locale]) : {};
  }
  if (kind === "portfolio") {
    const p = getProject(slug);
    return p ? pageMeta(locale, path, `${projectTitle(p, locale)} — ${p.tagline[locale]}`, p.summary[locale]) : {};
  }
  const post = getPost(slug);
  return post ? pageMeta(locale, path, post.title[locale], post.excerpt[locale]) : {};
}
