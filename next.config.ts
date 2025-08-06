import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
        pathname: "/**", // <- isso é necessário para permitir todas as imagens do domínio
      },
    ],
  },
};

export default nextConfig;
