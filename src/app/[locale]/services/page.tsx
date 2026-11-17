import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesPage } from "@/components/pages";
import { getDictionary } from "@/content/dictionary";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Props = PageProps<"/[locale]/services">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMeta(locale, "/services", t.nav.services, t.services.metaDescription);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServicesPage locale={locale} />;
}
