import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import { BudgetForm } from "@/components/forms/budget-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Clock,
  Shield,
  Users,
  Zap,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Calendar,
  Lightbulb,
  Target,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata() {
  return await generateDynamicMetadata({
    title: "Solicitar Orçamento",
    description:
      "Solicite um orçamento personalizado para seu projeto de desenvolvimento. Website, e-commerce, sistema de gestão, aplicativo mobile e mais. Orçamento gratuito em 24h.",
    keywords: [
      "orçamento",
      "projeto",
      "desenvolvimento",
      "website",
      "sistema",
      "aplicativo",
      "gratuito",
    ],
  });
}

export default function BudgetPage() {
  const features = [
    {
      icon: Calculator,
      title: "Orçamento Detalhado",
      description:
        "Receba um orçamento completo e transparente em até 24 horas",
    },
    {
      icon: Clock,
      title: "Resposta Rápida",
      description: "Nossa equipe retorna o contato no mesmo dia útil",
    },
    {
      icon: Shield,
      title: "Sem Compromisso",
      description: "Orçamento 100% gratuito e sem obrigação de contratação",
    },
    {
      icon: Users,
      title: "Consultoria Inclusa",
      description: "Análise técnica e sugestões de melhorias incluídas",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Preencha o Formulário",
      description: "Conte-nos sobre seu projeto e necessidades",
      icon: Target,
    },
    {
      number: "02",
      title: "Análise Técnica",
      description: "Nossa equipe analisa os requisitos e tecnologias",
      icon: Lightbulb,
    },
    {
      number: "03",
      title: "Proposta Personalizada",
      description: "Enviamos orçamento detalhado com cronograma",
      icon: Calculator,
    },
    {
      number: "04",
      title: "Reunião de Alinhamento",
      description: "Conversamos para alinhar todos os detalhes",
      icon: Calendar,
    },
  ];

  const whyChooseUs = [
    "Mais de 50 projetos entregues",
    "Equipe especializada e certificada",
    "Metodologia ágil e transparente",
    "Suporte completo pós-entrega",
    "Tecnologias modernas e escaláveis",
    "Preços competitivos e justos",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              <Star className="h-3 w-3 mr-1" />
              Orçamento Gratuito
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Começar um{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projeto
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transforme sua ideia em realidade. Solicite um orçamento
              personalizado e receba uma proposta completa em até 24 horas, sem
              compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#formulario">
                  <Calculator className="h-5 w-5 mr-2" />
                  Solicitar Orçamento
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">
                  Ver Projetos Realizados
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Funciona
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nosso processo é simples, transparente e focado em entregar
              exatamente o que você precisa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {/* Arrow for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section id="formulario" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Conte-nos sobre seu{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Projeto
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Preencha o formulário abaixo com os detalhes do seu projeto.
                  Quanto mais informações você fornecer, mais preciso será nosso
                  orçamento.
                </p>
              </div>
              <BudgetForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    Precisa de Ajuda?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Estamos aqui para ajudar! Entre em contato conosco através
                    dos canais abaixo:
                  </p>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        WhatsApp: (11) 99999-9999
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href="mailto:novocode.tec@gmail.com">
                        <Mail className="h-4 w-4 mr-2" />
                        novocode.tec@gmail.com
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/contato">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Formulário de Contato
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Por Que Escolher a NOVOCODE?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {whyChooseUs.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projetos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-sm">E-commerce B2B</h4>
                      <p className="text-xs text-muted-foreground">
                        Plataforma completa para distribuidora
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-sm">App de Delivery</h4>
                      <p className="text-xs text-muted-foreground">
                        Aplicativo com geolocalização
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-sm">
                        Sistema de Gestão
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ERP customizado para indústria
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full mt-4" asChild>
                    <Link href="/portfolio">
                      Ver Todos os Projetos
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Começar seu Projeto?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Não perca tempo! Solicite seu orçamento agora e receba uma proposta
            personalizada em até 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="#formulario">
                <Calculator className="h-5 w-5 mr-2" />
                Solicitar Orçamento Agora
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5 mr-2" />
                Conversar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
