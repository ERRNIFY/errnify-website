import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqPage } from "@/components/pages";
import { getDictionary } from "@/content/dictionary";
import { faqCategories } from "@/content/faq";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";

type Props = PageProps<"/[locale]/faq">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMeta(locale, "/faq", t.faq.title, t.faq.metaDescription);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // Sayfada bir anda tek kategori görünür; arama motorları tüm soruları buradan okur.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.q[locale],
        acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
      })),
    ),
  };

  return (
    <>
      <FaqPage locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
