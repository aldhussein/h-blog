import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "mockmind-api.uifaces.co",
      },
      { hostname: "picsum.photos" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
