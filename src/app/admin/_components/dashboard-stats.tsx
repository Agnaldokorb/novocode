import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { FileText, Briefcase, Code, Star, Eye } from "lucide-react";
import { withDatabaseFallback, supabaseRest } from "@/lib/database-fallback";

async function getStats() {
  return withDatabaseFallback(
    async () => {
      const [
        servicesCount,
        portfolioCount,
        blogPostsCount,
        technologiesCount,
        featuredServices,
        featuredPortfolio,
        featuredPosts,
        publishedPosts,
        publishedServices,
        publishedPortfolio,
      ] = await Promise.all([
        prisma.service.count(),
        prisma.portfolio.count(),
        prisma.blogPost.count(),
        prisma.technology.count(),
        prisma.service.count({ where: { featured: true } }),
        prisma.portfolio.count({ where: { featured: true } }),
        prisma.blogPost.count({ where: { featured: true } }),
        prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
        prisma.service.count({ where: { status: "PUBLISHED" } }),
        prisma.portfolio.count({ where: { publicationStatus: "PUBLISHED" } }),
      ]);

      return {
        services: {
          total: servicesCount,
          published: publishedServices,
          featured: featuredServices,
        },
        portfolio: {
          total: portfolioCount,
          published: publishedPortfolio,
          featured: featuredPortfolio,
        },
        blog: {
          total: blogPostsCount,
          published: publishedPosts,
          featured: featuredPosts,
        },
        technologies: { total: technologiesCount },
      };
    },
    async () => {
      // Fallback usando API REST
      const [services, portfolios, posts, technologies] = await Promise.all([
        supabaseRest.getServices(),
        supabaseRest.getPortfolios(),
        supabaseRest.getBlogPosts(),
        supabaseRest.getTechnologies(),
      ]);

      return {
        services: {
          total: services.length,
          published: services.filter((s: any) => s.status === 'PUBLISHED').length,
          featured: services.filter((s: any) => s.featured).length,
        },
        portfolio: {
          total: portfolios.length,
          published: portfolios.filter((p: any) => p.publicationStatus === 'PUBLISHED').length,
          featured: portfolios.filter((p: any) => p.featured).length,
        },
        blog: {
          total: posts.length,
          published: posts.filter((p: any) => p.status === 'PUBLISHED').length,
          featured: posts.filter((p: any) => p.featured).length,
        },
        technologies: { total: technologies.length },
      };
    },
    {
      services: { total: 0, published: 0, featured: 0 },
      portfolio: { total: 0, published: 0, featured: 0 },
      blog: { total: 0, published: 0, featured: 0 },
      technologies: { total: 0 },
    }
  );
}

export async function DashboardStats() {
  const stats = await getStats();

  const cards = [
    {
      title: "Serviços",
      total: stats.services.total,
      published: stats.services.published,
      featured: stats.services.featured,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Portfólio",
      total: stats.portfolio.total,
      published: stats.portfolio.published,
      featured: stats.portfolio.featured,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Blog",
      total: stats.blog.total,
      published: stats.blog.published,
      featured: stats.blog.featured,
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Tecnologias",
      total: stats.technologies.total,
      published: stats.technologies.total,
      featured: 0,
      icon: Code,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.total}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Eye className="mr-1 h-3 w-3" />
                <span className="mr-2">{card.published} publicados</span>
                {card.featured > 0 && (
                  <>
                    <Star className="mr-1 h-3 w-3" />
                    <span>{card.featured} em destaque</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
