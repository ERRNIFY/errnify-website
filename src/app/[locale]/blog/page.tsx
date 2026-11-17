import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPage } from "@/components/pages";
import { getDictionary } from "@/content/dictionary";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Props = PageProps<"/[locale]/blog">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMeta(locale, "/blog", t.nav.blog, t.blog.metaDescription);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <BlogPage locale={locale} />;
}
