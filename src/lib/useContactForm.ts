"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/dictionary";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * İletişim formunun ortak mantığı (Tasarım 2 ve 3 kullanır). Sunucu yok: mesaj,
 * kullanıcının e-posta ya da WhatsApp uygulamasında hazır hâlde açılır.
 * Formdaki alan adları: name, email, topic, message. Gönder düğmesinin value'su "whatsapp" olabilir.
 */
export function useContactForm(t: Dictionary["contact"]["form"], email: string, whatsapp: string) {
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const fields = { name: value("name"), email: value("email"), topic: value("topic"), message: value("message") };

    const next: Errors = {};
    if (!fields.name) next.name = t.errorName;
    if (!EMAIL.test(fields.email)) next.email = t.errorEmail;
    if (fields.message.length < 10) next.message = t.errorMessage;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const lines = [`${t.labelName}: ${fields.name}`, `${t.labelEmail}: ${fields.email}`];
    if (fields.topic) lines.push(`${t.labelService}: ${fields.topic}`);
    const text = [...lines, "", fields.message].join("\n");

    if (submitter?.value === "whatsapp") {
      window.open(`${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } else {
      const subject = fields.topic ? `${t.subject}: ${fields.topic}` : t.subject;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
  };

  return { errors, onSubmit };
}
