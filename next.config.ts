import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "souqjphlttbvtibwschm.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "devicons.github.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Otimizações para build na Vercel
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  // Configuração do Turbopack para builds
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Configuração movida de experimental para raiz
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Otimizações para build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Configurações específicas para resolver problemas de build
  webpack: (config, { isServer, buildId, dev }) => {
    // Configurações específicas para produção
    if (!dev) {
      // Otimizações de bundle
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            prisma: {
              test: /[\\/]node_modules[\\/](@prisma|prisma)[\\/]/,
              name: 'prisma',
              priority: 10,
              chunks: 'all',
            },
          },
        },
      };
    }

    // Configurações universais
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('./src/', import.meta.url).pathname,
    };
    
    if (!isServer) {
      // Configurações para client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // Configurações para evitar problemas com Prisma
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        '@prisma/client': '@prisma/client',
      });
    }

    return config;
  },
  // Configurações de output para deploy otimizado
  output: 'standalone',
  // Configurações de build
  generateBuildId: async () => {
    // ID de build estável baseado em timestamp
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
