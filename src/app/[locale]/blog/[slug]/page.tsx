import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/pages";
import { isLocale } from "@/lib/i18n";
import { slugExists, slugMeta, slugParams } from "@/lib/meta";

type Props = PageProps<"/[locale]/blog/[slug]">;

// Sayfanın tamamı adresteki "slug" değerine bağlı ve derleme sırasında statik üretiliyor.
// Bu yüzden gezinme, hazır HTML gelene kadar kısa süre bekleyebilir; iskelet göstermiyoruz.
export const instant = false;

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
