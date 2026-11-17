import type { NextConfig } from "next";

// GitHub Pages için statik derleme: GITHUB_PAGES=true ile açılır.
// PAGES_BASE_PATH, site bir alt klasörde yayınlanıyorsa onu verir (ör. /errnify-website); özel alan adında boştur.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Statik derleme (export) PPR'ı desteklemiyor; bu iki ayar yalnızca sunuculu çalışmada açık
  cacheComponents: !pages,
  partialPrefetching: !pages,
  // Aynı ağdaki telefon/tablet ve ngrok adresleri geliştirme sunucusuna bağlanabilsin
  allowedDevOrigins: ["192.168.1.35", "192.168.1.*", "*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.dev", "*.ngrok.io"],
  ...(pages
    ? // Statik derlemede yönlendirme desteklenmez; ana sayfadan /tr'ye geçişi public/index.html yapar
      {
        output: "export",
        trailingSlash: true,
        basePath,
        // robots.ts ve sitemap.ts statik derlemede Cache Components ile birlikte üretilemiyor;
        // yalnızca .tsx dosyalarını rota say. Alt klasörde (github.io/errnify-website) zaten işe yaramazlar.
        pageExtensions: ["tsx"],
      }
    : {
        async redirects() {
          return [{ source: "/", destination: "/tr", permanent: false }];
        },
      }),
};

export default nextConfig;
