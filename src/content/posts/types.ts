import type { L } from "@/lib/i18n";
import type { ServiceId } from "../services";

/** Yazı gövdesini oluşturan bloklar */
export type Block =
  | { type: "p"; text: string }
  /** Bölüm başlığı. "İçindekiler" listesi bu başlıklardan oluşur. */
  | { type: "h2"; text: string }
  /** Madde işaretli liste */
  | { type: "ul"; items: string[] }
  /** Numaralı liste: sırası önemli adımlar için */
  | { type: "ol"; items: string[] }
  /** Öne çıkarılan cümle */
  | { type: "quote"; text: string }
  /** Kutu içinde kısa not ya da ipucu */
  | { type: "note"; title?: string; text: string };

export type Post = {
  slug: string;
  /** YYYY-AA-GG */
  date: string;
  /** Yazının ana konusu: etikette ve kapakta görünür */
  topic: ServiceId;
  /** Yan panelde "İlgili hizmetler" olarak gösterilir (verilmezse yalnızca topic) */
  related?: ServiceId[];
  title: L;
  excerpt: L;
  body: L<Block[]>;
};
