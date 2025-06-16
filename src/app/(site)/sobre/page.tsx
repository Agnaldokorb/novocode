import type { Metadata } from "next";
import { getSiteConfig } from "@/actions/site-config";
import { generateDynamicMetadata } from "@/lib/dynamic-metadata";
import { getAboutStats } from "@/actions/stats";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Heart,
  Target,
  Eye,
  Users,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return await generateDynamicMetadata({
    title: "Sobre",
    description:
      "Conheça a NOVOCODE, nossa missão, visão, valores e equipe. Saiba mais sobre nossa história e compromisso com a inovação tecnológica.",
    keywords: [
      "sobre novocode",
      "missão",
      "visão",
      "valores",
      "equipe",
      "história",
      "empresa de tecnologia",
    ],
  });
}

export default async function AboutPage() {
  // Buscar configurações do site e estatísticas
  const [siteConfig, stats] = await Promise.all([
    getSiteConfig(),
    getAboutStats(),
  ]);

  // Dados padrão caso não haja configuração no banco
  const defaultData = {
    companyName: "NOVOCODE",
    companyDescription:
      "Somos uma empresa de tecnologia especializada em desenvolvimento de software, sites e sistemas sob medida. Nossa paixão é transformar ideias em soluções digitais inovadoras que impulsionam o crescimento dos nossos clientes.",
    companyMission:
      "Desenvolver soluções tecnológicas inovadoras e personalizadas que transformem ideias em realidade digital, proporcionando crescimento e sucesso aos nossos clientes através de produtos de alta qualidade e suporte excepcional.",
    companyVision:
      "Ser reconhecida como a principal referência em desenvolvimento de software personalizado no Brasil, estabelecendo parcerias duradouras e contribuindo para a transformação digital das empresas.",
    companyValues: [
      "Inovação Constante",
      "Qualidade Excepcional",
      "Transparência Total",
      "Foco no Cliente",
      "Crescimento Sustentável",
      "Trabalho em Equipe",
    ],
    email: "novocode.tec@gmail.com",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP - Brasil",
  };

  const data = {
    companyName: siteConfig?.companyName || defaultData.companyName,
    companyDescription:
      siteConfig?.companyDescription || defaultData.companyDescription,
    companyMission: siteConfig?.companyMission || defaultData.companyMission,
    companyVision: siteConfig?.companyVision || defaultData.companyVision,
    companyValues: siteConfig?.companyValues || defaultData.companyValues,
    email: siteConfig?.email || defaultData.email,
    phone: siteConfig?.phone || defaultData.phone,
    address: siteConfig?.address || defaultData.address,
  };

  const achievements = [
    { number: `${stats.projects}+`, label: "Projetos Entregues" },
    { number: `${stats.clients}+`, label: "Clientes Satisfeitos" },
    { number: `${stats.years}+`, label: "Anos de Experiência" },
    { number: `${stats.satisfaction}%`, label: "Projetos no Prazo" },
  ];

  const teamMembers = [
    {
      name: "Equipe NOVOCODE",
      role: "Desenvolvedores Full Stack",
      description:
        "Nossa equipe é formada por desenvolvedores especializados em tecnologias modernas, com experiência em projetos de diversos segmentos.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-4 text-blue-600 border-blue-200"
          >
            <Building2 className="mr-2 h-4 w-4" />
            Sobre a {data.companyName}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transformando
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Ideias{" "}
            </span>
            em Realidade
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {data.companyDescription}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {data.companyMission}
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  {data.companyVision}
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Valores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.companyValues.map((value, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-blue-600 border-blue-200"
            >
              <Users className="mr-2 h-4 w-4" />
              Nossa Equipe
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conheça Quem Faz a Diferença
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nosso time é formado por profissionais apaixonados por tecnologia
              e comprometidos em entregar resultados excepcionais.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vamos Trabalhar Juntos?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Entre em contato conosco e descubra como podemos ajudar a
            transformar sua ideia em realidade.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {data.email && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-blue-100">{data.email}</p>
              </div>
            )}

            {data.phone && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Telefone</h3>
                <p className="text-blue-100">{data.phone}</p>
              </div>
            )}

            {data.address && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Localização</h3>
                <p className="text-blue-100">{data.address}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
