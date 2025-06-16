import { Suspense } from "react";
import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import { PortfolioContainer } from "./_components/portfolio-container";
import { PortfolioHero } from "./_components/portfolio-hero";
import { getPortfolioStats } from "@/actions/stats";

export async function generateMetadata() {
  return await generateDynamicMetadata({
    title: "Portfólio",
    description:
      "Conheça nossos projetos e cases de sucesso. Desenvolvimento de sites, sistemas web, aplicativos mobile e soluções digitais inovadoras.",
    keywords: [
      "portfólio",
      "projetos",
      "cases de sucesso",
      "desenvolvimento web",
      "aplicativos",
      "sistemas",
    ],
  });
}

export default async function PortfolioPage() {
  // Buscar estatísticas do portfólio
  const stats = await getPortfolioStats();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PortfolioHero stats={stats} /> {/* Portfolio Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Portfolio Container with Filters and Grid */}
          <Suspense fallback={<PortfolioSkeleton />}>
            <PortfolioContainer />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

// Skeleton para o portfólio completo
function PortfolioSkeleton() {
  return (
    <div className="space-y-12">
      {/* Filters Skeleton */}
      <div className="space-y-6">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-48"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-96"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 animate-pulse rounded w-32"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded w-32"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded w-32"></div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-14"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
