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
  // Configuração movida de experimental para raiz
  serverExternalPackages: ['@prisma/client'],
  // Configurações específicas para resolver problemas de build
  webpack: (config, { isServer, buildId, dev }) => {
    // Correção específica para problema de client reference manifest na Vercel
    if (!dev && !isServer) {
      // Evita geração de manifests problemáticos
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        // Remove entradas problemáticas de client manifests
        Object.keys(entries).forEach(key => {
          if (key.includes('page_client-reference-manifest')) {
            delete entries[key];
          }
        });
        return entries;
      };
    }

    // Correção para problema de client reference manifest
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': new URL('./src/', import.meta.url).pathname,
    };
    
    if (!isServer) {
      // Configurações para client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Configurações de otimização específicas para Vercel
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization?.splitChunks,
        cacheGroups: {
          ...config.optimization?.splitChunks?.cacheGroups,
          default: false,
          vendors: false,
          // Força agrupamento correto de client components
          client: {
            name: 'client-components',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      },
    };

    return config;
  },
  // Configurações de output para evitar conflitos
  output: 'standalone',
};

export default nextConfig;
