# Errnify web sitesi

Next.js 16 (App Router) üzerinde; arayüz MUI, 3D sahne three.js (React Three Fiber), hareket Motion ve Lenis ile. Türkçe (`/tr`) ve İngilizce (`/en`). Backend yok; tüm içerik `src/content` altındaki dosyalardan gelir.

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi
npm run start   # derlenmiş siteyi çalıştırır
```

## Sayfalar

`/tr` ve `/en` altında: ana sayfa, `services` ve hizmet detayı, `portfolio` ve proje detayı, `about`, `blog` ve yazı, `faq`, `contact`. `/` adresi `/tr`'ye yönlenir.

## İçeriği nerede değiştiririm?

| Ne | Dosya |
| --- | --- |
| Şirket bilgileri (e-posta, telefon, adres), araç listesi | `src/content/site.ts` |
| Hizmetler | `src/content/services.ts` |
| Portfolyo projeleri | `src/content/projects.ts` |
| Blog yazıları (her yazı ayrı dosya) | `src/content/posts/` |
| Sık sorulan sorular | `src/content/faq.ts` |
| Arayüz metinleri (menü, başlıklar, düğmeler, hakkımızda) | `src/content/dictionary.ts` |

Her metin `{ tr: "...", en: "..." }` biçiminde iki dilde yazılır.

**Proje eklemek:** `projects.ts` içindeki diziye yeni bir kayıt ekleyin; `slug` adresi belirler. `concept: true` olan kayıtlar sitede "Konsept" etiketiyle gösterilir; gerçek müşteri işi olduğunda bu satırı silin. Marka adı Türkçe değilse `latin: true` ekleyin.

**Yazı eklemek:** `src/content/posts/` altında yeni bir dosya oluşturun (mevcut bir yazıyı örnek alın), ardından `src/content/posts/index.ts` içinde içe aktarıp listeye ekleyin. Gövde `p`, `h2`, `ul`, `ol`, `quote` ve `note` bloklarından oluşur; "İçindekiler" listesi `h2` başlıklarından, okuma süresi kelime sayısından kendiliğinden çıkar. `related` alanı yazının yanında gösterilecek hizmetleri belirler.

Bir yazının kelime sayısını ve yapısını denetlemek için:

```bash
node scripts/post-words.mjs src/content/posts/<dosya>.ts 1000
```

## Kod yapısı

| Dosya | İçerik |
| --- | --- |
| `src/app/[locale]/` | Rotalar. Her dosya yalnızca ilgili sayfa bileşenini çağırır. |
| `src/components/pages.tsx` | Sayfa bileşenleri (ana sayfa, hizmetler, portfolyo, …). |
| `src/components/ui.tsx` | Ortak parçalar: kartlar, başlıklar, form, SSS, çağrı bandı. |
| `src/components/SiteChrome.tsx` | Üst çubuk, mobil menü, alt bilgi ve 3D sahnenin yerleşimi. |
| `src/components/Scene.tsx` | three.js sahnesi: iki oklu logo, süzülen kristaller, kaydırmaya bağlı kamera. |
| `src/components/Registry.tsx` | MUI teması (renkler, tipografi). |
| `src/app/globals.css` | Genel stiller ve animasyon tanımları. |

İletişim formu sunucuya veri göndermez; mesajı kullanıcının e-posta ya da WhatsApp uygulamasında hazır açar (`src/lib/useContactForm.ts`).

WebGL desteklemeyen tarayıcılarda 3D sahne yerine CSS ile çizilen sade bir arka plan gösterilir.
