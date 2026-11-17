export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A piece of content written in every supported language. */
export type L<T = string> = Record<Locale, T>;

/** Build a locale-prefixed path: href("tr", "/services") -> "/tr/services" */
export const href = (locale: Locale, path = "") =>
  `/${locale}${path === "/" ? "" : path}`;

const MONTHS: L<string[]> = {
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

/** Format an ISO date (YYYY-MM-DD) without touching the system clock. */
export function formatDate(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[locale][m - 1];
  return locale === "tr" ? `${d} ${month} ${y}` : `${month} ${d}, ${y}`;
}
