import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPublishedServices } from "@/actions/services";
import { getServicesStats } from "@/actions/stats";
import {
  Code2,
  Smartphone,
  Globe,
  Zap,
  Settings,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Wrench,
  Database,
  Cloud,
} from "lucide-react";
import { ServiceType } from "@prisma/client";

export async function generateMetadata() {
  return await generateDynamicMetadata({
    title: "Nossos Serviços",
    description:
      "Desenvolvimento web, aplicativos mobile, consultoria tecnológica e automação de processos. Conheça nossas soluções completas para seu negócio.",
    keywords: [
      "desenvolvimento web",
      "aplicativos mobile",
      "consultoria tecnológica",
      "automação de processos",
      "sistemas web",
      "API",
      "integração",
      "manutenção",
      "Brusque",
      "Santa Catarina",
    ],
  });
}

// Mapear tipos de serviços para ícones e cores
const serviceTypeConfig = {
  WEB: {
    icon: Globe,
    color: "bg-blue-500",
    label: "Desenvolvimento Web",
    description: "Sites e sistemas web responsivos e modernos",
  },
  MOBILE: {
    icon: Smartphone,
    color: "bg-green-500",
    label: "Desenvolvimento Mobile",
    description: "Aplicativos para Android e iOS",
  },
  DEVELOPMENT: {
    icon: Code2,
    color: "bg-purple-500",
    label: "Desenvolvimento de Sistemas",
    description: "Sistemas personalizados e sob medida",
  },
  API: {
    icon: Database,
    color: "bg-orange-500",
    label: "APIs e Integrações",
    description: "Conecte seus sistemas e dados",
  },
  CONSULTING: {
    icon: Users,
    color: "bg-indigo-500",
    label: "Consultoria Tecnológica",
    description: "Orientação especializada em tecnologia",
  },
  AUTOMATION: {
    icon: Zap,
    color: "bg-yellow-500",
    label: "Automação de Processos",
    description: "Otimize seus processos com automação",
  },
  MAINTENANCE: {
    icon: Wrench,
    color: "bg-red-500",
    label: "Manutenção e Suporte",
    description: "Suporte técnico e atualizações",
  },
  INTEGRATION: {
    icon: Cloud,
    color: "bg-teal-500",
    label: "Integração de Sistemas",
    description: "Conecte diferentes plataformas",
  },
};

export default async function ServicesPage() {
  // Buscar todos os serviços publicados e estatísticas
  const [allServices, stats] = await Promise.all([
    getPublishedServices(),
    getServicesStats(),
  ]);

  // Agrupar serviços por tipo
  const servicesByType = allServices.reduce((acc, service) => {
    if (!acc[service.type]) {
      acc[service.type] = [];
    }
    acc[service.type].push(service);
    return acc;
  }, {} as Record<ServiceType, typeof allServices>);

  // Serviços em destaque
  const featuredServices = allServices.filter((service) => service.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Serviços
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Soluções tecnológicas completas para impulsionar seu negócio. Do
              desenvolvimento à manutenção, estamos aqui para transformar suas
              ideias em realidade.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.services}+
                </div>
                <div className="text-sm text-muted-foreground">Serviços</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.projects}+
                </div>
                <div className="text-sm text-muted-foreground">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.clients}+
                </div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stats.years}+
                </div>
                <div className="text-sm text-muted-foreground">Anos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços em Destaque */}
      {featuredServices.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Serviços em{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Destaque
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossos serviços mais procurados e com maior impacto nos negócios
                dos nossos clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => {
                const config = serviceTypeConfig[service.type];
                const Icon = config?.icon || Code2;

                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/70 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 ${
                            config?.color || "bg-gray-500"
                          } rounded-lg flex items-center justify-center`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.shortDescription}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Tecnologias */}
                      {service.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech.id}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech.name}
                              </Badge>
                            ))}
                            {service.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{service.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Funcionalidades */}
                      {service.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-sm mb-2">
                            Principais funcionalidades:
                          </h4>
                          <ul className="space-y-1">
                            {service.features
                              .slice(0, 3)
                              .map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-muted-foreground"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Preço */}
                      {service.price && (
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-blue-600">
                            R$ {service.price.toLocaleString("pt-BR")}
                          </div>
                          {service.priceDescription && (
                            <div className="text-sm text-muted-foreground">
                              {service.priceDescription}
                            </div>
                          )}
                        </div>
                      )}

                      <Button
                        className="w-full group-hover:shadow-lg transition-all"
                        asChild
                      >
                        <Link href={`/servicos/${service.slug}`}>
                          Saiba Mais
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Todos os Serviços por Categoria */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todos os{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Serviços
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossa gama completa de serviços organizados por categoria.
            </p>
          </div>

          {/* Verificar se há serviços publicados */}
          {allServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Serviços em Preparação
                </h3>
                <p className="text-muted-foreground mb-6">
                  Estamos preparando nossa lista completa de serviços. Em breve
                  você poderá ver todos os nossos serviços aqui.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/contato">Falar Conosco</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/orcamento">Solicitar Orçamento</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            Object.entries(servicesByType).map(([type, services]) => {
              const config = serviceTypeConfig[type as ServiceType];
              const Icon = config?.icon || Code2;

              return (
                <div key={type} className="mb-16">
                  {/* Cabeçalho da Categoria */}
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
                        {config?.label || type}
                      </h3>
                      <p className="text-muted-foreground">
                        {config?.description}
                      </p>
                    </div>
                  </div>

                  {/* Cards dos Serviços */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </CardTitle>
                          <CardDescription>
                            {service.shortDescription}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          {/* Tecnologias */}
                          {service.technologies.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1">
                                {service.technologies
                                  .slice(0, 3)
                                  .map((tech) => (
                                    <Badge
                                      key={tech.id}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tech.name}
                                    </Badge>
                                  ))}
                                {service.technologies.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{service.technologies.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Preço */}
                          {service.price && (
                            <div className="mb-4">
                              <div className="text-lg font-bold text-blue-600">
                                R$ {service.price.toLocaleString("pt-BR")}
                              </div>
                              {service.priceDescription && (
                                <div className="text-xs text-muted-foreground">
                                  {service.priceDescription}
                                </div>
                              )}
                            </div>
                          )}

                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/servicos/${service.slug}`}>
                              Ver Detalhes
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não Encontrou o que Procura?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Cada projeto é único. Vamos conversar sobre suas necessidades
            específicas e criar uma solução personalizada para seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/orcamento">Solicitar Orçamento Personalizado</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contato">Falar com Especialista</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
