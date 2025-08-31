import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
      },
    ],
  },
  // Configurações para Tailwind CSS v4
  experimental: {
    optimizePackageImports: ["@tailwindcss/postcss", "lightningcss"],
  },
  webpack: (config, { isServer }) => {
    // Configurações específicas para o webpack
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Otimizações para lightningcss
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["@tailwindcss/postcss"],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
