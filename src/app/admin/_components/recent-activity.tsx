import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, Briefcase, Code, Star, Clock, User } from "lucide-react";

async function getRecentActivity() {
  try {
    // Buscar itens criados recentemente
    const [recentServices, recentPortfolio, recentPosts, recentTechnologies] =
      await Promise.all([
        prisma.service.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          include: {
            createdByUser: { select: { name: true } },
          },
        }),
        prisma.portfolio.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          include: {
            createdByUser: { select: { name: true } },
          },
        }),
        prisma.blogPost.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          include: {
            createdByUser: { select: { name: true } },
          },
        }),
        prisma.technology.findMany({
          take: 2,
          orderBy: { createdAt: "desc" },
        }),
      ]);

    // Combinar e ordenar por data de criação
    const activities = [
      ...recentServices.map((item) => ({
        id: item.id,
        type: "service" as const,
        title: item.title,
        createdAt: item.createdAt,
        createdBy: item.createdByUser?.name || "Sistema",
        status: item.status,
        featured: item.featured,
      })),
      ...recentPortfolio.map((item) => ({
        id: item.id,
        type: "portfolio" as const,
        title: item.title,
        createdAt: item.createdAt,
        createdBy: item.createdByUser?.name || "Sistema",
        status: item.publicationStatus,
        featured: item.featured,
      })),
      ...recentPosts.map((item) => ({
        id: item.id,
        type: "blog" as const,
        title: item.title,
        createdAt: item.createdAt,
        createdBy: item.createdByUser?.name || "Sistema",
        status: item.status,
        featured: item.featured,
      })),
      ...recentTechnologies.map((item) => ({
        id: item.id,
        type: "technology" as const,
        title: item.name,
        createdAt: item.createdAt,
        createdBy: "Sistema",
        status: "PUBLISHED",
        featured: false,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 8);

    return activities;
  } catch (error) {
    console.error("Erro ao buscar atividade recente:", error);
    return [];
  }
}

const typeIcons = {
  service: Briefcase,
  portfolio: FileText,
  blog: FileText,
  technology: Code,
};

const typeLabels = {
  service: "Serviço",
  portfolio: "Projeto",
  blog: "Post",
  technology: "Tecnologia",
};

const statusVariants = {
  DRAFT: "secondary",
  PUBLISHED: "default",
  ARCHIVED: "outline",
} as const;

const statusLabels = {
  DRAFT: "Rascunho",
  PUBLISHED: "Publicado",
  ARCHIVED: "Arquivado",
};

export async function RecentActivity() {
  const activities = await getRecentActivity();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>Últimas atualizações no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma atividade recente
            </p>
          ) : (
            activities.map((activity) => {
              const Icon = typeIcons[activity.type];
              return (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-muted rounded-md">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {activity.title}
                      </p>
                      {activity.featured && (
                        <Star className="h-3 w-3 text-yellow-500 fill-current ml-2" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {typeLabels[activity.type]}
                      </Badge>
                      <Badge
                        variant={
                          statusVariants[
                            activity.status as keyof typeof statusVariants
                          ]
                        }
                        className="text-xs"
                      >
                        {
                          statusLabels[
                            activity.status as keyof typeof statusLabels
                          ]
                        }
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <User className="mr-1 h-3 w-3" />
                      <span className="mr-2">{activity.createdBy}</span>
                      <Clock className="mr-1 h-3 w-3" />
                      <span>
                        {format(
                          new Date(activity.createdAt),
                          "dd/MM/yyyy HH:mm",
                          { locale: ptBR }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
