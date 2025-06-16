import Link from "next/link";
import { ArrowRight, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Começar?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vamos conversar sobre seu projeto e como podemos ajudar sua empresa
            a crescer
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Projeto Novo */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors"></div>
            <CardHeader className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Novo Projeto</CardTitle>
              <CardDescription>
                Tem uma ideia ou precisa desenvolver um sistema? Vamos conversar
                sobre como podemos tornar seu projeto realidade.
              </CardDescription>
            </CardHeader>{" "}
            <CardContent className="relative">
              <Button size="lg" className="w-full group" asChild>
                <Link href="/orcamento">
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Consultoria */}
          {/* <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 group-hover:from-green-500/10 group-hover:to-blue-500/10 transition-colors"></div>
            <CardHeader className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Consultoria</CardTitle>
              <CardDescription>
                Precisa de orientação técnica ou quer otimizar seus processos? Nossa consultoria pode ajudar sua empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button size="lg" variant="outline" className="w-full group" asChild>
                <Link href="/consultoria">
                  Agendar Consultoria
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card> */}
        </div>

        {/* Contact Info */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Email */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>{" "}
              <a
                href="mailto:novocode.tec@gmail.com"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                novocode.tec@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/5547988815799"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                (47) 98881-5799
              </a>
            </div>

            {/* Localização */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Localização</h3>
              <p className="text-muted-foreground">
                Brusque, SC
                <br />
                Atendimento Remoto
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4 font-bold">
            Atendemos empresas de diversos setores!
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            {/* Placeholder para logos de clientes */}
            <div className="w-40 h-8 bg-gray-200 rounded">Startups</div>
            <div className="w-40 h-8 bg-gray-200 rounded">
              Pequenas Empresas
            </div>
            <div className="w-40 h-8 bg-gray-200 rounded">Médias Empresas</div>
            {/* <div className="w-20 h-8 bg-gray-200 rounded"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
