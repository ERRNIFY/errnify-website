import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/pages";
import { isLocale } from "@/lib/i18n";
import { slugExists, slugMeta, slugParams } from "@/lib/meta";

type Props = PageProps<"/[locale]/blog/[slug]">;

export const generateStaticParams = () => slugParams("blog");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return isLocale(locale) ? slugMeta(locale, "blog", slug) : {};
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !slugExists("blog", slug)) notFound();
  return <PostPage locale={locale} slug={slug} />;
}
