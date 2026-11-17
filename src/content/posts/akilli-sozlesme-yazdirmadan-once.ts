import type { Post } from "./types";

export const post: Post = {
  slug: "akilli-sozlesme-yazdirmadan-once",
  date: "2026-11-11",
  topic: "web3",
  related: ["web3", "bot", "game"],
  title: {
    tr: "Akıllı sözleşme yazdırmadan önce bilmeniz gereken 7 şey",
    en: "Seven things to know before commissioning a smart contract",
  },
  excerpt: {
    tr: "Zincire yazılan kod sonradan kolayca düzeltilemez. Blok zincir geçmişi olmayan bir kurucunun ilk görüşmeden önce bilmesi gereken yedi şeyi sade bir dille anlattık.",
    en: "Code written to a chain can't easily be fixed afterwards. Seven things a founder with no blockchain background should know before the first meeting, in plain words.",
  },
  body: {
    tr: [
      { type: "p", text: "Akıllı sözleşme yazdırmak isteyen kurucuların çoğu bize hazır bir fikirle gelir: bir token, bir ödül sistemi, bir üyelik ya da oyun içi bir varlık. Teknik ayrıntıyı bilmeniz gerekmez; ama birkaç temel gerçeği baştan bilmek bütçenizi ve takviminizi doğrudan etkiler. Blok zincir geçmişi olmayan bir iş sahibinin ilk görüşmeden önce bilmesini istediğimiz yedi şeyi burada topladık." },

      { type: "h2", text: "1. Akıllı sözleşme, yazıldığı gibi çalışır" },
      { type: "p", text: "Blok zincir, kayıtların tek bir şirketin sunucusunda değil, birbirinden bağımsız çok sayıda bilgisayarda aynı anda tutulduğu ortak bir defterdir. Akıllı sözleşme bu defterin üzerinde yaşayan küçük bir programdır. Adındaki “sözleşme” sözcüğü yanıltmasın: hukuki bir belge değil, kodla yazılmış bir kurallar bütünüdür. “Şu adres şu kadar ödeme yaparsa ona şu varlığı aktar” gibi kuralları kimsenin onayını beklemeden uygular." },
      { type: "p", text: "Kilit nokta şudur: program niyetinizi değil, yazılanı uygular. Kodda bir boşluk varsa onu ilk fark eden kullanır ve ağ bunu geçerli bir işlem sayar. İşlemi geri çevirecek bir banka ya da müşteri hizmetleri yoktur." },

      { type: "h2", text: "2. Yayınlanan kod sonradan düzeltilemez" },
      { type: "p", text: "Alışık olduğunuz yazılımlarda hata çıkarsa düzeltir, yeni sürümü yayınlarız. Zincire yazılan kod ise varsayılan olarak değişmez. Hatalı bir sözleşmeyi düzeltmek çoğu zaman yenisini yayınlamak ve kullanıcıları, bakiyeleri, bağlı uygulamaları oraya taşımak demektir; bu hem pahalıdır hem de güveni zedeler." },
      { type: "p", text: "Bunun bir çaresi var: güncellenebilir tasarım. Kullanıcılar sabit bir adresle konuşur, o adres işi arkadaki asıl koda yönlendirir; gerektiğinde arkadaki kod değiştirilir. Ancak kodu değiştirebilen bir anahtar varsa kullanıcılarınız kurallara değil, o anahtarı tutana güvenmek zorunda kalır; anahtar çalınırsa kuralları saldırgan da değiştirebilir." },
      { type: "note", title: "Baştan verilecek karar", text: "Güncellenebilirlik sonradan eklenemez; yayından önce karara bağlanmalıdır. Biz şunu soruyoruz: Bu sözleşme ne kadar değer tutacak ve kuralların ileride değişmesi gerçekten gerekecek mi? Yanıt “hayır” ise küçük ve değişmez bir sözleşme çoğu zaman daha güvenlidir." },

      { type: "h2", text: "3. Test ve denetim, yazmaktan uzun sürer" },
      { type: "p", text: "Bir akıllı sözleşmenin kodu çoğu zaman şaşırtıcı derecede kısadır. Zamanı alan şey yazmak değil, o satırların her koşulda doğru davrandığından emin olmaktır. Bu yüzden Web3 projelerinde yazmaktan çok test etmeye zaman ayırıyoruz. Sıra genellikle şöyledir:" },
      { type: "ol", items: [
        "Otomatik testler: Her kural için hem olması gerekeni hem olmaması gerekeni deneyen testler yazılır; örneğin yetkisiz birinin para çekme girişiminin reddedildiği doğrulanır.",
        "Test ağı denemesi: Sözleşme, gerçek ağa benzeyen ama gerçek para taşımayan bir test ağına yüklenir; cüzdan bağlantısı ve işlem akışları uçtan uca denenir.",
        "Bağımsız denetim: Gerekiyorsa kod, onu yazmamış bir güvenlik ekibine incelemeye verilir ve bulunan sorunlar giderilir.",
        "Kademeli yayın: Sözleşme ana ağa alınır; ilk dönemde düşük limitlerle ve yakından izlenerek çalıştırılır.",
      ] },
      { type: "p", text: "Bağımsız denetimde, sözleşmeyi yazan ekibin dışındaki uzmanlar kodu satır satır inceler ve bulgularını önem sırasına göre raporlar. Ucuz değildir, haftalar sürebilir ve hatasızlık garantisi vermez; ama yazanın göremediğini başka bir göz yakalayabilir. Sözleşme kullanıcıların parasını tutacaksa, yüksek değer taşıyacaksa ya da güncellenemeyecekse bu harcamayı öneriyoruz. Değer taşımayan küçük bir deneme için kapsamlı testler çoğu zaman yeterlidir." },

      { type: "h2", text: "4. Ağ seçimi ücreti ve kitleyi belirler" },
      { type: "p", text: "“Hangi blok zincir?” sorusu teknik bir tercih gibi görünür ama aslında bir iş kararıdır. Biz Ethereum ve onunla uyumlu ağlarda ve TON üzerinde geliştirme yapıyoruz; seçimi müşteriyle birlikte, şu üç soruya göre yapıyoruz:" },
      { type: "ul", items: [
        "Kullanıcılarınız nerede? Telegram içinde çalışan bir ürün için TON doğal bir seçenektir; mevcut bir Ethereum topluluğuna sesleniyorsanız uyumlu bir ağ daha mantıklıdır.",
        "İşlem başına ücret ne kadar? Küçük tutarlı ve sık yapılan işlemlerde yüksek ücretli bir ağ, ürünü kullanılmaz hâle getirir.",
        "İşlem ne kadar sürede kesinleşir? Bir oyunda saniyeler önemlidir; yılda birkaç kez yapılan bir devirde değildir.",
      ] },
      { type: "p", text: "Zincirde kayıt değiştiren her işlem, ağın kendi para birimiyle ödenen ve ağın yoğunluğuna göre değişen bir ücrete tabidir. Varsayılan durumda ücreti işlemi başlatan, yani kullanıcınız öder; bunun için cüzdanında önceden bakiye bulunması gerekir. Kripto bilmeyen bir kitle için bu ciddi bir engeldir. Ücreti sizin üstlendiğiniz yapılar kurulabilir, ama o zaman bu kalem işletme giderinize eklenir. Bütçeyi yaparken geliştirme bedelinin yanına bu ücretleri de yazın." },

      { type: "h2", text: "5. Anahtar kimdeyse söz hakkı ondadır" },
      { type: "p", text: "Bir sözleşmede çoğu zaman özel yetkiler bulunur: sistemi durdurmak, bir ücret oranını değiştirmek ya da sözleşmeyi güncellemek gibi. Bu yetkiler bir kullanıcı adı ve parolaya değil, bir özel anahtara, yani cüzdanın sahibi olduğunuzu kanıtlayan uzun bir gizli diziye bağlıdır. Onu ele geçiren, sizin yapabildiğiniz her şeyi yapabilir; kaybederseniz basabileceğiniz bir “parolamı unuttum” düğmesi yoktur." },
      { type: "p", text: "Bu yüzden yönetici yetkilerini tek bir anahtara bağlamıyor, çok imzalı cüzdan kullanıyoruz: örneğin üç yetkiliden en az ikisi onaylamadan hiçbir işlem gerçekleşmez. Böylece tek bir anahtarın çalınması sistemi tehlikeye atmaz. Anahtarların kimde duracağı ve biri ekipten ayrıldığında ne olacağı yayından önce yazılı hâle gelmelidir. Teslimden sonra bu yetkiler bizde değil, sizde olmalıdır." },
      { type: "quote", text: "Sözleşmenizi kimin durdurabildiğini ya da değiştirebildiğini bilmiyorsanız, o sözleşme henüz sizin değildir." },

      { type: "h2", text: "6. Her şey zincire yazılmaz" },
      { type: "p", text: "Zincire veri yazmak pahalıdır, yazılan veri herkese açıktır ve silinemez. Bu yüzden zincire yalnızca herkesin doğrulayabilmesi gereken şeyleri koyuyoruz: kimin neye sahip olduğu, bir ödemenin yapılıp yapılmadığı. Aşağıdakiler ise neredeyse her zaman zincir dışında, sıradan bir veritabanında kalır:" },
      { type: "ul", items: [
        "Kişisel veriler: Ad, e-posta, adres gibi bilgiler zincire yazılırsa silinemez; bu, kişisel verilerin korunmasına ilişkin kurallarla çelişebilir.",
        "Büyük dosyalar: Görseller ve belgeler zincir dışında saklanır; zincire yalnızca dosyanın değişmediğini kanıtlayan kısa bir özet yazılır.",
        "Sık değişen içerik: Ürün açıklamaları ve kampanya metinleri gibi her gün güncellenen veriler.",
        "Gizli kalması gereken iş bilgileri: Zincirdeki her kaydı herkes okuyabilir.",
      ] },
      { type: "p", text: "İyi bir Web3 ürününün büyük kısmı aslında sıradan bir web ya da mobil uygulamadır; sözleşme onun küçük ama kritik çekirdeğidir. Bazen dürüst yanıt, fikrin blok zincire hiç ihtiyaç duymadığıdır; böyle durumlarda bunu açıkça söylüyoruz." },

      { type: "h2", text: "7. Hukuki taraf ayrı bir iştir" },
      { type: "p", text: "Kodun çalışması, yaptığınız işin hukuka uygun olduğu anlamına gelmez. Token satışı, kullanıcılardan para toplanması, ödül dağıtımı ya da şansa dayalı mekanikler birçok ülkede finans, tüketici, vergi ve kişisel veri kurallarının kapsamına girebilir. Bu kurallar ülkeden ülkeye değişir ve zaman içinde güncellenir; bir ülkede serbest olan bir model, bir başkasında izne bağlı ya da yasak olabilir." },
      { type: "note", title: "Bu yazı hukuki tavsiye değildir", text: "Biz yazılım geliştiriyoruz, hukuk danışmanlığı vermiyoruz; bu yazı da hukuki tavsiye değildir. Projeniz para toplamayı, token satışını ya da ödül dağıtmayı içeriyorsa, geliştirme başlamadan önce bu alanı bilen bir hukukçuya danışmanızı öneriyoruz." },

      { type: "h2", text: "Geliştirme ekibine sorulacak sorular" },
      { type: "p", text: "Teklif alırken fiyat ve teslim tarihinin yanında şu soruları da sorun:" },
      { type: "ul", items: [
        "Sözleşmeyi nasıl ve hangi test ağında deneyeceksiniz; sonuçları bizimle paylaşacak mısınız?",
        "Sözleşme güncellenebilir mi olacak; öyleyse güncelleme yetkisi kimde duracak?",
        "Yönetici anahtarları kimde olacak ve çok imzalı cüzdan kullanılacak mı?",
        "Bağımsız denetim öneriyor musunuz; önermiyorsanız neden?",
        "Yayından sonra sözleşmeyi kim izleyecek; bir sorun çıkarsa ilk adım ne olacak?",
      ] },
      { type: "p", text: "Akıllı sözleşme, doğru yerde kullanıldığında aracıya gerek bırakmayan sağlam bir araçtır; ama hatayı affetmez. Kapsamı küçük tutmak, teste zaman ayırmak ve yetkileri baştan netleştirmek, sonradan yapılacak her düzeltmeden ucuzdur." },
    ],
    en: [
      { type: "p", text: "Most founders who want a smart contract come to us with an idea already formed: a token, a reward scheme, a membership or an in-game asset. You don't need the technical detail, but knowing a few basic facts early directly affects your budget and timeline. Here are the seven things we'd like a business owner with no blockchain background to know before the first meeting." },

      { type: "h2", text: "1. A smart contract runs exactly as written" },
      { type: "p", text: "A blockchain is a shared ledger kept not on one company's server but on many independent computers at once. A smart contract is a small program that lives on that ledger. Don't let the word “contract” mislead you: it isn't a legal document but a set of rules written in code. It applies rules such as “if this address pays this much, transfer this asset to it” without waiting for anyone's approval." },
      { type: "p", text: "The key point: the program does what was written, not what you meant. If the code has a gap, the first person to spot it will use it, and the network treats that as a valid transaction. There's no bank or helpline to reverse it." },

      { type: "h2", text: "2. Deployed code can't be patched later" },
      { type: "p", text: "With ordinary software, when a bug appears we fix it and ship a new version. Code written to a chain doesn't change by default. Fixing a faulty contract usually means deploying a new one and moving users, balances and connected apps across, which is costly and damages trust." },
      { type: "p", text: "There is a remedy: an upgradeable design. Users talk to a fixed address, which passes the work to the real code behind it; when needed, that code is swapped. But if a key can change the code, your users must trust whoever holds it rather than the rules; if it's stolen, an attacker can change the rules too." },
      { type: "note", title: "A decision for the start", text: "Upgradeability can't be added afterwards; it has to be settled before deployment. We ask: how much value will this contract hold, and will the rules really need to change later? If the answer is “no”, a small, unchangeable contract is usually safer." },

      { type: "h2", text: "3. Testing and audit take longer than writing" },
      { type: "p", text: "A smart contract's code is often surprisingly short. What takes time isn't writing it but making sure those lines behave correctly in every situation. That's why on Web3 projects we spend more time testing than writing. The order usually runs like this:" },
      { type: "ol", items: [
        "Automated tests: For each rule we write tests for both what should happen and what shouldn't; for example, that an unauthorised withdrawal attempt is rejected.",
        "Testnet trial: The contract is deployed to a test network that resembles the real one but carries no real money; wallet connection and transaction flows are tried end to end.",
        "Independent audit: Where needed, the code goes to a security team that didn't write it, and the issues found are fixed.",
        "Staged release: The contract goes to the main network, running at first with low limits and close monitoring.",
      ] },
      { type: "p", text: "In an independent audit, outside specialists read the code line by line and report findings by severity. It isn't cheap, can take weeks and doesn't guarantee bug-free code; but a second pair of eyes can catch what the author missed. We recommend it if the contract will hold users' money, carry significant value or be impossible to upgrade. For a small trial carrying no value, thorough tests are usually enough." },

      { type: "h2", text: "4. The network decides fees and audience" },
      { type: "p", text: "“Which blockchain?” looks like a technical preference but is really a business decision. We build on Ethereum and compatible networks, and on TON; we choose together with the client, based on three questions:" },
      { type: "ul", items: [
        "Where are your users? For a product running inside Telegram, TON is a natural option; for an existing Ethereum community, a compatible network makes more sense.",
        "What does each transaction cost? For small, frequent transactions, a high-fee network makes the product unusable.",
        "How quickly is a transaction final? In a game, seconds matter; in a transfer made a few times a year, they don't.",
      ] },
      { type: "p", text: "Every transaction that changes a record on the chain carries a fee, paid in the network's own currency and varying with how busy the network is. By default whoever starts the transaction pays, meaning your user, who needs a wallet balance beforehand. For users new to crypto, that's a serious barrier. You can arrange to cover the fee yourself, but then it's a running cost. When budgeting, put these fees alongside the development cost." },

      { type: "h2", text: "5. Whoever holds the keys has the say" },
      { type: "p", text: "A contract usually includes special powers: pausing the system, changing a fee rate or upgrading the contract. These are tied not to a username and password but to a private key: a long secret string that proves you own a wallet. Whoever gets hold of it can do everything you can; lose it, and there's no “forgot my password” button to press." },
      { type: "p", text: "So we don't tie admin rights to a single key; we use a multi-signature wallet: for example, nothing goes through unless at least two of three authorised people approve. A single stolen key then can't put the system at risk. Who holds the keys, and what happens when someone leaves the team, should be in writing before release. After handover these rights should sit with you, not us." },
      { type: "quote", text: "If you don't know who can pause or change your contract, it isn't yours yet." },

      { type: "h2", text: "6. Not everything belongs on the chain" },
      { type: "p", text: "Writing data to a chain is expensive, and the data is public and can't be deleted. So we put on-chain only what everyone must be able to verify: who owns what, whether a payment was made. The following almost always stay off-chain, in an ordinary database:" },
      { type: "ul", items: [
        "Personal data: Names, emails and addresses can't be erased once on a chain, which may conflict with data protection rules.",
        "Large files: Images and documents are stored off-chain; the chain holds only a short fingerprint proving the file is unchanged.",
        "Frequently changing content: Product descriptions, campaign copy and other data updated daily.",
        "Business information that must stay private: Anyone can read every record on the chain.",
      ] },
      { type: "p", text: "Most of a good Web3 product is really an ordinary web or mobile app; the contract is its small but critical core. Sometimes the honest answer is that the idea doesn't need a blockchain at all; when so, we say it plainly." },

      { type: "h2", text: "7. The legal side is a separate job" },
      { type: "p", text: "Working code doesn't make what you're doing lawful. Selling tokens, collecting money from users, distributing rewards or chance-based mechanics can fall under financial, consumer, tax and personal data rules in many countries. Those rules differ by country and change over time; a model allowed in one country may need a licence, or be banned, in another." },
      { type: "note", title: "This article is not legal advice", text: "We build software; we don't give legal counsel, and this article is not legal advice. If your project involves collecting money, selling tokens or distributing rewards, we recommend consulting a lawyer who knows this field before development starts." },

      { type: "h2", text: "Questions to ask a development team" },
      { type: "p", text: "When gathering quotes, ask these questions alongside price and delivery date:" },
      { type: "ul", items: [
        "How, and on which testnet, will you test the contract, and will you share the results?",
        "Will the contract be upgradeable, and if so, who holds the right to upgrade it?",
        "Who will hold the admin keys, and will a multi-signature wallet be used?",
        "Do you recommend an independent audit, and if not, why not?",
        "Who monitors the contract after release, and what's the first step if something goes wrong?",
      ] },
      { type: "p", text: "Used in the right place, a smart contract is a sturdy tool that needs no middleman, but it doesn't forgive mistakes. Keeping the scope small, making time for testing and settling admin rights early all cost less than any later fix." },
    ],
  },
};
