import type { Locale } from "@/lib/i18n";
import { post as akilliSozlesme } from "./akilli-sozlesme-yazdirmadan-once";
import { post as botMuUygulamaMi } from "./bot-mu-uygulama-mi";
import { post as mvpKapsami } from "./mvp-kapsami-nasil-daraltilir";
import { post as otomasyonaNeredenBaslamali } from "./otomasyona-nereden-baslamali";
import { post as oyununIlk30Saniyesi } from "./oyunun-ilk-30-saniyesi";
import { post as ragNedir } from "./rag-nedir-belgelerle-calisan-asistan";
import { post as siteHizi } from "./site-hizi-ve-core-web-vitals";
import type { Block, Post } from "./types";
import { post as webSitesiMiWebUygulamasiMi } from "./web-sitesi-mi-web-uygulamasi-mi";
import { post as yapayZekaEklemedenOnce } from "./yapay-zeka-eklemeden-once-5-soru";
import { post as yazilimTeklifi } from "./yazilim-teklifi-nasil-okunur";
import { post as yerelMiCaprazPlatformMu } from "./yerel-mi-capraz-platform-mu";

export type { Block, Post };

/**
 * Blog yazıları. Her yazı bu klasörde kendi dosyasında durur.
 * Yeni yazı eklemek için: dosyayı oluşturun, yukarıya içe aktarın ve aşağıdaki listeye ekleyin.
 * Sıralama tarihe göre kendiliğinden yapılır (en yeni en üstte).
 */
export const posts: Post[] = [
  yerelMiCaprazPlatformMu,
  siteHizi,
  akilliSozlesme,
  yazilimTeklifi,
  ragNedir,
  webSitesiMiWebUygulamasiMi,
  mvpKapsami,
  botMuUygulamaMi,
  yapayZekaEklemedenOnce,
  otomasyonaNeredenBaslamali,
  oyununIlk30Saniyesi,
].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

const blockText = (b: Block) => (b.type === "ul" || b.type === "ol" ? b.items.join(" ") : b.text);

/** Okuma süresi (dakika): dakikada yaklaşık 200 kelime üzerinden hesaplanır */
export function readingMinutes(post: Post, locale: Locale) {
  const words = post.body[locale].reduce((n, b) => n + blockText(b).trim().split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200));
}

/** Başlıktan adres parçası üretir: "Önce varsayımı yazın" -> "once-varsayimi-yazin" */
export function headingId(text: string) {
  const map: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
  const id = text
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (ch) => map[ch])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  // Rakamla başlayan kimlikler bazı seçicilerde sorun çıkarır; başına harf ekle
  return /^[a-z]/.test(id) ? id : `bolum-${id}`;
}
