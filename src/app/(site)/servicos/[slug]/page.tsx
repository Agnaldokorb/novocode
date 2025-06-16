import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getPublishedServiceBySlug,
  getPublishedServices,
} from "@/actions/services";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Clock,
  Users,
  Target,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    return {
      title: "Serviço não encontrado | NOVOCODE",
    };
  }

  return {
    title: `${service.title} | NOVOCODE - Serviços`,
    description: service.shortDescription,
    keywords: [
      service.title,
      ...service.keywords,
      ...service.technologies.map((tech) => tech.name),
      "NOVOCODE",
      "desenvolvimento",
      "tecnologia",
    ],
    openGraph: {
      title: `${service.title} | NOVOCODE`,
      description: service.shortDescription,
      url: `https://novocode.com.br/servicos/${service.slug}`,
      siteName: "NOVOCODE",
      images: service.thumbnail
        ? [
            {
              url: service.thumbnail,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : undefined,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | NOVOCODE`,
      description: service.shortDescription,
      images: service.thumbnail ? [service.thumbnail] : undefined,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/servicos">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Serviços
              </Link>
            </Button>

            <div className="flex items-center gap-4 mb-6">
              {service.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Star className="h-3 w-3 mr-1" />
                  Serviço em Destaque
                </Badge>
              )}
              <Badge variant="outline">{service.type}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Thumbnail */}
              {service.thumbnail && (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={service.thumbnail}
                    alt={service.title}
                    width={800}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Sobre o Serviço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: service.description.replace(/\n/g, "<br>"),
                    }}
                  />
                </CardContent>
              </Card>

              {/* Features */}
              {service.features.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Funcionalidades Incluídas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {service.benefits.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Benefícios para seu Negócio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Deliverables */}
              {service.deliverables.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />O que você
                      recebe
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Projects */}
              {service.portfolioItems.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Projetos Relacionados</CardTitle>
                    <CardDescription>
                      Veja alguns projetos que desenvolvemos com este serviço
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.portfolioItems.map((project) => (
                        <div key={project.id} className="group">
                          <Link href={`/portfolio/${project.slug}`}>
                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                              {project.thumbnail ? (
                                <Image
                                  src={project.thumbnail}
                                  alt={project.title}
                                  width={400}
                                  height={225}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  Sem imagem
                                </div>
                              )}
                            </div>
                            <h4 className="font-semibold group-hover:text-blue-600 transition-colors">
                              {project.title}
                            </h4>
                            {project.shortDescription && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {project.shortDescription}
                              </p>
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Pricing Card */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Investimento</CardTitle>
                </CardHeader>
                <CardContent>
                  {service.price ? (
                    <div className="mb-6">
                      <div className="text-3xl font-bold mb-2">
                        R$ {service.price.toLocaleString("pt-BR")}
                      </div>
                      {service.priceDescription && (
                        <div className="text-blue-100 text-sm">
                          {service.priceDescription}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="text-2xl font-bold mb-2">
                        Sob Consulta
                      </div>
                      <div className="text-blue-100 text-sm">
                        Cada projeto é único
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-white text-blue-600 hover:bg-gray-100"
                      asChild
                    >
                      <Link href="/orcamento">Solicitar Orçamento</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                      asChild
                    >
                      <Link href="/contato">Falar com Especialista</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              {service.technologies.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Tecnologias Utilizadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <Badge key={tech.id} variant="outline">
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {service.gallery.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Galeria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {service.gallery.slice(0, 4).map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`${service.title} - Imagem ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Info */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Precisa de Ajuda?</CardTitle>
                  <CardDescription>
                    Nossa equipe está pronta para esclarecer suas dúvidas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href="https://wa.me/5547988815799"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp: (47) 98881-5799
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="mailto:novocode.tec@gmail.com">
                      Email: novocode.tec@gmail.com
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Vamos transformar suas ideias em realidade. Entre em contato conosco
            e vamos discutir como este serviço pode impulsionar seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/orcamento">
                Solicitar Orçamento Gratuito
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/servicos">Ver Outros Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
