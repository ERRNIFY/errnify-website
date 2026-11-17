import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/pages";
import { isLocale } from "@/lib/i18n";
import { slugExists, slugMeta, slugParams } from "@/lib/meta";

type Props = PageProps<"/[locale]/portfolio/[slug]">;

export const generateStaticParams = () => slugParams("portfolio");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return isLocale(locale) ? slugMeta(locale, "portfolio", slug) : {};
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !slugExists("portfolio", slug)) notFound();
  return <ProjectPage locale={locale} slug={slug} />;
}
