import type { L } from "@/lib/i18n";
import type { ServiceId } from "./services";

export type Faq = { q: L; a: L };

/** "general" dışındaki kategoriler bir hizmete karşılık gelir; başlıkları hizmet adından alınır. */
export type FaqCategory = { id: "general" | ServiceId; items: Faq[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    items: [
      {
        q: { tr: "Hangi hizmetleri sağlıyorsunuz?", en: "What services do you provide?" },
        a: {
          tr: "Web ve mobil uygulama geliştirme, oyun geliştirme, bot ve script yazımı, yapay zekâ ve otomasyon çözümleri, SaaS ürünleri ile Web3 ve blockchain teknolojileri. Özel yazılım geliştirmeden yapay zekâ destekli hizmetlere kadar bir işletmenin ihtiyaç duyduğu çözümleri tek çatı altında sunuyoruz.",
          en: "Web and mobile app development, game development, bots and scripts, AI and automation solutions, SaaS products, and Web3 and blockchain technology. From custom software to AI-powered services, we offer what a business needs under one roof.",
        },
      },
      {
        q: { tr: "Bir proje genellikle ne kadar sürer?", en: "How long does a project usually take?" },
        a: {
          tr: "Kapsama göre değişir. Bir tanıtım sitesi genellikle 2–4 hafta, bot ve otomasyon işleri 1–4 hafta, mobil uygulama ya da SaaS MVP'si 8–16 hafta sürer. İlk görüşmeden sonra size haftalara bölünmüş bir takvim gönderiyoruz.",
          en: "It depends on scope. A marketing site usually takes 2–4 weeks, bots and automation 1–4 weeks, and a mobile app or SaaS MVP 8–16 weeks. After the first call we send you a week-by-week schedule.",
        },
      },
      {
        q: { tr: "Fiyatlandırma modeliniz nasıl?", en: "What is your pricing model?" },
        a: {
          tr: "Kapsamı net projelerde sabit fiyatla çalışıyoruz; teklifte her aşamanın bedeli ayrı ayrı yazar. Sürekli geliştirme gerektiren ürünlerde aylık ekip modeli uyguluyoruz. Teklif ücretsizdir.",
          en: "For clearly scoped projects we work at a fixed price, with each phase costed separately in the proposal. For products that need ongoing development we use a monthly team model. Quotes are free.",
        },
      },
      {
        q: { tr: "Yayın sonrası destek sağlıyor musunuz?", en: "Do you provide support after launch?" },
        a: {
          tr: "Evet. Her proje yayın sonrası hata düzeltme süresiyle teslim edilir. Ardından güncelleme, sunucu izleme ve yeni özellikler için aylık bakım anlaşması yapabilirsiniz.",
          en: "Yes. Every project is delivered with a post-launch bug-fix period. After that you can take a monthly maintenance agreement for updates, server monitoring and new features.",
        },
      },
      {
        q: { tr: "Mevcut projelere yardımcı olabilir misiniz?", en: "Can you help with an existing project?" },
        a: {
          tr: "Evet. Önce mevcut kodu ve altyapıyı inceleyip kısa bir durum raporu hazırlıyoruz. Ardından devralma, yeni özellik ekleme ya da gerekiyorsa parça parça yeniden yazma seçeneklerini birlikte değerlendiriyoruz.",
          en: "Yes. We first review the existing code and infrastructure and write a short status report. Then we weigh the options together: taking it over, adding features, or rewriting piece by piece if needed.",
        },
      },
      {
        q: { tr: "Hangi teknolojilerle çalışıyorsunuz?", en: "Which technologies do you work with?" },
        a: {
          tr: "Web tarafında Next.js, React ve Node.js; mobilde Flutter, React Native, Swift ve Kotlin; oyunda Unity ve Godot; yapay zekâ ve otomasyonda Python, Claude ve OpenAI API'leri ile n8n kullanıyoruz. Teknolojiyi projeye göre seçiyoruz, projeyi teknolojiye göre değil.",
          en: "On the web: Next.js, React and Node.js. On mobile: Flutter, React Native, Swift and Kotlin. For games: Unity and Godot. For AI and automation: Python, the Claude and OpenAI APIs, and n8n. We pick the technology to fit the project, not the other way round.",
        },
      },
    ],
  },
  {
    id: "web",
    items: [
      {
        q: { tr: "Siteyi kendim güncelleyebilir miyim?", en: "Can I update the site myself?" },
        a: {
          tr: "Evet. Her siteyi bir yönetim paneliyle teslim ediyoruz; metinleri, görselleri, blog yazılarını ve ürünleri kod bilmeden değiştirebilirsiniz. Teslimde kısa bir kullanım eğitimi de veriyoruz.",
          en: "Yes. Every site ships with an admin panel, so you can change text, images, blog posts and products without touching code. We also give a short walkthrough at handover.",
        },
      },
      {
        q: { tr: "Sitem Google'da üst sıralarda çıkar mı?", en: "Will my site rank high on Google?" },
        a: {
          tr: "Siteyi teknik SEO kurallarına uygun kuruyoruz: hızlı açılış, doğru başlık yapısı, site haritası ve mobil uyum. Sıralama ise içeriğe ve rekabete bağlıdır; sıra garantisi vermiyoruz ama doğru temeli kuruyoruz.",
          en: "We build to technical SEO standards: fast loads, correct heading structure, a sitemap and mobile support. Ranking itself depends on content and competition; we don't guarantee positions, but we lay the right foundation.",
        },
      },
      {
        q: { tr: "Alan adı ve barındırma işlerini siz mi hallediyorsunuz?", en: "Do you handle the domain and hosting?" },
        a: {
          tr: "İsterseniz evet. Alan adının kaydına yardımcı oluyor, barındırmayı kuruyor ve SSL sertifikasını etkinleştiriyoruz. Hesaplar sizin adınıza açılır ve sizde kalır.",
          en: "If you'd like us to, yes. We help register the domain, set up hosting and enable the SSL certificate. The accounts are opened in your name and stay with you.",
        },
      },
      {
        q: { tr: "Sitemden online ödeme alabilir miyim?", en: "Can I take online payments on my site?" },
        a: {
          tr: "Evet. iyzico ya da Stripe gibi bir ödeme altyapısını siteye bağlıyoruz; ürün sayfaları, sepet ve sipariş takibi de kapsama girer. Kart bilgileri sitenizde değil, ödeme sağlayıcısında tutulur.",
          en: "Yes. We connect a payment provider such as iyzico or Stripe; product pages, the cart and order tracking are part of the scope. Card details are held by the payment provider, not on your site.",
        },
      },
    ],
  },
  {
    id: "mobile",
    items: [
      {
        q: { tr: "iOS ve Android için ayrı ayrı mı geliştiriyorsunuz?", en: "Do you build iOS and Android separately?" },
        a: {
          tr: "Çoğu projede tek kod tabanından iki platforma birden çıkıyoruz; bu, süreyi ve bütçeyi düşürür. Kamera, konum ya da ödeme gibi cihaz özelliklerini yoğun kullanan uygulamalarda yerel geliştirmeyi öneriyoruz.",
          en: "On most projects we ship both platforms from a single codebase, which cuts time and budget. For apps that lean heavily on device features such as the camera, location or payments, we recommend native development.",
        },
      },
      {
        q: { tr: "Uygulamayı mağazalara siz mi yüklüyorsunuz?", en: "Do you publish the app to the stores?" },
        a: {
          tr: "Evet. App Store ve Google Play başvurularını, mağaza görsellerini ve inceleme sürecini biz yürütüyoruz. Geliştirici hesapları sizin adınıza açılır.",
          en: "Yes. We handle the App Store and Google Play submissions, the store assets and the review process. Developer accounts are opened in your name.",
        },
      },
      {
        q: { tr: "Yayından sonra güncelleme gerekir mi?", en: "Will the app need updates after launch?" },
        a: {
          tr: "Evet. İşletim sistemleri her yıl yenilenir ve mağazalar uyum ister. Bakım anlaşmasıyla bu güncellemeleri ve hata düzeltmelerini biz üstleniyoruz.",
          en: "Yes. Operating systems change every year and the stores require apps to keep up. With a maintenance agreement we take care of those updates and bug fixes.",
        },
      },
      {
        q: { tr: "Uygulama internet olmadan çalışır mı?", en: "Will the app work offline?" },
        a: {
          tr: "İhtiyaca göre evet. Sık kullanılan veriyi cihazda saklayıp bağlantı geldiğinde eşitleyecek şekilde kurabiliyoruz. Bunu kapsam aşamasında birlikte kararlaştırıyoruz, çünkü süreyi etkiler.",
          en: "If you need it to, yes. We can store frequently used data on the device and sync when the connection returns. We decide this together during scoping, because it affects the timeline.",
        },
      },
    ],
  },
  {
    id: "game",
    items: [
      {
        q: { tr: "Hangi tür oyunlar geliştiriyorsunuz?", en: "What kinds of games do you build?" },
        a: {
          tr: "Hyper-casual ve bulmaca türünde mobil oyunlar, tarayıcıda çalışan mini oyunlar, Telegram içi oyunlar ve markalar için kampanya oyunları geliştiriyoruz.",
          en: "Hyper-casual and puzzle games for mobile, browser mini-games, in-Telegram games and branded campaign games.",
        },
      },
      {
        q: { tr: "Fikrim var ama tasarım belgem yok. Başlayabilir miyiz?", en: "I have an idea but no design document. Can we start?" },
        a: {
          tr: "Evet. Önce fikri oynanabilir bir prototipe çeviriyoruz. Mekanik eğlenceliyse seviyeleri, görselleri ve gelir modelini onun üzerine birlikte kuruyoruz.",
          en: "Yes. We turn the idea into a playable prototype first. If the mechanic is fun, we build the levels, art and monetisation on top of it together.",
        },
      },
      {
        q: { tr: "Oyundan nasıl gelir elde edilir?", en: "How does a game make money?" },
        a: {
          tr: "Reklam, uygulama içi satın alma ya da ikisinin karışımıyla. Hangi modelin uyduğunu oyunun türüne ve oturum süresine bakarak birlikte belirliyoruz.",
          en: "Through ads, in-app purchases or a mix of both. We decide together which model fits, based on the genre and session length.",
        },
      },
      {
        q: { tr: "Oyun hangi platformlarda yayınlanır?", en: "Which platforms can the game be released on?" },
        a: {
          tr: "iOS ve Android mağazalarında, tarayıcıda ya da Telegram içinde. Aynı oyunu birden fazla platforma çıkarmak mümkündür; hangisinden başlanacağını hedef kitleye göre seçiyoruz.",
          en: "On the iOS and Android stores, in the browser or inside Telegram. The same game can ship to more than one platform; we choose where to start based on your audience.",
        },
      },
    ],
  },
  {
    id: "bot",
    items: [
      {
        q: { tr: "Botlar hangi platformlarda çalışır?", en: "Which platforms do your bots run on?" },
        a: {
          tr: "Telegram, WhatsApp ve Discord. Aynı iş mantığını birden fazla platformda birlikte çalıştırabiliyoruz.",
          en: "Telegram, WhatsApp and Discord. The same logic can run on more than one platform at once.",
        },
      },
      {
        q: { tr: "Bot sürekli çalışır mı, çökerse ne olur?", en: "Does the bot run around the clock, and what if it crashes?" },
        a: {
          tr: "Botlar sunucuda kesintisiz çalışır. Bir hata olursa kendini yeniden başlatır ve size bildirim gönderir; kayıtlardan neyin ters gittiğini görebilirsiniz.",
          en: "Bots run continuously on a server. If something fails, the bot restarts itself and notifies you, and the logs show what went wrong.",
        },
      },
      {
        q: { tr: "Veri toplama scriptleri için bir sınır var mı?", en: "Are there limits on data-collection scripts?" },
        a: {
          tr: "Evet. Hangi verinin toplanabileceği kaynağın kullanım koşullarına ve kişisel veri mevzuatına bağlıdır. Her projede kaynağı önce bu açıdan inceliyoruz; koşulları ihlal eden işleri almıyoruz.",
          en: "Yes. What can be collected depends on the source's terms of use and on personal-data law. We review the source on those grounds first and don't take on work that breaks its terms.",
        },
      },
      {
        q: { tr: "Bot mevcut sistemlerimize bağlanabilir mi?", en: "Can the bot connect to our existing systems?" },
        a: {
          tr: "Evet. Sipariş, stok ya da randevu sisteminizin API'si varsa bot oradan okur ve oraya yazar. API yoksa uygun bir ara çözüm öneriyoruz.",
          en: "Yes. If your order, stock or booking system has an API, the bot reads from it and writes to it. If there's no API, we suggest a suitable workaround.",
        },
      },
    ],
  },
  {
    id: "ai",
    items: [
      {
        q: { tr: "Yapay zekâ kendi verilerimizle çalışabilir mi?", en: "Can the AI work with our own data?" },
        a: {
          tr: "Evet. Asistanı şirket belgelerinize, ürün kataloğunuza ya da destek kayıtlarınıza bağlıyoruz. Yanıtlarını bu kaynaklardan üretir ve hangi belgeye dayandığını gösterir.",
          en: "Yes. We connect the assistant to your company documents, product catalogue or support records. It answers from those sources and shows which document it relied on.",
        },
      },
      {
        q: { tr: "Verilerimiz nereye gidiyor?", en: "Where does our data go?" },
        a: {
          tr: "Hangi verinin hangi sisteme gittiğini proje başında yazılı olarak belirliyoruz. Veriler yalnızca sizin sistemlerinizde ve seçtiğiniz model sağlayıcısında işlenir; hassas alanları göndermeden önce maskeliyoruz.",
          en: "At the start of the project we put in writing which data goes to which system. Data is processed only in your systems and with the model provider you choose, and we mask sensitive fields before sending them.",
        },
      },
      {
        q: { tr: "Yapay zekâ yanlış yanıt verirse ne olur?", en: "What if the AI gives a wrong answer?" },
        a: {
          tr: "Her projeye gerçek örneklerden oluşan bir test seti ve insan onayı adımı ekliyoruz. Model emin olmadığında yanıt vermek yerine konuşmayı bir temsilciye devreder.",
          en: "Every project includes a test set of real examples and a human-approval step. When the model is unsure, it hands the conversation to a person instead of answering.",
        },
      },
      {
        q: { tr: "Yapay zekâ kullanmanın aylık maliyeti ne olur?", en: "What does running AI cost per month?" },
        a: {
          tr: "Kullanım hacmine bağlıdır: her yanıt için model sağlayıcısına küçük bir ücret ödenir. Proje başında beklenen hacme göre aylık tahmin çıkarıyor, basit soruları daha ucuz bir modele yönlendirerek maliyeti düşürüyoruz.",
          en: "It depends on usage: each answer carries a small fee to the model provider. At the start we estimate the monthly cost from expected volume, and we cut it by routing simple questions to a cheaper model.",
        },
      },
    ],
  },
  {
    id: "automation",
    items: [
      {
        q: { tr: "Hangi araçları birbirine bağlayabilirsiniz?", en: "Which tools can you connect?" },
        a: {
          tr: "E-ticaret altyapıları, muhasebe programları, CRM, kargo firmaları, e-posta ve mesajlaşma araçları. API'si olan hemen her araç bağlanabilir.",
          en: "E-commerce platforms, accounting software, CRMs, couriers, email and messaging tools. Almost anything with an API can be connected.",
        },
      },
      {
        q: { tr: "Bir otomasyon bozulursa nasıl anlarım?", en: "How will I know if an automation breaks?" },
        a: {
          tr: "Her akışın kaydı tutulur. Bir adım takıldığında size bildirim gider ve panelde hangi adımda durduğunu görürsünüz.",
          en: "Every flow is logged. When a step stalls you get a notification, and the panel shows exactly where it stopped.",
        },
      },
      {
        q: { tr: "Küçük bir işletme için otomasyon değer mi?", en: "Is automation worth it for a small business?" },
        a: {
          tr: "Tekrarlayan iş haftada birkaç saati buluyorsa genellikle evet. İlk görüşmede kazanılacak süreyi birlikte hesaplıyoruz; değmiyorsa bunu da söylüyoruz.",
          en: "If repetitive work adds up to a few hours a week, usually yes. In the first call we work out the time you'd save together, and if it isn't worth it we say so.",
        },
      },
      {
        q: { tr: "Akışları sonradan kendim değiştirebilir miyim?", en: "Can I change the flows myself later?" },
        a: {
          tr: "Evet. Akışları görsel bir araçta kuruyoruz; bir alanı ya da bildirim metnini değiştirmek gibi basit düzenlemeleri kendiniz yapabilirsiniz. Teslimde akışların nasıl çalıştığını anlatan kısa bir belge veriyoruz.",
          en: "Yes. We build flows in a visual tool, so simple edits such as changing a field or a notification text are yours to make. At handover we give you a short document explaining how each flow works.",
        },
      },
    ],
  },
  {
    id: "saas",
    items: [
      {
        q: { tr: "MVP nedir, neden onunla başlamalıyım?", en: "What is an MVP, and why start with one?" },
        a: {
          tr: "MVP, fikrinizin en riskli varsayımını sınayan en küçük çalışan üründür. Aylarca geliştirme yapmadan önce gerçek kullanıcıdan geri bildirim almanızı sağlar.",
          en: "An MVP is the smallest working product that tests your idea's riskiest assumption. It gets you feedback from real users before you spend months building.",
        },
      },
      {
        q: { tr: "Abonelik ve ödeme sistemini kuruyor musunuz?", en: "Do you set up subscriptions and billing?" },
        a: {
          tr: "Evet. Abonelik planları, deneme süresi, faturalama ve ödeme altyapısı entegrasyonu (Stripe, iyzico) kapsamımızdadır.",
          en: "Yes. Subscription plans, trial periods, invoicing and payment-provider integration (Stripe, iyzico) are all in scope.",
        },
      },
      {
        q: { tr: "Kullanıcı sayısı artarsa altyapı kaldırır mı?", en: "Will the infrastructure cope as users grow?" },
        a: {
          tr: "Altyapıyı baştan çok kiracılı ve ölçeklenebilir kuruyoruz. Kullanıcı sayısı arttıkça sunucu kaynaklarını kademeli olarak artırıyoruz; yedekleme ve izleme de kurulumun parçasıdır.",
          en: "We build multi-tenant and scalable from the start. As users grow we raise server capacity step by step; backups and monitoring are part of the setup.",
        },
      },
      {
        q: { tr: "Ürünü farklı dillerde ve para birimlerinde sunabilir miyim?", en: "Can I offer the product in several languages and currencies?" },
        a: {
          tr: "Evet. Çok dilli arayüz ve farklı para birimleriyle faturalama baştan planlanırsa kolayca eklenir. Sonradan eklemek daha maliyetli olduğu için bunu kapsam aşamasında soruyoruz.",
          en: "Yes. A multilingual interface and multi-currency billing are easy to add when planned from the start. Adding them later costs more, so we ask about it during scoping.",
        },
      },
    ],
  },
  {
    id: "web3",
    items: [
      {
        q: { tr: "Hangi ağlarda geliştirme yapıyorsunuz?", en: "Which networks do you build on?" },
        a: {
          tr: "Ethereum ve onunla uyumlu ağlarda (EVM) ve TON üzerinde çalışıyoruz. Ağ seçimini işlem ücretine ve hedef kitlenize göre birlikte yapıyoruz.",
          en: "Ethereum and compatible (EVM) networks, and TON. We choose the network together based on transaction fees and your audience.",
        },
      },
      {
        q: { tr: "Akıllı sözleşmeler denetleniyor mu?", en: "Are smart contracts audited?" },
        a: {
          tr: "Her sözleşmeyi kapsamlı testlerden ve test ağı denemelerinden geçiriyoruz. Yüksek değer taşıyan sözleşmeler için ayrıca bağımsız bir denetim firmasıyla çalışmanızı öneriyoruz.",
          en: "Every contract goes through thorough tests and testnet trials. For contracts holding significant value, we also recommend working with an independent audit firm.",
        },
      },
      {
        q: { tr: "Kullanıcılarım kripto bilmiyor; zorlanırlar mı?", en: "My users don't know crypto. Will they struggle?" },
        a: {
          tr: "Cüzdan bağlantısını ve işlem adımlarını sade bir arayüzün arkasına alıyoruz. Kullanıcı çoğu zaman yalnızca tek bir onay ekranı görür.",
          en: "We put the wallet connection and transaction steps behind a simple interface. Most of the time the user sees just a single confirmation screen.",
        },
      },
      {
        q: { tr: "Akıllı sözleşme yayınlandıktan sonra değiştirilebilir mi?", en: "Can a smart contract be changed after deployment?" },
        a: {
          tr: "Varsayılan olarak hayır; zincire yazılan kod değişmez. Gerekiyorsa sözleşmeyi baştan güncellenebilir bir yapıyla tasarlıyoruz ve bunun güvenlik açısından artılarını ve eksilerini önceden konuşuyoruz.",
          en: "Not by default; code written to the chain doesn't change. Where needed, we design the contract with an upgradeable structure from the start and discuss its security trade-offs beforehand.",
        },
      },
    ],
  },
];

/** Genel sorular: ana sayfadaki kısa listede kullanılır */
export const faqs: Faq[] = faqCategories[0].items;
