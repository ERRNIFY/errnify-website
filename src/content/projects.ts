import type { L, Locale } from "@/lib/i18n";
import type { ServiceId } from "./services";

export type MockKind = "browser" | "phone" | "dashboard" | "chat" | "game";
export type Tone = "cobalt" | "firuze" | "coral";

export type Project = {
  slug: string;
  /** Marka adı düz metin; anonim işlerin genel başlığı dile göre değişir */
  title: string | L;
  /** Marka adı Türkçe değilse true: büyük harfte I noktasız kalır (WINCOI, UNIFLOW) */
  latin?: boolean;
  /** Başlığın altındaki kısa tanım */
  tagline: L;
  summary: L;
  challenge: L;
  solution: L;
  features: L<string[]>;
  services: ServiceId[];
  /** Ne teslim edildi (platformlar) */
  platforms: L<string[]>;
  /** Kapak görselindeki cihaz çizimi ve vurgu rengi */
  mock: MockKind;
  tone: Tone;
  link?: string;
  /** Ana sayfada öne çıkar */
  featured?: boolean;
  /**
   * archived: yayından kalkmış eski iş.
   * private: gizlilik sözleşmeli işlerin anonim özeti; müşteri adı ve bağlantı verilmez.
   */
  status?: "archived" | "private";
  /** Anonim gruplarda kaç iş yapıldığı ("12 bot") */
  count?: L;
};

export const projects: Project[] = [
  {
    slug: "the-uniflow",
    title: "The Uniflow",
    latin: true,
    tagline: {
      tr: "Üniversite etkinlik ve kulüp yönetim platformu",
      en: "University event and club management platform",
    },
    summary: {
      tr: "Öğrencilerin kampüs etkinliklerini keşfedip QR biletle girdiği; kulüplerin, üniversite yönetiminin ve markaların aynı ekosistemde buluştuğu platform.",
      en: "A platform where students discover campus events and enter with a QR ticket, and where clubs, university administrations and brands meet in one ecosystem.",
    },
    challenge: {
      tr: "Kulüpler etkinliklerini sosyal medya gönderileri, mesaj grupları ve Excel listeleriyle yönetiyordu. Kimin gerçekten katıldığı bilinmiyor, sponsorlar yatırımlarının karşılığını ölçemiyordu.",
      en: "Clubs ran events through social posts, group chats and spreadsheets. Nobody knew who actually showed up, and sponsors couldn't measure what their money returned.",
    },
    solution: {
      tr: "Üniversite e-postasıyla doğrulanan öğrenciler etkinliğe katılınca dijital bilet alıyor, girişte görevli QR kodu okutuyor. Kulüp yöneticileri etkinlik açıp kayıt, gerçek katılım, bölüm ve sınıf dağılımını panelden görüyor.",
      en: "Students verified by university email get a digital ticket when they join an event, scanned by staff at the door. Club admins create events and see sign-ups, real attendance and department and year breakdowns in a panel.",
    },
    features: {
      tr: ["Üniversite e-postasıyla doğrulama", "Herkese açık, kampüs ve kulüp etkinlikleri", "QR biletle giriş kontrolü", "Katılım ve bölüm istatistikleri", "Kulüp ve üye yönetimi", "Çok dilli uygulama"],
      en: ["University email verification", "Public, campus and club-only events", "QR ticket check-in", "Attendance and department stats", "Club and member management", "Multilingual app"],
    },
    services: ["mobile", "web"],
    platforms: { tr: ["iOS", "Android", "Web sitesi"], en: ["iOS", "Android", "Website"] },
    mock: "phone",
    tone: "cobalt",
    link: "https://theuniflow.com/",
    featured: true,
  },
  {
    slug: "wincoi",
    title: "Wincoi",
    latin: true,
    tagline: {
      tr: "Gençler için esnek iş platformu",
      en: "Flexible work platform for young people",
    },
    summary: {
      tr: "Öğrencileri ve genç yetenekleri etkinlik görevlisi, promotör, saha anketörü gibi kısa süreli işlerle buluşturan platform: haritada yakındaki ilanı bul, özgeçmişsiz tek dokunuşla başvur.",
      en: "A platform matching students and young talent with short-term work such as event staff, promoters and field surveyors: find a listing on the map, apply in one tap with no CV.",
    },
    challenge: {
      tr: "Günlük ve esnek işlerde uzun başvuru formları iki tarafı da yavaşlatıyordu. İşveren bugün birine ihtiyaç duyuyor, aday ise haftalar sonra yanıt alıyordu.",
      en: "For day jobs and flexible work, long application forms slowed both sides down. Employers needed someone today; candidates heard back weeks later.",
    },
    solution: {
      tr: "Formu kaldırdık. Aday konumuna, becerisine ve müsaitliğine uyan ilanları görüyor, işverenle uygulama içinden yazışıyor. İşveren ilanı açıyor, filtrelenmiş aday listesinden onay veriyor ve iş bitince çalışanı puanlıyor.",
      en: "We removed the form. Candidates see listings that fit their location, skills and availability and message employers in the app. Employers post a job, approve from a filtered shortlist and rate the worker afterwards.",
    },
    features: {
      tr: ["Harita üzerinde ilan keşfi", "Özgeçmişsiz tek dokunuşla başvuru", "İşverenle uygulama içi mesajlaşma", "Çift yönlü puanlama", "Rozet ve görevlerle ödül sistemi", "İşveren paneli"],
      en: ["Map-based job discovery", "One-tap apply, no CV", "In-app messaging with employers", "Two-way ratings", "Badges and task rewards", "Employer panel"],
    },
    services: ["mobile", "web"],
    platforms: { tr: ["iOS", "Android", "Web sitesi"], en: ["iOS", "Android", "Website"] },
    mock: "phone",
    tone: "firuze",
    link: "https://wincoi.com/",
    featured: true,
  },
  {
    slug: "clysterum",
    title: "Clysterum",
    latin: true,
    tagline: {
      tr: "Adım at, coin kazan: sağlık ve kripto uygulaması",
      en: "Walk and earn: a health and crypto app",
    },
    summary: {
      tr: "Kullanıcının attığı adımları token'a çeviren, acil kan bağışı çağrılarını ve nöbetçi eczaneleri tek uygulamada toplayan, yapay zekâ sağlık asistanı DocGPT'yi barındıran mobil uygulama. On binlerce indirmeye ulaştı.",
      en: "A mobile app that turns the user's steps into tokens, brings urgent blood-donation calls and on-duty pharmacies into one place, and includes DocGPT, an AI health assistant. It reached tens of thousands of downloads.",
    },
    challenge: {
      tr: "Sağlıklı yaşamı özendiren uygulamalar kısa sürede unutuluyordu. Hedef, kullanıcıyı her gün geri getirecek bir ödül döngüsü ile gerçekten işe yarayan sağlık araçlarını aynı yerde sunmaktı.",
      en: "Apps that encourage healthy habits tend to be forgotten within weeks. The goal was a reward loop that brings people back every day, alongside health tools that are genuinely useful.",
    },
    solution: {
      tr: "Telefonun sağlık verisinden gelen adım sayısını CLY token ödülüne bağladık; kullanıcı kazancını uygulama içinden takip edip çekebiliyor. DocGPT, sağlık sorularını seçilmiş kaynaklardan yanıtlayan RAG tabanlı bir sohbet asistanı olarak çalışıyor.",
      en: "We tied the step count from the phone's health data to CLY token rewards, which users can track and withdraw in the app. DocGPT runs as a RAG-based chat assistant that answers health questions from curated sources.",
    },
    features: {
      tr: ["Adım sayarla token kazanma", "DocGPT yapay zekâ sağlık asistanı", "Acil kan bağışı çağrıları", "Yakındaki hastane ve nöbetçi eczaneler", "İlaç takibi ve hatırlatıcı", "Uygulama içi cüzdan"],
      en: ["Earn tokens by walking", "DocGPT AI health assistant", "Urgent blood-donation calls", "Nearby hospitals and on-duty pharmacies", "Medication tracker and reminders", "In-app wallet"],
    },
    services: ["mobile", "ai", "web3", "web"],
    platforms: { tr: ["iOS", "Android", "Web sitesi"], en: ["iOS", "Android", "Website"] },
    mock: "phone",
    tone: "coral",
    featured: true,
    status: "archived",
  },
  {
    slug: "final-io",
    title: "Final IO",
    latin: true,
    tagline: {
      tr: "Turnuva ve lig yönetim uygulaması",
      en: "Tournament and league management app",
    },
    summary: {
      tr: "E-spor klanlarından arkadaş gruplarına, saha sporlarından masa oyunlarına her turnuvayı dakikalar içinde kurdurup fikstürü, puan tablosunu ve eşleşmeleri kendiliğinden yöneten uygulama.",
      en: "An app that sets up any tournament in minutes, from esports clans and friend groups to field sports and board games, and runs fixtures, tables and brackets on its own.",
    },
    challenge: {
      tr: "Turnuva düzenleyenler fikstürü kâğıtta ya da tabloda elle hazırlıyor, her skordan sonra puan durumunu yeniden hesaplıyor ve sonucu katılımcılara tek tek iletiyordu.",
      en: "Organisers drew up fixtures by hand on paper or in spreadsheets, recalculated standings after every score and sent results to each participant one by one.",
    },
    solution: {
      tr: "Organizatör formatı seçip katılımcıları ekliyor; fikstür kendiliğinden oluşuyor. Skor girildiği anda tablo ve eşleşme ağacı güncelleniyor. Güç puanına göre kura, güçlü takımların erken karşılaşmasını önlüyor.",
      en: "The organiser picks a format and adds participants, and the fixtures generate themselves. Entering a score updates the table and bracket at once. Power-score seeding keeps strong teams from meeting too early.",
    },
    features: {
      tr: ["Eleme, lig, grup ve grup + playoff formatları", "Otomatik fikstür ve puan tablosu", "Güç puanıyla dengeli kura", "Katılım koduyla takip", "Sahip, yönetici ve üye rolleri", "Paylaşılabilir sonuç görseli"],
      en: ["Knockout, league, group and group + playoff formats", "Automatic fixtures and standings", "Balanced draw with power scores", "Follow by join code", "Owner, admin and member roles", "Shareable results image"],
    },
    services: ["mobile", "web"],
    platforms: { tr: ["iOS", "Android", "Web sitesi"], en: ["iOS", "Android", "Website"] },
    mock: "phone",
    tone: "cobalt",
    link: "https://final-io.com/",
    featured: true,
  },
  {
    slug: "skandinavien-homes",
    title: "Skandinavien Homes",
    latin: true,
    tagline: {
      tr: "Alanya'da ev hizmetleri ve site yönetimi",
      en: "Home services and property management in Alanya",
    },
    summary: {
      tr: "Alanya'da ev sahiplerine site yönetimi, daire kontrolü, temizlik, bakım-onarım ve emlak desteği veren firmanın web sitesi, müşteri paneli ve mobil uygulaması.",
      en: "Website, customer panel and mobile app for an Alanya firm offering property management, apartment inspections, cleaning, maintenance and real-estate support to homeowners.",
    },
    challenge: {
      tr: "Ev sahiplerinin çoğu yılın büyük bölümünde Alanya'da değil. Dairelerinde ne yapıldığını telefonla, mesajla ve dağınık fotoğraflarla takip etmeye çalışıyorlardı.",
      en: "Most owners aren't in Alanya for much of the year. They were trying to follow what happened in their apartment through calls, messages and scattered photos.",
    },
    solution: {
      tr: "Talep, planlama, sahada fotoğraflı uygulama ve raporlama adımlarını tek bir müşteri paneline taşıdık. Ev sahibi aynı hesapla web'den ya da mobil uygulamadan taleplerini, raporlarını ve hesap hareketlerini izliyor; ekip işleri ayrı bir yönetim panelinden yürütüyor.",
      en: "We moved request, scheduling, photo-documented field work and reporting into a single customer panel. Owners follow their requests, reports and account on the web or in the mobile app with one login, while the team runs the work from a separate admin panel.",
    },
    features: {
      tr: ["Web ve mobilde tek hesapla müşteri paneli", "Fotoğraflı iş raporları", "Daire kontrolü, temizlik ve bakım talepleri", "Teklif ve hesap bildirimleri", "Satılık daire ilanları", "Yönetim paneli"],
      en: ["One-login customer panel on web and mobile", "Photo-documented work reports", "Inspection, cleaning and maintenance requests", "Quote and account notifications", "Apartment-for-sale listings", "Admin panel"],
    },
    services: ["web", "mobile", "saas"],
    platforms: { tr: ["Web sitesi", "Mobil uygulama", "Müşteri paneli"], en: ["Website", "Mobile app", "Customer panel"] },
    mock: "dashboard",
    tone: "firuze",
    link: "https://www.skandinavienhomes.com/",
    featured: true,
  },
  {
    slug: "flipifytr",
    title: "FlipifyTR",
    latin: true,
    tagline: {
      tr: "Videodan kişiye özel flipbook e-ticaret sitesi",
      en: "E-commerce for custom flipbooks made from video",
    },
    summary: {
      tr: "Müşterinin yüklediği kısa videoyu çizgi roman, anime ya da karakalem tarzında basılı bir cep flipbook'a dönüştüren markanın e-ticaret sitesi.",
      en: "The online store of a brand that turns a customer's short video into a printed pocket flipbook in comic, anime or pencil-sketch style.",
    },
    challenge: {
      tr: "Ürün her sipariş için yeniden üretiliyor. Sıradan bir sepet akışı yetmiyordu; müşterinin videosunu, seçtiği stili ve notunu siparişle birlikte güvenle almak gerekiyordu.",
      en: "Every order is made from scratch, so a standard cart wasn't enough. The store had to take the customer's video, chosen style and notes safely along with the order.",
    },
    solution: {
      tr: "Video yükleme, stil ve paket seçimi, ödeme ve sipariş takibini tek bir akışta topladık. Yüklenen videolar bulut depolamada saklanıyor; müşteri üretim durumunu profilinden izliyor. Özel gün sayfaları ve blog aramadan gelen trafiği karşılıyor.",
      en: "We put video upload, style and package choice, payment and order tracking into one flow. Uploads are kept in cloud storage and customers follow production from their profile. Occasion pages and a blog catch search traffic.",
    },
    features: {
      tr: ["Siparişe video yükleme", "Stil ve paket seçimi", "Üyelik ve sipariş takibi", "Güvenli ödeme", "Özel gün sayfaları", "Blog ve SSS"],
      en: ["Video upload with the order", "Style and package choice", "Accounts and order tracking", "Secure checkout", "Occasion landing pages", "Blog and FAQ"],
    },
    services: ["web"],
    platforms: { tr: ["E-ticaret sitesi"], en: ["Online store"] },
    mock: "browser",
    tone: "coral",
    link: "https://flipifytr.com/",
    featured: true,
  },
  {
    slug: "erkan-steak-house",
    title: "Erkan Steak House",
    tagline: {
      tr: "Kasap ve steakhouse için online sipariş sitesi",
      en: "Online ordering for a butcher and steakhouse",
    },
    summary: {
      tr: "Fatih'teki kasap ve steakhouse'un çiğ et ile pişmiş ızgara ürünlerini aynı sepette satan, İstanbul'un belirli ilçelerine teslimat yapan e-ticaret sitesi.",
      en: "An online store for a butcher and steakhouse in Fatih, Istanbul, selling raw cuts and cooked grill dishes in one cart, with delivery to selected districts.",
    },
    challenge: {
      tr: "Çiğ et kiloyla ya da porsiyonla, bütün, dilim veya kuşbaşı satılıyor; ızgara ürünlerde menü ve ekmek seçenekleri var. Siparişlerin büyük kısmı telefonla alınıyor, karışıklık çıkıyordu.",
      en: "Raw meat is sold by the kilo or portion, whole, sliced or cubed, and grill dishes come with menu and bread options. Most orders came by phone, and mix-ups were common.",
    },
    solution: {
      tr: "Menüyü çiğ et reyonu, pişmiş et reyonu ve içecekler olarak üçe ayırdık; her ürüne kendi seçeneklerini tanımladık. Teslimat bölgesi adres seçilirken kontrol ediliyor, ödeme kapıda nakit ya da kartla alınıyor.",
      en: "We split the menu into a raw-meat counter, a cooked-meat counter and drinks, each product with its own options. The delivery zone is checked when the address is chosen, and payment is cash or card at the door.",
    },
    features: {
      tr: ["Kilo ve porsiyon bazlı satış", "Kesim ve menü seçenekleri", "Teslimat bölgesi kontrolü", "Kapıda ödeme", "Sipariş durumu takibi", "Ürün sayfaları ve SSS"],
      en: ["Sold by kilo or portion", "Cut and menu options", "Delivery zone check", "Pay on delivery", "Order status tracking", "Product pages and FAQ"],
    },
    services: ["web"],
    platforms: { tr: ["E-ticaret sitesi"], en: ["Online store"] },
    mock: "browser",
    tone: "coral",
    link: "https://www.erkansteakhouse.com/",
  },
  {
    slug: "alsa-study",
    title: "Alsa Study",
    latin: true,
    tagline: {
      tr: "Üniversite programı arama ve başvuru platformu",
      en: "University programme search and application platform",
    },
    summary: {
      tr: "Uluslararası öğrencilerin Türkiye, Kuzey Kıbrıs, Azerbaycan ve Rusya'daki 3.400'den fazla program arasından kendilerine uygun olanı bulup başvurduğu platform.",
      en: "A platform where international students search more than 3,400 programmes in Türkiye, Northern Cyprus, Azerbaijan and Russia and apply to the one that fits.",
    },
    challenge: {
      tr: "Yurt dışında okumak isteyen öğrenciler onlarca üniversite sitesi arasında kayboluyor, danışmanlar ise aynı soruları tekrar tekrar yanıtlıyordu.",
      en: "Students looking to study abroad got lost among dozens of university sites, while counsellors answered the same questions over and over.",
    },
    solution: {
      tr: "Programları ülke, şehir, derece, alan, eğitim dili ve fiyat aralığına göre süzülebilir hâle getirdik. Her kartta indirimli ücret ve tek tıkla başvuru düğmesi var; üniversite tanıtımları blogda yer alıyor.",
      en: "We made programmes filterable by country, city, degree, field, language of instruction and price range. Each card shows the discounted fee and a one-click apply button, and university profiles live on the blog.",
    },
    features: {
      tr: ["3.400+ programlık katalog", "Ülke, derece, dil ve fiyat filtreleri", "İndirimli ücret gösterimi", "Tek tıkla başvuru", "Üniversite tanıtım yazıları", "İçerik yönetim paneli"],
      en: ["Catalogue of 3,400+ programmes", "Country, degree, language and price filters", "Discounted fee display", "One-click apply", "University profile articles", "Content admin panel"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "browser",
    tone: "firuze",
    link: "https://www.alsastudy.com/",
  },
  {
    slug: "vegas-e-spor",
    title: "Vegas E-Spor",
    tagline: {
      tr: "E-spor merkezi web sitesi ve online rezervasyon",
      en: "Esports centre website with online booking",
    },
    summary: {
      tr: "Fatih'te 50 oyun bilgisayarı, simülasyon yarış kokpitleri ve PS5 alanıyla 7/24 açık e-spor merkezinin tanıtım ve rezervasyon sitesi.",
      en: "Website and booking for a 24/7 esports centre in Fatih with 50 gaming PCs, sim-racing rigs and a PS5 area.",
    },
    challenge: {
      tr: "Oyuncular hangi donanımın olduğunu, saatlik ücreti ve boş yer olup olmadığını öğrenmek için mekânı arıyor ya da sosyal medyadan yazıyordu.",
      en: "Players had to call or message on social media to find out the hardware, the hourly rate and whether a seat was free.",
    },
    solution: {
      tr: "Donanım özelliklerini, paket fiyatlarını, yemek menüsünü ve turnuvaları açıkça gösteren bir site kurduk. Oyuncu istediği alanı siteden doğrudan ayırtıyor.",
      en: "We built a site that lays out the hardware, package prices, food menu and tournaments, and lets players book their spot directly.",
    },
    features: {
      tr: ["Online rezervasyon", "Paket ve saatlik fiyat listesi", "PC, PS5 ve sim yarış alanları", "Turnuva ve etkinlik duyuruları", "Yemek menüsü", "Galeri ve SSS"],
      en: ["Online booking", "Packages and hourly prices", "PC, PS5 and sim-racing areas", "Tournament and event news", "Food menu", "Gallery and FAQ"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "browser",
    tone: "cobalt",
    link: "https://vegasespor.com.tr/",
  },
  {
    slug: "ugr-iklimlendirme",
    title: "UGR İklimlendirme",
    tagline: {
      tr: "İklimlendirme ve F-gaz hizmetleri sitesi",
      en: "HVAC and F-gas services website",
    },
    summary: {
      tr: "Sancaktepe'deki iklimlendirme firmasının montaj, bakım, onarım ve F-gaz sızıntı kontrolü hizmetlerini anlatan, servis talebi toplayan web sitesi.",
      en: "A website for a Sancaktepe HVAC firm that explains installation, maintenance, repair and F-gas leak control, and collects service requests.",
    },
    challenge: {
      tr: "İşletmeler F-gaz mevzuatı kapsamında ne sıklıkla sızıntı kontrolü yaptırmaları gerektiğini bilmiyor; firma da bu soruları tek tek telefonda yanıtlıyordu.",
      en: "Businesses didn't know how often F-gas rules required a leak check, and the firm answered the question call by call.",
    },
    solution: {
      tr: "Sitede bir F-gaz hesaplayıcı kurduk: kullanıcı soğutucu gazı ve miktarını seçiyor, CO₂ eşdeğerine göre kontrol sıklığını anında görüyor. Hesaplayıcı ve blog yazıları ziyaretçiyi servis talep formuna yönlendiriyor.",
      en: "We built an F-gas calculator into the site: users pick a refrigerant and amount and instantly see the required check frequency by CO₂ equivalent. The calculator and blog posts lead visitors to the service request form.",
    },
    features: {
      tr: ["F-gaz kontrol sıklığı hesaplayıcı", "Servis talep formu", "Hizmet detay sayfaları", "Mevzuat ve bakım yazıları", "Tek dokunuşla arama", "Mobil öncelikli tasarım"],
      en: ["F-gas check-frequency calculator", "Service request form", "Service detail pages", "Regulation and maintenance articles", "One-tap call", "Mobile-first design"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "browser",
    tone: "firuze",
    link: "https://ugriklimlendirme.com/",
  },
  {
    slug: "catalca-villa-peyzaj",
    title: "Çatalca Villa Peyzaj",
    tagline: {
      tr: "Bahçe tasarımı ve peyzaj hizmetleri",
      en: "Garden design and landscaping services",
    },
    summary: {
      tr: "Çatalca'da villa peyzajı, otomatik sulama, havuz, aydınlatma ve bahçe bakımı yapan firmanın hizmetlerini, bitki kataloğunu ve işlerini sergileyen web sitesi.",
      en: "A website for a Çatalca firm doing villa landscaping, automatic irrigation, pools, lighting and garden care, with its services, plant catalogue and past work.",
    },
    challenge: {
      tr: "Firma işlerini yalnızca tavsiyeyle buluyordu. Bölgede peyzaj arayan biri aramada firmayı göremiyor, yapılan bahçeleri inceleyemiyordu.",
      en: "The firm relied on word of mouth alone. Someone searching for landscaping in the area couldn't find them or see the gardens they had built.",
    },
    solution: {
      tr: "On bir hizmetin her birine ayrı sayfa açtık, yerel aramaya göre yapılandırdık. Bitki kataloğu, galeri ve blog panelden güncelleniyor; ziyaretçi WhatsApp'tan ya da tek dokunuşla teklif istiyor.",
      en: "We gave each of the eleven services its own page, structured for local search. The plant catalogue, gallery and blog are updated from a panel, and visitors ask for a quote on WhatsApp or in one tap.",
    },
    features: {
      tr: ["11 hizmet sayfası", "Aranabilir bitki kataloğu", "Fotoğraf ve video galerisi", "WhatsApp ve teklif düğmeleri", "Yerel SEO yapısı", "İçerik yönetim paneli"],
      en: ["11 service pages", "Searchable plant catalogue", "Photo and video gallery", "WhatsApp and quote buttons", "Local SEO structure", "Content admin panel"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "browser",
    tone: "cobalt",
  },
  {
    slug: "yesil-yol-peyzaj",
    title: "Yeşil Yol Peyzaj",
    tagline: {
      tr: "İstanbul geneli peyzaj ve bahçe yenileme",
      en: "Landscaping and garden renovation across Istanbul",
    },
    summary: {
      tr: "Ataşehir merkezli, İstanbul genelinde bahçe tasarımı, çim ve bitkilendirme, sulama sistemi ve bahçe bakımı yapan firmanın web sitesi.",
      en: "A website for an Ataşehir-based firm offering garden design, lawn and planting, irrigation systems and garden care across Istanbul.",
    },
    challenge: {
      tr: "Peyzaj işinde müşteri, karar vermeden önce yapılmış işleri görmek istiyor. Firmanın bunları gösterebileceği ve randevu alabileceği bir yer yoktu.",
      en: "In landscaping, customers want to see finished work before they decide. The firm had nowhere to show it or take bookings.",
    },
    solution: {
      tr: "Tamamlanan projeleri galeride öne çıkardık; ziyaretçi hazır mesajlı WhatsApp bağlantısıyla ya da iletişim formundan randevu istiyor. Bahçe bakımı rehberleri blogda aramadan gelen trafiği karşılıyor; içerik panelden güncelleniyor.",
      en: "We put finished projects up front in a gallery, and visitors request an appointment through a pre-filled WhatsApp link or the contact form. Garden-care guides on the blog catch search traffic, and content is updated from a panel.",
    },
    features: {
      tr: ["Tamamlanan projeler galerisi", "Hazır mesajlı WhatsApp randevusu", "İletişim formu", "Bahçe bakımı blogu", "SSS bölümü", "İçerik yönetim paneli"],
      en: ["Finished-projects gallery", "Pre-filled WhatsApp booking", "Contact form", "Garden-care blog", "FAQ section", "Content admin panel"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "browser",
    tone: "firuze",
    link: "https://yesilyolpeyzaj.com/",
  },
  {
    slug: "oz-elit-kebap",
    title: "Öz Elit Kebap",
    tagline: {
      tr: "İki dilli dijital menü ve sipariş listesi",
      en: "Bilingual digital menu and order list",
    },
    summary: {
      tr: "Zeytinburnu'ndaki ocakbaşı kebapçının Türkçe ve İngilizce menüsünü, fiyatlarını ve iletişim bilgilerini sunan web sitesi.",
      en: "A website presenting the Turkish and English menu, prices and contact details of a charcoal-grill kebab house in Zeytinburnu.",
    },
    challenge: {
      tr: "Basılı menü her fiyat değişiminde yeniden basılıyor, Türkçe bilmeyen misafirler yemekleri garsona tek tek soruyordu.",
      en: "The printed menu had to be reprinted with every price change, and guests who didn't speak Turkish asked the waiter about each dish.",
    },
    solution: {
      tr: "Her yemeği Türkçe ve İngilizce açıklaması ve içindekileriyle listeledik; fiyatlar tek bir dosyadan güncelleniyor. Misafir seçtiklerini sipariş listesine ekleyip garsona gösteriyor.",
      en: "Every dish is listed with Turkish and English descriptions and ingredients, and prices update from a single file. Guests add their picks to an order list and show it to the waiter.",
    },
    features: {
      tr: ["Türkçe ve İngilizce menü", "Yemek açıklaması ve içindekiler", "Kolay fiyat güncelleme", "Masada sipariş listesi", "Harita ve tek dokunuşla arama", "Mobil öncelikli tasarım"],
      en: ["Turkish and English menu", "Dish descriptions and ingredients", "Easy price updates", "At-the-table order list", "Map and one-tap call", "Mobile-first design"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "phone",
    tone: "coral",
    link: "https://ozelitkebap.com/",
  },
  {
    slug: "qr-menu",
    title: "QR Menü",
    tagline: {
      tr: "Yeni nesil restoran deneyimi",
      en: "Next-generation restaurant experience",
    },
    summary: {
      tr: "Errnify'ın kendi ürünü: restoranların menüsünü QR kodla sunduğu, içeriği dakikalar içinde güncellediği dijital menü sistemi.",
      en: "Errnify's own product: a digital menu system that lets restaurants serve their menu by QR code and update it in minutes.",
    },
    challenge: {
      tr: "Basılı menüler her fiyat değişiminde yeniden basılıyor, tükenen ürünler masada öğreniliyordu.",
      en: "Printed menus had to be reprinted with every price change, and guests found out at the table that a dish had run out.",
    },
    solution: {
      tr: "Restoran menüsünü panelden yönetiyor; değişiklik anında masadaki QR koda yansıyor. Müşteri uygulama indirmeden telefonundan menüyü açıyor.",
      en: "Restaurants manage the menu from a panel, and changes reach the QR code on the table instantly. Guests open the menu on their phone with no app to install.",
    },
    features: {
      tr: ["QR kodla menü görüntüleme", "Anlık fiyat ve ürün güncelleme", "Kategori ve görsel yönetimi", "Çok dilli menü", "Restoran yönetim paneli"],
      en: ["Menu by QR code", "Instant price and item updates", "Category and image management", "Multilingual menus", "Restaurant admin panel"],
    },
    services: ["saas", "web"],
    platforms: { tr: ["Web uygulaması", "Yönetim paneli"], en: ["Web app", "Admin panel"] },
    mock: "phone",
    tone: "coral",
    link: "https://qrmenu.errnify.com/",
  },
  {
    slug: "schmeckle-token",
    title: "Schmeckle Token",
    latin: true,
    tagline: {
      tr: "Topluluk token'ı için Web3 sitesi",
      en: "Web3 website for a community token",
    },
    summary: {
      tr: "Rick and Morty evreninden ilham alan bir topluluk token'ının tanıtım ve topluluk sitesi. 2021'de, Web3 projelerimizin ilklerinden biri olarak yayına aldık.",
      en: "The website for a community token inspired by the Rick and Morty universe. We launched it in 2021 as one of our first Web3 projects.",
    },
    challenge: {
      tr: "Yeni bir token'ın güven kazanması için arz, dağılım ve yol haritasının açıkça görünmesi, topluluğun da tek bir adreste toplanması gerekiyordu.",
      en: "A new token needed its supply, distribution and roadmap out in the open to earn trust, and a single place for its community to gather.",
    },
    solution: {
      tr: "Token ekonomisini, yol haritasını ve nasıl satın alınacağını adım adım anlatan, temaya uygun eğlenceli bir site tasarladık; topluluk kanallarını aynı yerde topladık.",
      en: "We designed a playful, on-theme site that walks through the tokenomics, roadmap and how to buy, step by step, and brings the community channels together.",
    },
    features: {
      tr: ["Token ekonomisi ve dağılım", "Yol haritası", "Adım adım satın alma rehberi", "Cüzdan ve sözleşme bilgileri", "Topluluk kanalları"],
      en: ["Tokenomics and distribution", "Roadmap", "Step-by-step buying guide", "Wallet and contract details", "Community channels"],
    },
    services: ["web3", "web"],
    platforms: { tr: ["Web sitesi"], en: ["Website"] },
    mock: "browser",
    tone: "cobalt",
    status: "archived",
  },

  /* Gizlilik sözleşmeli işler: müşteri adı ve bağlantı verilmez, yalnızca türü ve kapsamı anlatılır */
  {
    slug: "web-siteleri",
    title: { tr: "Web Siteleri", en: "Websites" },
    tagline: {
      tr: "Tanıtım, kurumsal ve e-ticaret siteleri",
      en: "Marketing, corporate and e-commerce sites",
    },
    summary: {
      tr: "Burada adını verdiklerimizin dışında, farklı sektörlerden işletmeler için 50'den fazla tanıtım, kurumsal ve e-ticaret sitesi yayına aldık.",
      en: "Beyond the ones named here, we've launched more than 50 marketing, corporate and e-commerce sites for businesses across many sectors.",
    },
    challenge: {
      tr: "Her işletmenin derdi farklı: kimi aramada bulunmak, kimi teklif toplamak, kimi doğrudan online satış yapmak istiyor. Hazır bir şablon bu hedeflerin hiçbirine tam oturmuyordu.",
      en: "Every business needs something different: to be found in search, to collect quote requests, or to sell online. An off-the-shelf template never quite fit any of these goals.",
    },
    solution: {
      tr: "Her sitede önce ziyaretçinin ne yapmasını istediğimizi belirledik, tasarımı ve içeriği buna göre kurduk. Hepsi mobilde hızlı açılıyor, arama motorlarına uygun yapıda ve içeriği müşterinin kendisi panelden güncelliyor.",
      en: "On every site we first decided what we wanted visitors to do, then built the design and content around it. All of them load fast on mobile, are structured for search engines and let the client update content from a panel.",
    },
    features: {
      tr: ["Tanıtım ve kurumsal siteler", "E-ticaret ve online sipariş", "Mobil öncelikli, hızlı açılış", "SEO uyumlu yapı", "İçerik yönetim paneli", "WhatsApp, form ve teklif akışları"],
      en: ["Marketing and corporate sites", "E-commerce and online ordering", "Mobile-first, fast loading", "SEO-ready structure", "Content admin panel", "WhatsApp, form and quote flows"],
    },
    services: ["web"],
    platforms: { tr: ["Web sitesi", "E-ticaret sitesi"], en: ["Website", "Online store"] },
    mock: "browser",
    tone: "cobalt",
    status: "private",
    count: { tr: "50+ site", en: "50+ sites" },
  },
  {
    slug: "mobil-uygulamalar",
    title: { tr: "Mobil Uygulamalar", en: "Mobile Apps" },
    tagline: {
      tr: "iOS ve Android için uygulamalar",
      en: "Apps for iOS and Android",
    },
    summary: {
      tr: "Burada adını verdiklerimizin dışında, iOS ve Android için 20'den fazla mobil uygulama geliştirip mağazalarda yayına aldık.",
      en: "Beyond the ones named here, we've built and published more than 20 mobile apps on iOS and Android.",
    },
    challenge: {
      tr: "Mobil uygulama mağaza onayından bildirimlere, ödemeden çevrimdışı kullanıma kadar web'de olmayan pek çok ayrıntı ister; bir tanesi aksarsa kullanıcı uygulamayı siler.",
      en: "A mobile app brings details the web doesn't have, from store review to notifications, payments and offline use. If one of them slips, users delete the app.",
    },
    solution: {
      tr: "Uygulamaları tek kod tabanından iki platforma çıkardık; arkasındaki API'yi ve yönetim panelini de biz kurduk. Mağaza başvurusunu, sürüm güncellemelerini ve yayın sonrası bakımı da üstlendik.",
      en: "We shipped the apps to both platforms from a single codebase and built the API and admin panel behind them. We also handled store submission, version updates and post-launch maintenance.",
    },
    features: {
      tr: ["iOS ve Android tek kod tabanı", "Bildirim ve uygulama içi mesajlaşma", "Uygulama içi ödeme", "Arka uç API ve yönetim paneli", "Mağaza yayını ve sürüm yönetimi"],
      en: ["iOS and Android from one codebase", "Notifications and in-app messaging", "In-app payments", "Backend API and admin panel", "Store release and version management"],
    },
    services: ["mobile"],
    platforms: { tr: ["iOS", "Android"], en: ["iOS", "Android"] },
    mock: "phone",
    tone: "firuze",
    status: "private",
    count: { tr: "20+ uygulama", en: "20+ apps" },
  },
  {
    slug: "telegram-oyun-botlari",
    title: { tr: "Telegram Oyun Botları", en: "Telegram Game Bots" },
    tagline: {
      tr: "Sohbetten çıkmadan oynanan oyunlar",
      en: "Games played without leaving the chat",
    },
    summary: {
      tr: "Farklı müşteriler için, toplulukların Telegram içinde oynadığı 12 oyun botu ve mini uygulama geliştirdik.",
      en: "We built 12 game bots and mini apps for different clients, played by communities right inside Telegram.",
    },
    challenge: {
      tr: "Topluluklar Telegram'da; ayrı bir uygulama indirtmek katılımı düşürüyor. Oyunun, ödülün ve davetin sohbetten çıkmadan çalışması, aynı anda binlerce oyuncuyu kaldırması gerekiyordu.",
      en: "Communities live on Telegram, and asking them to download a separate app cuts participation. The game, rewards and invites had to work without leaving the chat and hold up under thousands of simultaneous players.",
    },
    solution: {
      tr: "Oyunları Telegram botu ve mini uygulaması olarak kurduk. Oyuncu sohbetten oyuna geçiyor, görevleri tamamlıyor, arkadaşını davet ediyor ve sıralamasını aynı yerde görüyor; ekip her şeyi bir yönetim panelinden izliyor.",
      en: "We built the games as Telegram bots and mini apps. Players jump from chat into the game, finish tasks, invite friends and see their rank in one place, while the team watches everything from an admin panel.",
    },
    features: {
      tr: ["Telegram mini uygulamaları", "Görev ve ödül sistemleri", "Davet ve liderlik tabloları", "Yoğun trafiğe dayanıklı altyapı", "Yönetim ve istatistik paneli"],
      en: ["Telegram mini apps", "Task and reward systems", "Referrals and leaderboards", "Infrastructure built for traffic spikes", "Admin and analytics panel"],
    },
    services: ["bot", "game"],
    platforms: { tr: ["Telegram botu", "Mini uygulama"], en: ["Telegram bot", "Mini app"] },
    mock: "game",
    tone: "coral",
    status: "private",
    count: { tr: "12 bot", en: "12 bots" },
  },
  {
    slug: "discord-botlari",
    title: { tr: "Discord Botları", en: "Discord Bots" },
    tagline: {
      tr: "Sunucuları yöneten ve canlandıran botlar",
      en: "Bots that run and liven up servers",
    },
    summary: {
      tr: "Oyun ve topluluk sunucuları için moderasyon, rol yönetimi ve etkinlik akışlarını üstlenen 4 Discord botu geliştirdik.",
      en: "We built 4 Discord bots that take over moderation, role management and events for gaming and community servers.",
    },
    challenge: {
      tr: "Büyüyen sunucularda moderatörler yeni üyeleri karşılamaya, rol dağıtmaya ve etkinlik duyurmaya yetişemiyordu.",
      en: "On growing servers, moderators couldn't keep up with welcoming members, handing out roles and announcing events.",
    },
    solution: {
      tr: "Tekrar eden işleri botlara devrettik: üye doğrulama, rol atama, duyuru ve etkinlik kayıtları komutlarla yürüyor; sunucu dışı sistemlerle bağlantı kuran özel komutlar ekledik.",
      en: "We handed repetitive work to bots: member verification, role assignment, announcements and event sign-ups run on commands, with custom commands that connect to systems outside the server.",
    },
    features: {
      tr: ["Moderasyon ve doğrulama", "Otomatik rol yönetimi", "Etkinlik ve turnuva kayıtları", "Sunucu içi mini oyunlar", "Harici sistem entegrasyonları"],
      en: ["Moderation and verification", "Automatic role management", "Event and tournament sign-ups", "In-server mini games", "External system integrations"],
    },
    services: ["bot"],
    platforms: { tr: ["Discord botu"], en: ["Discord bot"] },
    mock: "chat",
    tone: "cobalt",
    status: "private",
    count: { tr: "4 bot", en: "4 bots" },
  },
  {
    slug: "veri-toplama-botlari",
    title: { tr: "Veri Toplama Botları", en: "Data Collection Bots" },
    tagline: {
      tr: "Sosyal medya ve Google'dan düzenli veri",
      en: "Regular data from social media and Google",
    },
    summary: {
      tr: "Sosyal medya platformlarından ve Google sonuçlarından herkese açık veriyi düzenli toplayıp işlenmiş rapora dönüştüren 7'den fazla bot geliştirdik.",
      en: "We built more than 7 bots that regularly collect public data from social platforms and Google results and turn it into processed reports.",
    },
    challenge: {
      tr: "Rakip, fiyat ve içerik takibi için ekipler aynı sayfaları her gün elle açıp tablolara kopyalıyordu.",
      en: "To track competitors, prices and content, teams opened the same pages by hand every day and copied them into spreadsheets.",
    },
    solution: {
      tr: "Botlar belirlenen kaynakları planlı aralıklarla tarıyor, veriyi temizleyip tekilleştiriyor ve müşterinin kullandığı tabloya, veritabanına ya da panele aktarıyor. Önemli bir değişiklikte ekibe haber veriyor.",
      en: "The bots scan set sources on a schedule, clean and de-duplicate the data, and push it to the client's spreadsheet, database or dashboard. When something important changes, they alert the team.",
    },
    features: {
      tr: ["Planlı veri toplama", "Temizleme ve tekilleştirme", "Tablo, veritabanı ve API çıktısı", "Değişiklik bildirimleri", "Raporlama paneli"],
      en: ["Scheduled data collection", "Cleaning and de-duplication", "Spreadsheet, database and API output", "Change alerts", "Reporting dashboard"],
    },
    services: ["bot", "automation"],
    platforms: { tr: ["Bot", "Raporlama paneli"], en: ["Bot", "Reporting dashboard"] },
    mock: "dashboard",
    tone: "firuze",
    status: "private",
    count: { tr: "7+ bot", en: "7+ bots" },
  },
  {
    slug: "yapay-zeka-otomasyonlari",
    title: { tr: "Yapay Zekâ Otomasyonları", en: "AI Automations" },
    tagline: {
      tr: "Şirketlere kurduğumuz yapay zekâ destekli iş akışları",
      en: "AI-powered workflows we set up for companies",
    },
    summary: {
      tr: "8'den fazla şirkete, belgelerle çalışan asistanlardan otomatik raporlamaya uzanan yapay zekâ otomasyonları kurduk.",
      en: "We set up AI automations for more than 8 companies, from assistants that work with documents to automated reporting.",
    },
    challenge: {
      tr: "Ekipler gelen talepleri okumak, sınıflandırmak, belgelerden bilgi aramak ve rapor hazırlamak için her gün saatler harcıyordu.",
      en: "Teams spent hours every day reading incoming requests, sorting them, digging through documents and putting reports together.",
    },
    solution: {
      tr: "Her şirketin kendi belgeleri ve sistemleriyle çalışan akışlar kurduk: yapay zekâ talebi sınıflandırıyor, yanıt taslağı hazırlıyor ya da raporu derliyor; kritik adımlarda onay insanda kalıyor.",
      en: "We built flows that work with each company's own documents and systems: AI sorts the request, drafts the reply or compiles the report, and people keep the final say on critical steps.",
    },
    features: {
      tr: ["Belgeye dayalı asistanlar (RAG)", "E-posta ve talep sınıflandırma", "Otomatik rapor ve özet", "CRM ve ERP entegrasyonları", "İnsan onaylı adımlar"],
      en: ["Document-grounded assistants (RAG)", "Email and ticket classification", "Automatic reports and summaries", "CRM and ERP integrations", "Human-approved steps"],
    },
    services: ["ai", "automation"],
    platforms: { tr: ["Otomasyon akışı", "Yönetim paneli"], en: ["Automation flow", "Admin panel"] },
    mock: "chat",
    tone: "coral",
    status: "private",
    count: { tr: "8+ şirket", en: "8+ companies" },
  },
];

export const projectTitle = (p: Project, locale: Locale) => (typeof p.title === "string" ? p.title : p.title[locale]);

/** Başlığın dili: çevrilen başlık sayfanın dilinde, marka adı ise latin bayrağına göre */
export const projectLang = (p: Project, locale: Locale) => (typeof p.title !== "string" ? locale : p.latin ? "en" : "tr");

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const projectsByService = (id: ServiceId) => projects.filter((p) => p.services.includes(id));
