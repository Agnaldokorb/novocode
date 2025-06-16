import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  BarChart3,
  Globe,
  Smartphone,
  Code,
  Megaphone,
  ShoppingCart,
} from "lucide-react";

export async function generateMetadata() {
  return await generateDynamicMetadata({
    title: "Geração de Leads",
    description:
      "Aumente suas vendas com estratégias digitais eficazes. Desenvolvimento de sites, landing pages e sistemas para capturar e converter mais leads.",
    keywords: [
      "geração de leads",
      "marketing digital",
      "landing pages",
      "conversão",
      "vendas online",
      "captação de clientes",
      "funil de vendas",
      "CRM",
    ],
  });
}

export default function LeadsPage() {
  const leadStrategies = [
    {
      icon: Globe,
      title: "Sites de Alta Conversão",
      description:
        "Sites otimizados para converter visitantes em leads qualificados",
      features: [
        "Design responsivo",
        "Formulários otimizados",
        "CTA estratégicos",
        "SEO integrado",
      ],
    },
    {
      icon: Target,
      title: "Landing Pages",
      description: "Páginas focadas em conversão para campanhas específicas",
      features: [
        "Design persuasivo",
        "A/B Testing",
        "Integração com ads",
        "Analytics detalhados",
      ],
    },
    {
      icon: BarChart3,
      title: "Sistemas de CRM",
      description:
        "Gerencie e acompanhe seus leads do primeiro contato à venda",
      features: [
        "Pipeline visual",
        "Automação",
        "Relatórios",
        "Integração WhatsApp",
      ],
    },
    {
      icon: Smartphone,
      title: "Apps para Vendas",
      description:
        "Aplicativos mobile para sua equipe de vendas capturar leads",
      features: [
        "Offline-first",
        "Sincronização",
        "Geolocalização",
        "Formulários rápidos",
      ],
    },
    {
      icon: Megaphone,
      title: "Automação de Marketing",
      description: "Automatize a nutrição e qualificação dos seus leads",
      features: [
        "E-mail marketing",
        "Segmentação",
        "Fluxos automáticos",
        "Lead scoring",
      ],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Otimizado",
      description: "Lojas online que convertem visitantes em compradores",
      features: [
        "Checkout rápido",
        "Abandono de carrinho",
        "Upselling",
        "Analytics",
      ],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Mais Vendas",
      description: "Aumento médio de 300% na geração de leads",
    },
    {
      icon: Target,
      title: "Leads Qualificados",
      description: "Captação de prospects com real interesse",
    },
    {
      icon: Zap,
      title: "Automação",
      description: "Processos automáticos 24/7",
    },
    {
      icon: BarChart3,
      title: "Métricas Claras",
      description: "ROI e resultados mensuráveis",
    },
  ];

  const caseStudies = [
    {
      company: "Imobiliária Regional",
      challenge: "Poucos leads qualificados",
      solution: "Site + Landing Pages + CRM",
      result: "450% mais leads em 6 meses",
      color: "bg-blue-500",
    },
    {
      company: "Consultoria Empresarial",
      challenge: "Processo de vendas manual",
      solution: "Automação + E-mail Marketing",
      result: "Redução de 60% no ciclo de vendas",
      color: "bg-green-500",
    },
    {
      company: "E-commerce Fashion",
      challenge: "Alto abandono de carrinho",
      solution: "Otimização + Automação",
      result: "Conversão aumentou 180%",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforme Visitantes em{" "}
              <span className="text-yellow-300">Clientes</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Soluções digitais completas para capturar, nutrir e converter mais
              leads para seu negócio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                <Link href="/orcamento">
                  <Target className="w-5 h-5 mr-2" />
                  Quero Mais Leads
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Link href="#estrategias">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Ver Estratégias
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estratégias Section */}
      <section id="estrategias" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Estratégias de Geração de Leads
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desenvolvemos soluções personalizadas para cada etapa do seu funil
              de vendas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadStrategies.map((strategy, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <strategy.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{strategy.title}</CardTitle>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Casos de Sucesso
            </h2>
            <p className="text-xl text-gray-600">
              Veja como ajudamos nossos clientes a multiplicar seus resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`h-2 ${study.color}`}></div>
                <CardHeader>
                  <CardTitle className="text-lg">{study.company}</CardTitle>
                  <CardDescription>
                    <strong>Desafio:</strong> {study.challenge}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <strong className="text-sm text-gray-700">Solução:</strong>
                    <p className="text-sm text-gray-600">{study.solution}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <strong className="text-green-800">Resultado:</strong>
                    <p className="text-green-700 font-semibold">
                      {study.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nosso Processo
            </h2>
            <p className="text-xl text-gray-600">
              Metodologia comprovada para maximizar a geração de leads
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Análise",
                  description: "Auditoria completa do seu funil atual",
                },
                {
                  step: "2",
                  title: "Estratégia",
                  description: "Definição de personas e jornada do cliente",
                },
                {
                  step: "3",
                  title: "Implementação",
                  description: "Desenvolvimento das soluções personalizadas",
                },
                {
                  step: "4",
                  title: "Otimização",
                  description: "Monitoramento e melhoria contínua",
                },
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ferramentas que Utilizamos
            </h2>
            <p className="text-xl text-gray-600">
              Stack tecnológico moderno para resultados garantidos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "Google Analytics",
              "Facebook Ads",
              "WhatsApp Business",
              "Mailchimp",
              "HubSpot",
              "WordPress",
              "React/Next.js",
              "Supabase",
              "Stripe",
              "Zapier",
              "Google Tag Manager",
              "Hotjar",
            ].map((tool, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Multiplicar seus Leads?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Vamos analisar seu negócio e criar uma estratégia personalizada para
            aumentar suas vendas
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/orcamento">
                <Target className="w-5 h-5 mr-2" />
                Solicitar Proposta Gratuita
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contato">
                <MessageCircle className="w-5 h-5 mr-2" />
                Conversar no WhatsApp
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>(47) 98881-5799</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>novocode.tec@gmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Brusque, SC</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                question: "Quanto tempo leva para ver resultados?",
                answer:
                  "Geralmente, os primeiros resultados aparecem entre 30-60 dias. Para estratégias de SEO e conteúdo, pode levar de 3-6 meses para resultados mais significativos.",
              },
              {
                question: "Vocês trabalham com todos os tipos de negócio?",
                answer:
                  "Sim! Temos experiência com diversos segmentos: imobiliário, consultoria, e-commerce, serviços, indústria, saúde, educação e muito mais.",
              },
              {
                question: "Como é feito o acompanhamento dos resultados?",
                answer:
                  "Fornecemos relatórios mensais detalhados com métricas de leads, conversões, ROI e insights para otimização contínua.",
              },
              {
                question: "Preciso ter conhecimento técnico?",
                answer:
                  "Não! Cuidamos de toda a parte técnica. Você só precisa focar no seu negócio enquanto geramos mais leads para você.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
