import type { L, Locale } from "@/lib/i18n";

export type ServiceId = "web" | "mobile" | "game" | "bot" | "ai" | "automation" | "saas" | "web3";

export type Service = {
  id: ServiceId;
  slug: string;
  title: L;
  /** Kartlarda görünen tek cümle */
  short: L;
  /** Detay sayfasının giriş paragrafı */
  lead: L;
  /** İkinci paragraf: nasıl çalıştığımız */
  body: L;
  /** Teslim ettiklerimiz */
  deliverables: L<string[]>;
  /** Kullandığımız araçlar */
  stack: string[];
  /** Başlık Türkçe sayfada da İngilizce kurallarıyla büyük harfe çevrilsin (SCRIPT, BLOCKCHAIN) */
  latin?: boolean;
};

export const services: Service[] = [
  {
    id: "web",
    slug: "web-development",
    title: { tr: "Web Geliştirme", en: "Web Development" },
    short: {
      tr: "Kurumsal sitelerden yönetim panelli web uygulamalarına: hızlı açılan, aramada bulunan, yönetimi kolay.",
      en: "From company sites to full web apps with admin panels: fast to load, easy to find, simple to manage.",
    },
    lead: {
      tr: "Bir web sitesinin işi, ziyaretçiyi aradığı şeye en kısa yoldan ulaştırmaktır. Tasarımı, içeriği ve altyapıyı bu tek hedefe göre kuruyoruz.",
      en: "A website has one job: get visitors to what they came for by the shortest route. We shape design, content and infrastructure around that single goal.",
    },
    body: {
      tr: "Tanıtım sitesi, e-ticaret, rezervasyon sistemi ya da tamamen size özel bir web uygulaması… Hepsinde aynı disiplini uyguluyoruz: mobilde kusursuz görünüm, saniyenin altında açılış, arama motorlarının okuyabildiği temiz yapı ve içeriği sizin güncelleyebildiğiniz bir yönetim paneli.",
      en: "A marketing site, an online store, a booking system or a fully custom web app — the discipline is the same: flawless on mobile, sub-second loads, clean structure search engines can read, and an admin panel that lets you update content yourself.",
    },
    deliverables: {
      tr: ["Kurumsal ve tanıtım siteleri", "E-ticaret ve ödeme entegrasyonu", "Özel web uygulamaları ve paneller", "Çok dilli yapı ve teknik SEO", "İçerik yönetim sistemi (CMS)", "Hız ve erişilebilirlik iyileştirmesi"],
      en: ["Company and marketing sites", "E-commerce and payment integration", "Custom web apps and dashboards", "Multilingual setup and technical SEO", "Content management system (CMS)", "Performance and accessibility tuning"],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"],
  },
  {
    id: "mobile",
    slug: "mobile-app-development",
    title: { tr: "Mobil Uygulama", en: "Mobile Apps" },
    short: {
      tr: "iOS ve Android için tek ekipten, mağazaya yüklenmeye hazır uygulamalar.",
      en: "iOS and Android apps from one team, delivered ready for the stores.",
    },
    lead: {
      tr: "İyi bir mobil uygulama, kullanıcının cebinde yer kaplamayı hak eder. İlk açılıştan bildirim iznine kadar her ekranı bu gözle tasarlıyoruz.",
      en: "A good mobile app earns its place on someone's phone. We design every screen, from first launch to the notification prompt, with that in mind.",
    },
    body: {
      tr: "Çoğu projede iOS ve Android'i tek kod tabanından çıkararak süreyi ve bütçeyi düşürüyoruz; kamera, konum ya da ödeme gibi cihaz özelliklerinde gerektiğinde yerel koda iniyoruz. App Store ve Google Play başvurularını, inceleme sürecini ve yayın sonrası güncellemeleri de biz yürütüyoruz.",
      en: "On most projects we ship iOS and Android from a single codebase to cut time and budget, dropping to native code where the camera, location or payments call for it. We also handle App Store and Google Play submissions, the review process and post-launch updates.",
    },
    deliverables: {
      tr: ["iOS ve Android uygulamaları", "Arayüz ve kullanıcı akışı tasarımı", "Anlık bildirim, konum, QR ve kamera", "Uygulama içi ödeme ve abonelik", "Yönetim paneli ve API", "Mağaza başvurusu ve yayın takibi"],
      en: ["iOS and Android apps", "Interface and user-flow design", "Push notifications, location, QR and camera", "In-app purchases and subscriptions", "Admin panel and API", "Store submission and release tracking"],
    },
    stack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Node.js", "PostgreSQL"],
  },
  {
    id: "game",
    slug: "game-development",
    title: { tr: "Oyun Geliştirme", en: "Game Development" },
    short: {
      tr: "Mobil ve tarayıcı oyunları: prototipten mağaza yayınına, mekanikten gelir modeline.",
      en: "Mobile and browser games: from prototype to store release, from core mechanic to monetisation.",
    },
    lead: {
      tr: "Bir oyunun kaderi ilk otuz saniyede belli olur. Önce o otuz saniyeyi oynanır hâle getiriyor, sonra etrafına oyunu kuruyoruz.",
      en: "A game's fate is decided in its first thirty seconds. We make those thirty seconds playable first, then build the game around them.",
    },
    body: {
      tr: "Hyper-casual mobil oyunlar, tarayıcıda çalışan mini oyunlar ve Telegram içi oyunlar geliştiriyoruz. Hızlı prototiple mekaniği test ediyor, ardından seviye tasarımı, ses, reklam ve uygulama içi satın alma katmanlarını ekliyoruz. Markalar için kampanya oyunları da hazırlıyoruz.",
      en: "We build hyper-casual mobile games, browser mini-games and in-Telegram games. A quick prototype tests the mechanic; level design, audio, ads and in-app purchases follow. We also produce branded campaign games.",
    },
    deliverables: {
      tr: ["Oynanabilir prototip", "2D ve 3D mobil oyunlar", "Tarayıcı ve Telegram mini oyunları", "Seviye, ekonomi ve ödül tasarımı", "Reklam ve uygulama içi satın alma", "Liderlik tablosu ve analitik"],
      en: ["Playable prototype", "2D and 3D mobile games", "Browser and Telegram mini-games", "Level, economy and reward design", "Ads and in-app purchases", "Leaderboards and analytics"],
    },
    stack: ["Unity", "Godot", "C#", "Phaser", "TypeScript", "Firebase", "AdMob"],
  },
  {
    id: "bot",
    slug: "bots-and-scripts",
    latin: true,
    title: { tr: "Bot & Script", en: "Bots & Scripts" },
    short: {
      tr: "Telegram, WhatsApp ve Discord botları; veri toplayan, raporlayan, tekrarlayan işi üstlenen scriptler.",
      en: "Telegram, WhatsApp and Discord bots, plus scripts that collect data, report and take over repetitive work.",
    },
    lead: {
      tr: "Her gün elle yapılan, kuralı belli bir iş varsa büyük ihtimalle onu bir bot yapabilir. Biz o botu yazıyoruz.",
      en: "If someone does a rule-based task by hand every day, a bot can probably do it. We write that bot.",
    },
    body: {
      tr: "Müşteri sorularını yanıtlayan sohbet botları, sipariş ve randevu alan WhatsApp akışları, topluluk yöneten Telegram ve Discord botları, fiyat ve stok takip eden scriptler geliştiriyoruz. Botlarınız sunucuda kesintisiz çalışır; hata verdiğinde size haber verir.",
      en: "We build chat bots that answer customer questions, WhatsApp flows that take orders and bookings, Telegram and Discord bots that run communities, and scripts that track prices and stock. Your bots run around the clock on a server and alert you when something breaks.",
    },
    deliverables: {
      tr: ["Telegram, WhatsApp ve Discord botları", "Sipariş, randevu ve destek akışları", "Veri toplama ve izleme scriptleri", "Zamanlanmış görevler ve raporlar", "Yönetim paneli ve kayıt takibi", "Sunucu kurulumu ve izleme"],
      en: ["Telegram, WhatsApp and Discord bots", "Order, booking and support flows", "Data collection and monitoring scripts", "Scheduled jobs and reports", "Admin panel and logging", "Server setup and monitoring"],
    },
    stack: ["Python", "Node.js", "Telegram Bot API", "WhatsApp Business API", "Discord API", "Playwright", "Redis"],
  },
  {
    id: "ai",
    slug: "ai-solutions",
    title: { tr: "Yapay Zekâ", en: "AI Solutions" },
    short: {
      tr: "Kendi verinizle çalışan asistanlar, belge okuyan sistemler ve ürününüze gömülü yapay zekâ özellikleri.",
      en: "Assistants that work on your own data, systems that read documents, and AI features built into your product.",
    },
    lead: {
      tr: "Yapay zekâ bir özellik değil, bir araç. Önce hangi işi kısalttığını ölçüyor, sonra ürününüze yerleştiriyoruz.",
      en: "AI is a tool, not a feature. We measure which task it shortens first, then build it into your product.",
    },
    body: {
      tr: "Şirket belgelerinizden yanıt veren müşteri temsilcisi asistanları, faturaları ve sözleşmeleri okuyup alanlara ayıran sistemler, içerik üreten ve özetleyen araçlar kuruyoruz. Modelin ne zaman yanıldığını görebilmeniz için her projeye ölçüm ve insan onayı adımı ekliyoruz.",
      en: "We build customer-service assistants that answer from your company documents, systems that read invoices and contracts into structured fields, and tools that draft and summarise content. Every project ships with evaluation and a human-approval step so you can see when the model gets it wrong.",
    },
    deliverables: {
      tr: ["Kendi verinizle çalışan sohbet asistanı", "Belge okuma ve veri çıkarma", "Arama ve öneri sistemleri", "İçerik üretimi ve özetleme araçları", "Mevcut ürüne yapay zekâ entegrasyonu", "Doğruluk ölçümü ve maliyet takibi"],
      en: ["Chat assistant grounded in your data", "Document reading and data extraction", "Search and recommendation systems", "Content drafting and summarising tools", "AI integration into existing products", "Accuracy evaluation and cost tracking"],
    },
    stack: ["Claude API", "OpenAI API", "Python", "LangChain", "pgvector", "FastAPI", "Next.js"],
  },
  {
    id: "automation",
    slug: "automation",
    title: { tr: "Otomasyon", en: "Automation" },
    short: {
      tr: "Birbirine bağlı çalışan araçlar: sipariş, fatura, CRM ve raporlama elle kopyalamadan akar.",
      en: "Tools that talk to each other: orders, invoices, CRM and reporting flow without copy-paste.",
    },
    lead: {
      tr: "Ekibiniz aynı veriyi iki farklı ekrana giriyorsa, orada otomasyon fırsatı vardır. Araçlarınızı birbirine bağlıyoruz.",
      en: "If your team types the same data into two different screens, there is an automation waiting. We connect your tools.",
    },
    body: {
      tr: "Önce iş akışınızı adım adım çıkarıyor, en çok zaman alan halkayı buluyoruz. Ardından e-ticaret, muhasebe, CRM, kargo ve mesajlaşma araçlarını birbirine bağlayan akışlar kuruyoruz. Her akışın kaydı tutulur; bir adım takılırsa nerede takıldığını görürsünüz.",
      en: "We map your workflow step by step and find the link that costs the most time. Then we build flows that connect your store, accounting, CRM, shipping and messaging tools. Every flow is logged, so when a step stalls you can see exactly where.",
    },
    deliverables: {
      tr: ["İş akışı analizi ve yol haritası", "Sipariş, fatura ve kargo akışları", "CRM ve e-posta otomasyonu", "API entegrasyonları", "Otomatik raporlar ve bildirimler", "Hata kaydı ve izleme paneli"],
      en: ["Workflow analysis and roadmap", "Order, invoice and shipping flows", "CRM and email automation", "API integrations", "Automated reports and alerts", "Error logging and monitoring panel"],
    },
    stack: ["n8n", "Python", "Node.js", "Webhooks", "Google Workspace API", "PostgreSQL", "Docker"],
  },
  {
    id: "saas",
    slug: "saas-products",
    title: { tr: "SaaS Ürünleri", en: "SaaS Products" },
    short: {
      tr: "Abonelikle satılan yazılımlar: çok kiracılı altyapı, ödeme, yetkilendirme ve yönetim paneli.",
      en: "Software sold by subscription: multi-tenant architecture, billing, permissions and admin panel.",
    },
    lead: {
      tr: "SaaS fikrinizi ilk ödeme yapan müşteriye kadar götürüyoruz: önce dar kapsamlı bir MVP, sonra kullanım verisine göre büyüme.",
      en: "We take your SaaS idea all the way to the first paying customer: a tightly scoped MVP first, then growth guided by usage data.",
    },
    body: {
      tr: "Kayıt, abonelik, faturalama, rol ve yetki, çok kiracılı veri yapısı gibi her SaaS üründe gereken temeli hazır getiriyoruz; zamanı sizin ürününüzü farklı kılan kısma harcıyoruz. Kendi ürünümüz QR Menü de bu altyapının üzerinde çalışıyor.",
      en: "Sign-up, subscriptions, invoicing, roles and permissions, multi-tenant data — we bring the foundation every SaaS needs and spend the time on what makes yours different. Our own product, QR Menu, runs on the same foundation.",
    },
    deliverables: {
      tr: ["MVP kapsamı ve ürün yol haritası", "Çok kiracılı altyapı", "Abonelik ve ödeme sistemi", "Rol, yetki ve ekip yönetimi", "Yönetim ve raporlama paneli", "Ölçekleme, yedekleme ve izleme"],
      en: ["MVP scope and product roadmap", "Multi-tenant architecture", "Subscriptions and billing", "Roles, permissions and team management", "Admin and reporting dashboard", "Scaling, backups and monitoring"],
    },
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "iyzico", "AWS"],
  },
  {
    id: "web3",
    slug: "web3-blockchain",
    latin: true,
    title: { tr: "Web3 & Blockchain", en: "Web3 & Blockchain" },
    short: {
      tr: "Akıllı sözleşmeler, cüzdan entegrasyonu ve token altyapısı: test edilmiş, denetlenebilir.",
      en: "Smart contracts, wallet integration and token infrastructure: tested and auditable.",
    },
    lead: {
      tr: "Zincir üstündeki kod geri alınamaz. Bu yüzden Web3 projelerinde yazmaktan çok test etmeye zaman ayırıyoruz.",
      en: "Code on a chain can't be taken back. That's why on Web3 projects we spend more time testing than writing.",
    },
    body: {
      tr: "Web3 entegrasyonları ve blok zincir çözümleriyle ürününüzü yeni nesil altyapıya taşıyoruz. Akıllı sözleşme geliştirme, cüzdan bağlantısı, token ve ödül mekanikleri ile Telegram içi kripto oyunlarında geliştirme, test ve yayın süreçlerini uçtan uca yürütüyoruz.",
      en: "We move your product onto next-generation infrastructure with Web3 integrations and blockchain solutions. For smart contracts, wallet connections, token and reward mechanics and in-Telegram crypto games, we run development, testing and release end to end.",
    },
    deliverables: {
      tr: ["Akıllı sözleşme geliştirme", "Cüzdan bağlantısı ve işlem akışları", "Token ve ödül mekanikleri", "dApp arayüzleri", "Test ağı denemeleri ve test kapsamı", "Yayın ve izleme"],
      en: ["Smart contract development", "Wallet connection and transaction flows", "Token and reward mechanics", "dApp interfaces", "Testnet trials and test coverage", "Deployment and monitoring"],
    },
    stack: ["Solidity", "Hardhat", "ethers.js", "TON", "Next.js", "Node.js", "The Graph"],
  },
];

/** Büyük harfe çevrilen başlıklarda doğru İ/I için kullanılacak dil */
export const titleLang = (s: Service, locale: Locale): Locale => (s.latin ? "en" : locale);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
