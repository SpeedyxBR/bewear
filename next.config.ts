import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
      },
    ],
  },
  // Suppress hydration warnings caused by browser extensions
  reactStrictMode: true,
  // Ensure static assets are included in build
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Custom webpack config to suppress hydration warnings
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
