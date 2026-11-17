import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Registry } from "@/components/Registry";
import { SiteChrome } from "@/components/SiteChrome";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#07070a" };

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: t.meta.template },
    description: site.description[locale],
    applicationName: site.name,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body>
        <Registry>
          <SiteChrome locale={locale}>{children}</SiteChrome>
        </Registry>
      </body>
    </html>
  );
}
