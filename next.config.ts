import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Aynı ağdaki telefon/tablet ve ngrok adresleri geliştirme sunucusuna bağlanabilsin
  allowedDevOrigins: ["192.168.1.35", "192.168.1.*", "*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.dev", "*.ngrok.io"],
  async redirects() {
    return [{ source: "/", destination: "/tr", permanent: false }];
  },
};

export default nextConfig;
