import type { L } from "@/lib/i18n";

/** Şirket bilgileri — tek yerden yönetilir. */
export const site = {
  name: "Errnify",
  url: "https://errnify.com",
  email: "info@errnify.com",
  phone: "+90 501 488 70 66",
  phoneHref: "tel:+905014887066",
  whatsapp: "https://wa.me/905014887066",
  founded: 2021,
  year: 2026,
  projectsShipped: "30+",
  address: {
    tr: "Eski Büyükdere Cad. No: 61 İç Kapı No: 2, Kağıthane, İstanbul",
    en: "Eski Büyükdere Cad. No: 61/2, Kağıthane, Istanbul, Türkiye",
  } satisfies L,
  hours: {
    tr: "Her gün, her saat açığız",
    en: "Open every day, around the clock",
  } satisfies L,
  description: {
    tr: "Errnify; web, mobil, oyun, bot, yapay zekâ ve otomasyon projeleri geliştiren İstanbul merkezli bir yazılım stüdyosudur.",
    en: "Errnify is an Istanbul-based software studio building web, mobile, game, bot, AI and automation products.",
  } satisfies L,
};

/** Kullandığımız araçlar — ana sayfadaki kayan şeritte görünür. */
export const stack: string[][] = [
  ["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Vercel", "Figma"],
  ["Flutter", "React Native", "Swift", "Kotlin", "Unity", "Godot", "Claude API", "OpenAI API", "n8n", "Telegram Bot API", "WhatsApp Business API", "Solidity", "Stripe", "iyzico"],
];
