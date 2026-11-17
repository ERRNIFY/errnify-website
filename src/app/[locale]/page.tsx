import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Props = PageProps<"/[locale]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { ...pageMeta(locale, "/", t.meta.title, site.description[locale]), title: { absolute: t.meta.title } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
