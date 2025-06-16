import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicTechnologies } from "@/actions/technologies";
import { getTechnologiesStats } from "@/actions/stats";
import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import { TechnologyCategory } from "@prisma/client";
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Cloud,
  Settings,
  ExternalLink,
  Layers,
  Zap,
  Globe,
  Users,
} from "lucide-react";
import { TechnologyIcon } from "@/components/ui/technology-icon";

export async function generateMetadata(): Promise<Metadata> {
  return await generateDynamicMetadata({
    title: "Tecnologias - Stack Tecnológico",
    description:
      "Conheça as tecnologias que utilizamos: React, Next.js, Node.js, Python, React Native, AWS e muito mais. Stack moderno e robusto para seus projetos.",
    keywords: [
      "tecnologias",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "React Native",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "Docker",
      "stack tecnológico",
      "desenvolvimento",
    ],
    images: ["/og-technologies.jpg"],
    url: "https://novocode.com.br/tecnologias",
  });
}

// Configuração das categorias de tecnologia
const categoryConfig = {
  FRONTEND: {
    icon: Globe,
    color: "bg-blue-500",
    label: "Frontend",
    description: "Interfaces modernas e responsivas",
  },
  BACKEND: {
    icon: Server,
    color: "bg-green-500",
    label: "Backend",
    description: "APIs robustas e escaláveis",
  },
  DATABASE: {
    icon: Database,
    color: "bg-purple-500",
    label: "Banco de Dados",
    description: "Armazenamento seguro e eficiente",
  },
  MOBILE: {
    icon: Smartphone,
    color: "bg-orange-500",
    label: "Mobile",
    description: "Apps nativos e multiplataforma",
  },
  CLOUD: {
    icon: Cloud,
    color: "bg-cyan-500",
    label: "Cloud & DevOps",
    description: "Infraestrutura na nuvem",
  },
  DEVOPS: {
    icon: Settings,
    color: "bg-red-500",
    label: "DevOps",
    description: "Automação e CI/CD",
  },
  OTHER: {
    icon: Layers,
    color: "bg-gray-500",
    label: "Outras",
    description: "Ferramentas e frameworks diversos",
  },
  NOCODE: {
    icon: Zap,
    color: "bg-purple-500",
    label: "No-Code",
    description: "Ferramentas sem código",
  },
  AI: {
    icon: Zap,
    color: "bg-indigo-500",
    label: "Inteligência Artificial",
    description: "IA e Machine Learning",
  },
  BLOCKCHAIN: {
    icon: Layers,
    color: "bg-yellow-500",
    label: "Blockchain",
    description: "Tecnologias blockchain",
  },
  IOT: {
    icon: Globe,
    color: "bg-green-600",
    label: "IoT",
    description: "Internet das Coisas",
  },
  SECURITY: {
    icon: Settings,
    color: "bg-red-600",
    label: "Segurança",
    description: "Ferramentas de segurança",
  },
  DESIGN: {
    icon: Globe,
    color: "bg-pink-500",
    label: "Design",
    description: "Ferramentas de design",
  },
  MARKETING: {
    icon: Globe,
    color: "bg-orange-600",
    label: "Marketing",
    description: "Ferramentas de marketing",
  },
  ANALYTICS: {
    icon: Globe,
    color: "bg-blue-600",
    label: "Analytics",
    description: "Análise de dados",
  },
  CRM: {
    icon: Users,
    color: "bg-teal-500",
    label: "CRM",
    description: "Gestão de relacionamento",
  },
  ERP: {
    icon: Settings,
    color: "bg-slate-500",
    label: "ERP",
    description: "Sistemas de gestão",
  },
  ECOMMERCE: {
    icon: Globe,
    color: "bg-emerald-500",
    label: "E-commerce",
    description: "Comércio eletrônico",
  },
};

export default async function TechnologiesPage() {
  // Buscar todas as tecnologias ativas e estatísticas
  const [technologies, stats] = await Promise.all([
    getPublicTechnologies(),
    getTechnologiesStats(),
  ]);

  // Agrupar tecnologias por categoria
  const technologiesByCategory = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<TechnologyCategory, typeof technologies>);

  // Tecnologias principais (mais usadas)
  const mainTechnologies = technologies.filter((tech) =>
    ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"].includes(
      tech.name
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossas{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tecnologias
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Utilizamos as tecnologias mais modernas e robustas do mercado para
              garantir que seu projeto seja desenvolvido com qualidade,
              performance e escalabilidade.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.technologies}+
                </div>
                <div className="text-sm text-muted-foreground">Tecnologias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.categories}
                </div>
                <div className="text-sm text-muted-foreground">Categorias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.years}+
                </div>
                <div className="text-sm text-muted-foreground">Anos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stats.projects}+
                </div>
                <div className="text-sm text-muted-foreground">Projetos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Technologies */}
      {mainTechnologies.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stack{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Principal
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                As tecnologias que formam a base da maioria dos nossos projetos.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {mainTechnologies.map((tech) => (
                <Card
                  key={tech.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/70 backdrop-blur-sm text-center"
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform">
                      <TechnologyIcon
                        tech={tech}
                        size="lg"
                        fallbackColor="white"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {tech.name}
                    </h3>

                    {/* Category */}
                    <Badge variant="outline" className="text-xs">
                      {categoryConfig[tech.category]?.label || tech.category}
                    </Badge>

                    {/* Description */}
                    {tech.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {tech.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Technologies by Category */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stack{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Completo
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore todas as tecnologias que dominamos, organizadas por
              categoria.
            </p>
          </div>

          {Object.entries(technologiesByCategory).map(([category, techs]) => {
            const config = categoryConfig[category as TechnologyCategory];
            const Icon = config?.icon || Code2;

            return (
              <div key={category} className="mb-16">
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div
                    className={`w-16 h-16 ${
                      config?.color || "bg-gray-500"
                    } rounded-xl flex items-center justify-center mr-6`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {config?.label || category}
                    </h3>
                    <p className="text-muted-foreground">
                      {config?.description}
                    </p>
                  </div>
                </div>

                {/* Technology Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {techs.map((tech) => (
                    <Card
                      key={tech.id}
                      className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    >
                      <CardContent className="p-4 text-center">
                        {/* Icon/Color */}
                        <div
                          className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg"
                          style={{ backgroundColor: tech.color || "#6b7280" }}
                        >
                          <TechnologyIcon
                            tech={tech}
                            size="md"
                            fallbackColor="white"
                          />
                        </div>

                        {/* Name */}
                        <h4 className="font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors">
                          {tech.name}
                        </h4>

                        {/* Description */}
                        {tech.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {tech.description}
                          </p>
                        )}

                        {/* Website Link */}
                        {tech.website && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 h-6 px-2 text-xs"
                            asChild
                          >
                            <a
                              href={tech.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Site
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why These Technologies */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolhemos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                essas tecnologias?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Tecnologias otimizadas para máxima velocidade e eficiência
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Escalabilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Stack preparado para crescer junto com seu negócio
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Manutenibilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Código limpo e bem estruturado para facilitar atualizações
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Modernidade</h3>
                <p className="text-sm text-muted-foreground">
                  Sempre atualizados com as últimas tendências do mercado
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vamos construir algo incrível juntos?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nossa expertise em tecnologias modernas está à sua disposição.
            Conte-nos sobre seu projeto e vamos transformá-lo em realidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/orcamento">Solicitar Orçamento</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/servicos">Ver Nossos Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
