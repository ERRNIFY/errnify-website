import type { L } from "@/lib/i18n";
import type { ServiceId } from "./services";

type Item = { title: L; text: L };

/** Hizmet detay sayfasının zengin içeriği: rakamlar, alt hizmetler, kimler için, çalışma adımları */
export type ServiceDetail = {
  /** Hero altındaki üç kısa rakam */
  highlights: { value: string; label: L }[];
  /** "Neler yapıyoruz" kartları */
  offerings: Item[];
  /** "Bu hizmet size uygun, eğer…" maddeleri */
  fit: L<string[]>;
  /** Bu hizmete özel çalışma adımları */
  steps: Item[];
};

export const serviceDetails: Record<ServiceId, ServiceDetail> = {
  web: {
    highlights: [
      { value: "50+", label: { tr: "Yayına aldığımız site", en: "Sites launched" } },
      { value: "2–4", label: { tr: "Haftada tanıtım sitesi", en: "Weeks for a marketing site" } },
      { value: "<1 sn", label: { tr: "Hedeflenen açılış süresi", en: "Target load time" } },
    ],
    offerings: [
      {
        title: { tr: "Tanıtım ve kurumsal siteler", en: "Marketing and company sites" },
        text: {
          tr: "Firmanızı, hizmetlerinizi ve işlerinizi anlatan, ziyaretçiyi aramaya, forma ya da WhatsApp'a yönlendiren siteler.",
          en: "Sites that present your company, services and work, and steer visitors to call, fill in a form or message you on WhatsApp.",
        },
      },
      {
        title: { tr: "E-ticaret siteleri", en: "Online stores" },
        text: {
          tr: "Ürün varyantları, sepet, online ya da kapıda ödeme, kargo ve teslimat bölgesi kuralları olan mağazalar.",
          en: "Stores with product variants, a cart, online or pay-on-delivery checkout, shipping and delivery-zone rules.",
        },
      },
      {
        title: { tr: "Rezervasyon ve sipariş sistemleri", en: "Booking and ordering systems" },
        text: {
          tr: "Restoran, kafe, klinik ya da e-spor merkezi için online rezervasyon, dijital menü ve sipariş akışları.",
          en: "Online booking, digital menus and order flows for restaurants, cafés, clinics or esports centres.",
        },
      },
      {
        title: { tr: "Özel web uygulamaları ve paneller", en: "Custom web apps and panels" },
        text: {
          tr: "Müşteri paneli, cari takip, katalog arama gibi işinize özel ekranlar; rol ve yetkilerle birlikte.",
          en: "Screens built around your business, such as customer portals, account tracking or catalogue search, with roles and permissions.",
        },
      },
      {
        title: { tr: "Çok dilli yapı ve teknik SEO", en: "Multilingual setup and technical SEO" },
        text: {
          tr: "Her dil için ayrı adres, doğru başlık yapısı, site haritası ve yapılandırılmış veri; aramada bulunabilmeniz için temel.",
          en: "A separate address per language, clean heading structure, a sitemap and structured data: the groundwork for being found.",
        },
      },
      {
        title: { tr: "Yeniden tasarım ve hız iyileştirme", en: "Redesigns and speed work" },
        text: {
          tr: "Yavaş açılan ya da eskimiş sitenizi, içeriğinizi ve arama sıralamanızı kaybetmeden yeni altyapıya taşıyoruz.",
          en: "We move a slow or dated site onto a new foundation without losing your content or search rankings.",
        },
      },
    ],
    fit: {
      tr: [
        "Müşterileriniz sizi aradığında bulamıyorsa",
        "Teklif ve randevu talepleri telefona, DM'e dağılıyorsa",
        "Ürünlerinizi online satmak istiyorsanız",
        "Sitenizi her değişiklikte bir yazılımcıya güncelletiyorsanız",
      ],
      en: [
        "Customers can't find you when they search",
        "Quote and booking requests are scattered across calls and DMs",
        "You want to sell your products online",
        "You need a developer for every change to your site",
      ],
    },
    steps: [
      {
        title: { tr: "Hedef ve içerik planı", en: "Goals and content plan" },
        text: {
          tr: "Ziyaretçinin sitede ne yapmasını istediğinizi belirliyor, sayfa haritasını ve gereken içerikleri çıkarıyoruz.",
          en: "We decide what you want visitors to do, then draw up the page map and the content it needs.",
        },
      },
      {
        title: { tr: "Tasarım", en: "Design" },
        text: {
          tr: "Önce mobil ekranları çiziyoruz. Onayınızdan sonra masaüstü ve tüm sayfalar aynı dille tamamlanıyor.",
          en: "We design the mobile screens first. Once you approve, desktop and the remaining pages follow in the same language.",
        },
      },
      {
        title: { tr: "Geliştirme ve panel", en: "Build and admin panel" },
        text: {
          tr: "Siteyi kodluyor, içerik panelini kuruyor, formları ve ödeme gibi bağlantıları test ediyoruz.",
          en: "We build the site, set up the content panel and test forms, payments and other connections.",
        },
      },
      {
        title: { tr: "Yayın ve teslim", en: "Launch and handover" },
        text: {
          tr: "Alan adını bağlıyor, hız ve SEO kontrollerini yapıyor, paneli nasıl kullanacağınızı gösteriyoruz.",
          en: "We connect the domain, run speed and SEO checks, and show you how to use the panel.",
        },
      },
    ],
  },

  mobile: {
    highlights: [
      { value: "20+", label: { tr: "Yayına aldığımız uygulama", en: "Apps launched" } },
      { value: "2", label: { tr: "Platform, tek kod tabanı", en: "Platforms, one codebase" } },
      { value: "8–16", label: { tr: "Haftada ilk sürüm", en: "Weeks to first release" } },
    ],
    offerings: [
      {
        title: { tr: "iOS ve Android uygulamaları", en: "iOS and Android apps" },
        text: {
          tr: "İki platformu tek kod tabanından çıkarıyor, kamera, konum ya da ödeme gerektiğinde yerel koda iniyoruz.",
          en: "We ship both platforms from one codebase and drop to native code where the camera, location or payments call for it.",
        },
      },
      {
        title: { tr: "Arayüz ve kullanıcı akışı", en: "Interface and user flows" },
        text: {
          tr: "İlk açılış, kayıt ve izin ekranlarını kullanıcıyı kaybetmeyecek şekilde tasarlıyoruz.",
          en: "We design onboarding, sign-up and permission screens so you don't lose people along the way.",
        },
      },
      {
        title: { tr: "Bildirim, konum, QR ve kamera", en: "Notifications, location, QR and camera" },
        text: {
          tr: "Anlık bildirim, harita üzerinde arama, QR bilet ve kamera ile çalışan özellikler.",
          en: "Push notifications, map-based search, QR tickets and camera-driven features.",
        },
      },
      {
        title: { tr: "Ödeme ve abonelik", en: "Payments and subscriptions" },
        text: {
          tr: "Uygulama içi satın alma, abonelik, cüzdan ve ödeme sağlayıcısı entegrasyonları.",
          en: "In-app purchases, subscriptions, wallets and payment-provider integrations.",
        },
      },
      {
        title: { tr: "Arka uç API ve yönetim paneli", en: "Backend API and admin panel" },
        text: {
          tr: "Uygulamanın arkasındaki sunucuyu, veritabanını ve içeriği yönettiğiniz web panelini de biz kuruyoruz.",
          en: "We also build the server, the database and the web panel you manage content from.",
        },
      },
      {
        title: { tr: "Mağaza yayını ve bakım", en: "Store release and maintenance" },
        text: {
          tr: "App Store ve Google Play başvurusu, inceleme süreci, sürüm güncellemeleri ve hata takibi.",
          en: "App Store and Google Play submission, the review process, version updates and crash tracking.",
        },
      },
    ],
    fit: {
      tr: [
        "Kullanıcılarınız sizi her gün ya da her hafta kullanacaksa",
        "Bildirim, konum ya da kamera ürününüzün parçasıysa",
        "Web sitenizi uygulamaya taşımak istiyorsanız",
        "Bir fikri mağazada yayına çıkacak bir ilk sürüme çevirmek istiyorsanız",
      ],
      en: [
        "Your users will open it daily or weekly",
        "Notifications, location or the camera are part of the product",
        "You want to bring your website experience into an app",
        "You want to turn an idea into a first release in the stores",
      ],
    },
    steps: [
      {
        title: { tr: "Kapsam ve ilk sürüm", en: "Scope and first release" },
        text: {
          tr: "Hangi özelliklerin ilk sürümde olacağını, hangilerinin sonraya kalacağını birlikte yazıyoruz.",
          en: "Together we write down which features go into the first release and which can wait.",
        },
      },
      {
        title: { tr: "Tıklanabilir prototip", en: "Clickable prototype" },
        text: {
          tr: "Ekranları telefonunuzda deneyebileceğiniz bir prototipe dönüştürüyor, kod yazmadan akışı netleştiriyoruz.",
          en: "We turn the screens into a prototype you can try on your phone and settle the flow before writing code.",
        },
      },
      {
        title: { tr: "Geliştirme ve test sürümleri", en: "Build and test releases" },
        text: {
          tr: "İki haftalık dilimlerle ilerliyor, her dilimde TestFlight ve test bağlantısıyla yeni sürümü elinize veriyoruz.",
          en: "We work in two-week slices and put a new build in your hands each time via TestFlight and a test link.",
        },
      },
      {
        title: { tr: "Mağaza ve yayın sonrası", en: "Stores and after launch" },
        text: {
          tr: "Mağaza başvurusunu yapıyor, ilk haftalarda hata ve kullanım verisini izleyip güncellemeleri çıkarıyoruz.",
          en: "We submit to the stores, then watch crashes and usage in the first weeks and ship the updates.",
        },
      },
    ],
  },

  game: {
    highlights: [
      { value: "12", label: { tr: "Telegram oyun botu", en: "Telegram game bots" } },
      { value: "3", label: { tr: "Platform: mobil, tarayıcı, Telegram", en: "Platforms: mobile, browser, Telegram" } },
      { value: "30 sn", label: { tr: "Odaklandığımız ilk izlenim", en: "The first impression we design for" } },
    ],
    offerings: [
      {
        title: { tr: "Oynanabilir prototip", en: "Playable prototype" },
        text: {
          tr: "Asıl mekaniği birkaç hafta içinde oynanır hâle getiriyor, oyunun eğlenceli olup olmadığını erkenden görüyoruz.",
          en: "We make the core mechanic playable within weeks, so you see early whether the game is fun.",
        },
      },
      {
        title: { tr: "Hyper-casual ve casual mobil oyunlar", en: "Hyper-casual and casual mobile games" },
        text: {
          tr: "Tek dokunuşla öğrenilen, kısa oturumlu ve tekrar oynatan 2D ve 3D mobil oyunlar.",
          en: "2D and 3D mobile games you learn in one tap, with short sessions that bring players back.",
        },
      },
      {
        title: { tr: "Telegram ve tarayıcı oyunları", en: "Telegram and browser games" },
        text: {
          tr: "İndirme gerektirmeyen, sohbetten ya da bağlantıdan açılan mini oyunlar; davet ve liderlik tablolarıyla.",
          en: "Mini games that open from a chat or a link with nothing to install, complete with referrals and leaderboards.",
        },
      },
      {
        title: { tr: "Seviye, ekonomi ve ödül tasarımı", en: "Level, economy and reward design" },
        text: {
          tr: "Zorluk eğrisi, oyun içi para ve günlük görevler; oyuncuyu ne sıkan ne de zorlayan bir denge.",
          en: "Difficulty curves, in-game currency and daily tasks, balanced so players are neither bored nor stuck.",
        },
      },
      {
        title: { tr: "Gelir modeli", en: "Monetisation" },
        text: {
          tr: "Ödüllü reklam, uygulama içi satın alma ve sezon kartı gibi modelleri oyunun akışını bozmadan yerleştiriyoruz.",
          en: "Rewarded ads, in-app purchases and season passes, placed without breaking the flow of play.",
        },
      },
      {
        title: { tr: "Marka ve kampanya oyunları", en: "Branded campaign games" },
        text: {
          tr: "Bir ürün lansmanı ya da kampanya için kısa sürede hazırlanan, paylaşılabilir oyunlar.",
          en: "Shareable games built quickly for a product launch or a campaign.",
        },
      },
    ],
    fit: {
      tr: [
        "Aklınızda bir oyun fikri var ve önce oynanabilir hâlini görmek istiyorsanız",
        "Telegram ya da Discord topluluğunuzu bir oyunla canlandırmak istiyorsanız",
        "Markanız için kampanya oyunu arıyorsanız",
        "Yarım kalmış bir oyunu tamamlatmak istiyorsanız",
      ],
      en: [
        "You have a game idea and want to see it playable first",
        "You want a game to bring your Telegram or Discord community to life",
        "You need a campaign game for your brand",
        "You have an unfinished game you want completed",
      ],
    },
    steps: [
      {
        title: { tr: "Fikir ve çekirdek döngü", en: "Idea and core loop" },
        text: {
          tr: "Oyuncunun her turda ne yapacağını tek cümleyle yazıyor, hedef kitleyi ve platformu seçiyoruz.",
          en: "We write down in one sentence what the player does each round, and pick the audience and platform.",
        },
      },
      {
        title: { tr: "Prototip ve oyun testi", en: "Prototype and playtest" },
        text: {
          tr: "Grafik eklemeden mekaniği oynatıyor, gerçek oyunculara test ettirip ilk 30 saniyeyi düzeltiyoruz.",
          en: "We make the mechanic playable without art, test it with real players and fix the first 30 seconds.",
        },
      },
      {
        title: { tr: "Üretim", en: "Production" },
        text: {
          tr: "Seviyeler, görseller, ses, ekonomi ve gelir katmanı bu aşamada eklenir.",
          en: "Levels, art, audio, the economy and monetisation are added in this phase.",
        },
      },
      {
        title: { tr: "Yayın ve canlı operasyon", en: "Launch and live ops" },
        text: {
          tr: "Oyunu yayınlıyor, oyuncu verisine bakarak zorluğu, ödülleri ve etkinlikleri ayarlamaya devam ediyoruz.",
          en: "We launch, then keep tuning difficulty, rewards and events based on player data.",
        },
      },
    ],
  },

  bot: {
    highlights: [
      { value: "23+", label: { tr: "Teslim ettiğimiz bot", en: "Bots delivered" } },
      { value: "7/24", label: { tr: "Kesintisiz çalışma ve izleme", en: "Uptime and monitoring" } },
      { value: "1–4", label: { tr: "Haftada hazır bot", en: "Weeks to a working bot" } },
    ],
    offerings: [
      {
        title: { tr: "Telegram botları ve mini uygulamalar", en: "Telegram bots and mini apps" },
        text: {
          tr: "Topluluk yönetimi, oyun, ödeme ve duyuru botları; sohbetten açılan mini uygulamalarla birlikte.",
          en: "Community, game, payment and announcement bots, along with mini apps that open from the chat.",
        },
      },
      {
        title: { tr: "WhatsApp iş akışları", en: "WhatsApp workflows" },
        text: {
          tr: "Sipariş alan, randevu veren, sık soruları yanıtlayan ve gerektiğinde konuşmayı temsilciye aktaran akışlar.",
          en: "Flows that take orders, book appointments, answer common questions and hand off to a person when needed.",
        },
      },
      {
        title: { tr: "Discord botları", en: "Discord bots" },
        text: {
          tr: "Moderasyon, üye doğrulama, rol dağıtımı, etkinlik kaydı ve sunucu içi mini oyunlar.",
          en: "Moderation, member verification, role assignment, event sign-ups and in-server mini games.",
        },
      },
      {
        title: { tr: "Veri toplama ve izleme", en: "Data collection and monitoring" },
        text: {
          tr: "Sosyal medya ve Google'daki herkese açık veriyi, fiyat ve stok değişimlerini düzenli toplayıp raporlayan scriptler.",
          en: "Scripts that regularly gather public data from social media and Google, track price and stock changes, and report on them.",
        },
      },
      {
        title: { tr: "Zamanlanmış görevler", en: "Scheduled jobs" },
        text: {
          tr: "Her sabah rapor gönderen, gece yedek alan, belirli saatte duyuru yapan küçük ama işi rahatlatan scriptler.",
          en: "Small scripts that make life easier: a morning report, a nightly backup, an announcement at a set time.",
        },
      },
      {
        title: { tr: "Panel, kayıt ve barındırma", en: "Panel, logging and hosting" },
        text: {
          tr: "Botun ayarlarını yönettiğiniz bir panel, her işlemin kaydı ve sunucuda kesintisiz çalışma.",
          en: "A panel to manage the bot's settings, a log of every action and round-the-clock hosting.",
        },
      },
    ],
    fit: {
      tr: [
        "Ekibiniz her gün aynı soruları yanıtlıyorsa",
        "Topluluğunuz Telegram ya da Discord'da büyüyorsa",
        "Aynı sayfaları her gün elle kontrol edip tabloya kopyalıyorsanız",
        "Sipariş ve randevuları mesajlaşma üzerinden alıyorsanız",
      ],
      en: [
        "Your team answers the same questions every day",
        "Your community is growing on Telegram or Discord",
        "Someone checks the same pages by hand every day and copies them into a sheet",
        "You take orders and bookings over messaging apps",
      ],
    },
    steps: [
      {
        title: { tr: "Senaryoyu çıkarma", en: "Map the scenario" },
        text: {
          tr: "Botun hangi komutlara, hangi mesajlara nasıl yanıt vereceğini ve nerede insana devredeceğini yazıyoruz.",
          en: "We write down which commands and messages the bot handles, how it replies and where it hands over to a person.",
        },
      },
      {
        title: { tr: "Geliştirme", en: "Build" },
        text: {
          tr: "Botu yazıyor, gerekirse mevcut sistemlerinize ve ödeme altyapınıza bağlıyoruz.",
          en: "We write the bot and connect it to your existing systems and payment provider where needed.",
        },
      },
      {
        title: { tr: "Test ortamında deneme", en: "Trial in a test space" },
        text: {
          tr: "Botu önce kapalı bir grupta ya da test numarasında çalıştırıyor, gerçek mesajlarla deniyoruz.",
          en: "We first run the bot in a private group or on a test number and try it with real messages.",
        },
      },
      {
        title: { tr: "Yayın ve izleme", en: "Launch and monitoring" },
        text: {
          tr: "Sunucuya alıyor, hata ve çökme durumunda bize ve size bildirim gelecek şekilde izlemeye başlıyoruz.",
          en: "We deploy it to a server and set up monitoring that alerts both of us if it errors or goes down.",
        },
      },
    ],
  },

  ai: {
    highlights: [
      { value: "8+", label: { tr: "Yapay zekâ kurduğumuz şirket", en: "Companies we've built AI for" } },
      { value: "RAG", label: { tr: "Kendi belgelerinizden yanıt", en: "Answers from your own documents" } },
      { value: "7/24", label: { tr: "Kesintisiz çalışan asistan", en: "Assistants that never clock off" } },
    ],
    offerings: [
      {
        title: { tr: "Belgelerinizle çalışan asistanlar", en: "Assistants grounded in your documents" },
        text: {
          tr: "Yönetmelik, ürün kataloğu ya da destek arşivinizden yanıt veren, kaynağını gösteren sohbet asistanları (RAG).",
          en: "Chat assistants that answer from your policies, product catalogue or support archive and cite their source (RAG).",
        },
      },
      {
        title: { tr: "Müşteri destek asistanları", en: "Customer support assistants" },
        text: {
          tr: "Web sitesinde, WhatsApp'ta ya da uygulamada sık soruları yanıtlayan, emin olmadığında temsilciye devreden asistanlar.",
          en: "Assistants on your website, WhatsApp or app that handle common questions and pass to an agent when unsure.",
        },
      },
      {
        title: { tr: "Belge okuma ve veri çıkarma", en: "Document reading and data extraction" },
        text: {
          tr: "Fatura, sözleşme ve formları okuyup alanlara ayıran, sonucu sisteminize aktaran akışlar.",
          en: "Flows that read invoices, contracts and forms into structured fields and pass the result into your systems.",
        },
      },
      {
        title: { tr: "Sınıflandırma ve yönlendirme", en: "Classification and routing" },
        text: {
          tr: "Gelen e-posta ve talepleri konusuna, aciliyetine göre ayırıp doğru kişiye ileten sistemler.",
          en: "Systems that sort incoming emails and requests by topic and urgency and route them to the right person.",
        },
      },
      {
        title: { tr: "Rapor ve içerik üretimi", en: "Reports and content drafting" },
        text: {
          tr: "Toplantı notlarını, haftalık verileri ya da ürün bilgilerini özet, rapor ve metin taslağına çeviren araçlar.",
          en: "Tools that turn meeting notes, weekly data or product details into summaries, reports and draft copy.",
        },
      },
      {
        title: { tr: "Ürününüze yapay zekâ özelliği", en: "AI features in your product" },
        text: {
          tr: "Mevcut web ya da mobil ürününüze akıllı arama, öneri veya sohbet özelliği ekliyoruz.",
          en: "We add smart search, recommendations or chat to your existing web or mobile product.",
        },
      },
    ],
    fit: {
      tr: [
        "Ekibiniz cevabı belgelerde arayarak saatler harcıyorsa",
        "Gelen talepleri elle okuyup sınıflandırıyorsanız",
        "Faturadan, formdan veri kopyalamak bir kişinin işi hâline geldiyse",
        "Ürününüze gerçekten işe yarayan bir yapay zekâ özelliği eklemek istiyorsanız",
      ],
      en: [
        "Your team spends hours searching documents for answers",
        "Someone reads and sorts incoming requests by hand",
        "Copying data from invoices or forms has become a full-time job",
        "You want an AI feature in your product that actually earns its place",
      ],
    },
    steps: [
      {
        title: { tr: "Kullanım senaryosu ve ölçüt", en: "Use case and success measure" },
        text: {
          tr: "Hangi işi kısaltacağımızı ve başarıyı nasıl ölçeceğimizi belirliyor, örnek sorulardan bir test seti hazırlıyoruz.",
          en: "We pick the task to shorten and how to measure success, and build a test set from real example questions.",
        },
      },
      {
        title: { tr: "Veri hazırlığı", en: "Data preparation" },
        text: {
          tr: "Belgelerinizi temizliyor, bölümlere ayırıyor ve aranabilir hâle getiriyoruz; hassas veriler için kuralları birlikte koyuyoruz.",
          en: "We clean your documents, split them into sections and make them searchable, and agree rules for sensitive data together.",
        },
      },
      {
        title: { tr: "Pilot", en: "Pilot" },
        text: {
          tr: "Asistanı küçük bir ekiple deniyor, test setindeki doğruluğu ve maliyeti raporluyoruz.",
          en: "We trial the assistant with a small team and report accuracy on the test set alongside cost.",
        },
      },
      {
        title: { tr: "Yaygınlaştırma ve izleme", en: "Rollout and monitoring" },
        text: {
          tr: "Herkese açıyor, yanlış yanıtları ve kullanımı izleyip modeli ve kaynakları düzenli iyileştiriyoruz.",
          en: "We open it to everyone, track wrong answers and usage, and keep improving prompts and sources.",
        },
      },
    ],
  },

  automation: {
    highlights: [
      { value: "15+", label: { tr: "Kurduğumuz otomasyon ve veri akışı", en: "Automations and data flows built" } },
      { value: "1–4", label: { tr: "Haftada kurulum", en: "Weeks to set up" } },
      { value: "7/24", label: { tr: "Akış izleme ve hata bildirimi", en: "Flow monitoring and alerts" } },
    ],
    offerings: [
      {
        title: { tr: "İş akışı analizi", en: "Workflow analysis" },
        text: {
          tr: "Ekibinizin bir işi baştan sona nasıl yaptığını çıkarıyor, en çok zaman alan adımı buluyoruz.",
          en: "We map how your team does a job from start to finish and find the step that eats the most time.",
        },
      },
      {
        title: { tr: "Sipariş, fatura ve kargo", en: "Orders, invoicing and shipping" },
        text: {
          tr: "Mağazadan gelen siparişin faturasını kesen, kargo etiketini hazırlayan ve müşteriye haber veren akışlar.",
          en: "Flows that invoice each new order, prepare the shipping label and notify the customer.",
        },
      },
      {
        title: { tr: "CRM ve e-posta otomasyonu", en: "CRM and email automation" },
        text: {
          tr: "Formdan gelen müşteri adayını CRM'e işleyen, takip e-postalarını zamanında gönderen kurgular.",
          en: "Set-ups that log form leads in your CRM and send follow-up emails on time.",
        },
      },
      {
        title: { tr: "API entegrasyonları", en: "API integrations" },
        text: {
          tr: "Hazır bağlantısı olmayan iki sistemi API ya da webhook üzerinden konuşturuyoruz.",
          en: "We get two systems with no ready-made connector talking through APIs or webhooks.",
        },
      },
      {
        title: { tr: "Otomatik rapor ve bildirim", en: "Automated reports and alerts" },
        text: {
          tr: "Satış, stok ya da reklam verisini her sabah tek bir rapora toplayan, eşik aşıldığında haber veren akışlar.",
          en: "Flows that pull sales, stock or ad data into one report each morning and alert you when a threshold is crossed.",
        },
      },
      {
        title: { tr: "Yapay zekâ destekli adımlar", en: "AI-assisted steps" },
        text: {
          tr: "Akışın içine metin okuyan, sınıflandıran ya da taslak hazırlayan yapay zekâ adımları; onay sizde kalır.",
          en: "AI steps inside the flow that read, classify or draft text, while approval stays with you.",
        },
      },
    ],
    fit: {
      tr: [
        "Aynı veriyi iki farklı ekrana giriyorsanız",
        "Raporları her hafta elle hazırlıyorsanız",
        "Bir adım unutulduğunda sipariş ya da müşteri kaybediyorsanız",
        "Kullandığınız araçlar birbirinden habersizse",
      ],
      en: [
        "You type the same data into two different screens",
        "Someone builds reports by hand every week",
        "A forgotten step costs you an order or a customer",
        "Your tools don't know about each other",
      ],
    },
    steps: [
      {
        title: { tr: "Süreci haritalama", en: "Map the process" },
        text: {
          tr: "İşin kimden geldiğini, hangi araçlardan geçtiğini ve nerede tıkandığını adım adım çiziyoruz.",
          en: "We draw step by step where the work comes from, which tools it passes through and where it gets stuck.",
        },
      },
      {
        title: { tr: "Önceliklendirme", en: "Prioritise" },
        text: {
          tr: "En çok zaman kazandıracak akıştan başlıyoruz; tasarruf edilecek saati baştan hesaplıyoruz.",
          en: "We start with the flow that saves the most time and estimate the hours saved up front.",
        },
      },
      {
        title: { tr: "Kurulum ve deneme", en: "Build and trial" },
        text: {
          tr: "Akışı kuruyor, önce gerçek verinin bir kopyasıyla çalıştırıp sonuçları sizinle kontrol ediyoruz.",
          en: "We build the flow and first run it on a copy of real data, checking the results with you.",
        },
      },
      {
        title: { tr: "Devreye alma ve izleme", en: "Go live and monitor" },
        text: {
          tr: "Canlıya alıyor, her çalışmanın kaydını tutuyor ve takılan adımda bildirim gönderiyoruz.",
          en: "We switch it on, log every run and send an alert whenever a step stalls.",
        },
      },
    ],
  },

  saas: {
    highlights: [
      { value: "8–16", label: { tr: "Haftada MVP", en: "Weeks to an MVP" } },
      { value: "1", label: { tr: "Kendi SaaS ürünümüz: QR Menü", en: "SaaS product of our own: QR Menu" } },
      { value: "2", label: { tr: "Ödeme altyapısı: iyzico ve Stripe", en: "Payment rails: iyzico and Stripe" } },
    ],
    offerings: [
      {
        title: { tr: "MVP kapsamı ve yol haritası", en: "MVP scope and roadmap" },
        text: {
          tr: "İlk ödeyen müşteriye ulaşmak için gereken en küçük ürünü tanımlıyor, sonrasını sıraya koyuyoruz.",
          en: "We define the smallest product that gets you to a first paying customer and line up what comes next.",
        },
      },
      {
        title: { tr: "Çok kiracılı altyapı", en: "Multi-tenant architecture" },
        text: {
          tr: "Her müşterinin verisi ayrı ve güvende; tek altyapı yüzlerce firmaya hizmet verebilir.",
          en: "Each customer's data stays separate and safe, while one foundation serves hundreds of companies.",
        },
      },
      {
        title: { tr: "Abonelik ve ödeme", en: "Subscriptions and billing" },
        text: {
          tr: "Deneme süresi, paket yükseltme, yenileme ve fatura; Türkiye ve yurt dışı ödeme sağlayıcılarıyla.",
          en: "Trials, plan upgrades, renewals and invoices, with Turkish and international payment providers.",
        },
      },
      {
        title: { tr: "Rol, yetki ve ekip yönetimi", en: "Roles, permissions and teams" },
        text: {
          tr: "Müşterinizin kendi ekibini davet edip kimin neyi görebileceğini belirleyebildiği yapı.",
          en: "A structure where your customers invite their own team and decide who can see what.",
        },
      },
      {
        title: { tr: "Yönetim ve raporlama paneli", en: "Admin and reporting dashboard" },
        text: {
          tr: "Kayıtları, gelirleri, aktif kullanımı ve kaybedilen müşterileri tek ekranda gördüğünüz panel.",
          en: "A dashboard showing sign-ups, revenue, active usage and churn on one screen.",
        },
      },
      {
        title: { tr: "Ölçekleme ve güvenlik", en: "Scaling and security" },
        text: {
          tr: "Otomatik yedek, izleme, hata takibi ve kullanıcı arttıkça büyüyen sunucu yapısı.",
          en: "Automatic backups, monitoring, error tracking and servers that grow as users do.",
        },
      },
    ],
    fit: {
      tr: [
        "Bir sektörün ortak sorununu çözen bir yazılım fikriniz varsa",
        "Şirket içinde kullandığınız aracı başka firmalara satmak istiyorsanız",
        "Ürününüz için abonelik modeline geçmek istiyorsanız",
        "MVP'nizi yatırımcıya göstermeden önce gerçek müşteriyle denemek istiyorsanız",
      ],
      en: [
        "You have a software idea that solves a shared problem in an industry",
        "You want to sell a tool you use in-house to other companies",
        "You want to move your product to a subscription model",
        "You want to test your MVP with real customers before pitching investors",
      ],
    },
    steps: [
      {
        title: { tr: "Problem ve ilk müşteri", en: "Problem and first customer" },
        text: {
          tr: "Ürünün kimin hangi sorununu çözdüğünü ve ilk kime satılacağını netleştiriyoruz.",
          en: "We pin down whose problem the product solves and who you'll sell it to first.",
        },
      },
      {
        title: { tr: "MVP tasarımı", en: "MVP design" },
        text: {
          tr: "Kayıttan ödemeye kadar ana akışı tasarlıyor, olmazsa olmaz özellikleri seçiyoruz.",
          en: "We design the main flow from sign-up to payment and choose the must-have features.",
        },
      },
      {
        title: { tr: "Geliştirme ve kapalı beta", en: "Build and closed beta" },
        text: {
          tr: "Hazır temel üzerine ürüne özel kısmı geliştiriyor, ilk kullanıcılarla kapalı betaya çıkıyoruz.",
          en: "We build the product-specific part on our ready foundation and open a closed beta with first users.",
        },
      },
      {
        title: { tr: "Lansman ve büyüme", en: "Launch and growth" },
        text: {
          tr: "Ücretli lansmanı yapıyor, kullanım verisine bakarak yol haritasını birlikte güncelliyoruz.",
          en: "We run the paid launch and update the roadmap together based on usage data.",
        },
      },
    ],
  },

  web3: {
    highlights: [
      { value: "2021", label: { tr: "Yılından beri Web3 projeleri", en: "Building Web3 since" } },
      { value: "Testnet", label: { tr: "Her sözleşme önce burada denenir", en: "Where every contract is tried first" } },
      { value: "EVM · TON", label: { tr: "Çalıştığımız ağlar", en: "Networks we build on" } },
    ],
    offerings: [
      {
        title: { tr: "Akıllı sözleşme geliştirme", en: "Smart contract development" },
        text: {
          tr: "Token, NFT, stake ve ödül sözleşmeleri; kapsamlı testlerle ve okunabilir kodla.",
          en: "Token, NFT, staking and reward contracts, with thorough tests and readable code.",
        },
      },
      {
        title: { tr: "Cüzdan bağlantısı", en: "Wallet connection" },
        text: {
          tr: "Kullanıcının cüzdanını bağlayıp işlem imzaladığı akışlar; kripto bilmeyen kullanıcı için sade ekranlar.",
          en: "Flows where users connect a wallet and sign transactions, with simple screens for people new to crypto.",
        },
      },
      {
        title: { tr: "Token ve ödül mekanikleri", en: "Token and reward mechanics" },
        text: {
          tr: "Görev, davet ve aktiviteye göre ödül dağıtan sistemler; adım sayarla token kazandıran uygulamalar gibi.",
          en: "Systems that reward tasks, referrals and activity, like apps that pay out tokens for steps walked.",
        },
      },
      {
        title: { tr: "Token tanıtım siteleri ve dApp arayüzleri", en: "Token sites and dApp interfaces" },
        text: {
          tr: "Token ekonomisini, yol haritasını ve satın alma adımlarını anlatan siteler; zincirle konuşan web arayüzleri.",
          en: "Sites that explain tokenomics, the roadmap and how to buy, plus web interfaces that talk to the chain.",
        },
      },
      {
        title: { tr: "Telegram içi kripto oyunları", en: "Crypto games inside Telegram" },
        text: {
          tr: "TON ekosistemiyle çalışan, sohbetten açılan oyun ve ödül mini uygulamaları.",
          en: "Game and reward mini apps that open from the chat and work with the TON ecosystem.",
        },
      },
      {
        title: { tr: "Test, yayın ve izleme", en: "Testing, deployment and monitoring" },
        text: {
          tr: "Test ağında deneme, ana ağa yayın ve sözleşme hareketlerini izleyen uyarılar.",
          en: "Testnet trials, mainnet deployment and alerts that watch contract activity.",
        },
      },
    ],
    fit: {
      tr: [
        "Topluluğunuz için bir token ya da ödül sistemi kurmak istiyorsanız",
        "Mevcut uygulamanıza cüzdan ve kripto ödeme eklemek istiyorsanız",
        "Telegram'da TON tabanlı bir oyun ya da mini uygulama planlıyorsanız",
        "Yazılmış bir sözleşmenin testlerini ve yayınını devretmek istiyorsanız",
      ],
      en: [
        "You want a token or reward system for your community",
        "You want to add wallets and crypto payments to an existing app",
        "You're planning a TON-based game or mini app on Telegram",
        "You want someone to take over testing and deploying an existing contract",
      ],
    },
    steps: [
      {
        title: { tr: "Mekanik ve ağ seçimi", en: "Mechanics and network choice" },
        text: {
          tr: "Token ya da ödül mekaniğini yazıya döküyor, işlem ücreti ve kullanıcı kitlesine göre ağı seçiyoruz.",
          en: "We write out the token or reward mechanics and choose the network by fees and audience.",
        },
      },
      {
        title: { tr: "Sözleşme ve testler", en: "Contracts and tests" },
        text: {
          tr: "Sözleşmeyi yazarken her senaryoyu testle güvenceye alıyor, sınır durumları ayrıca deniyoruz.",
          en: "We cover every scenario with tests as we write the contract, and probe edge cases separately.",
        },
      },
      {
        title: { tr: "Test ağı ve arayüz", en: "Testnet and interface" },
        text: {
          tr: "Sözleşmeyi test ağına alıyor, arayüzü bağlayıp tüm akışı gerçek cüzdanlarla deniyoruz.",
          en: "We deploy to testnet, wire up the interface and try the whole flow with real wallets.",
        },
      },
      {
        title: { tr: "Ana ağ ve izleme", en: "Mainnet and monitoring" },
        text: {
          tr: "Ana ağa yayınlıyor, sözleşme hareketlerini izleyip beklenmedik bir durumda haber veriyoruz.",
          en: "We deploy to mainnet, watch contract activity and alert you if anything unexpected happens.",
        },
      },
    ],
  },
};
