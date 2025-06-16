import { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
} from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return await generateDynamicMetadata({
    title: "Contato - Entre em contato conosco",
    description:
      "Entre em contato com a NOVOCODE. Desenvolvimento de sistemas web, apps mobile e soluções tecnológicas em Brusque, SC.",
    keywords: [
      "contato",
      "desenvolvimento web",
      "Brusque",
      "Santa Catarina",
      "orçamento",
    ],
    images: ["/og-contact.jpg"],
    url: "https://novocode.com.br/contato",
  });
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vamos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Conversar?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos prontos para transformar suas ideias em soluções
              tecnológicas inovadoras. Entre em contato conosco e vamos discutir
              como podemos ajudar seu negócio a crescer.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Info */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    NOVOCODE
                  </CardTitle>
                  <CardDescription>Tecnologia e Inovação</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Especializada em desenvolvimento de sistemas web, aplicações
                    mobile e soluções tecnológicas personalizadas para empresas
                    de todos os portes.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Methods */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Fale Conosco</CardTitle>
                  <CardDescription>
                    Escolha a forma mais conveniente para você
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>{" "}
                      <a
                        href="mailto:novocode.tec@gmail.com"
                        className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                      >
                        novocode.tec@gmail.com
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resposta em até 24 horas
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/5547988815799"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-green-600 transition-colors"
                      >
                        (47) 98881-5799
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">
                        Atendimento rápido e direto
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Localização</h3>
                      <p className="text-sm text-muted-foreground">
                        Brusque, Santa Catarina
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Atendimento presencial e remoto
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Horário de Atendimento
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Segunda à Sexta: 8h às 18h</p>
                        <p>Sábado: 8h às 12h</p>
                        <p className="text-xs mt-1">Emergências 24/7</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">
                    Precisa de Ajuda Rápida?
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Fale diretamente conosco agora
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <Link
                      href="https://wa.me/5547988815799?text=Olá! Gostaria de conversar sobre um projeto."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Chamar no WhatsApp
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Link href="mailto:novocode.tec@gmail.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Email
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-indigo-600" />
                    FAQ
                  </CardTitle>
                  <CardDescription>
                    Respostas para perguntas frequentes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Quanto tempo leva um projeto?
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Depende da complexidade, mas normalmente entre 2-8
                      semanas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Trabalham com quais tecnologias?
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      React, Next.js, Node.js, Python, PHP, mobile e muito mais.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Oferecem suporte pós-entrega?
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Sim! Garantia e suporte técnico inclusos em todos os
                      projetos.
                    </p>
                  </div>
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
            Pronto para Começar seu Projeto?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Não perca tempo! Entre em contato agora e receba uma consultoria
            gratuita para seu próximo projeto digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link
                href="https://wa.me/5547988815799?text=Olá! Quero fazer um orçamento para meu projeto."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5 mr-2" />
                Orçamento Gratuito
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/#services">Ver Nossos Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
