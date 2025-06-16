import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedSiteConfig() {
  console.log("🌱 Populando configurações do site...");

  // Verificar se já existe configuração
  const existingConfig = await prisma.siteConfig.findFirst();

  if (existingConfig) {
    console.log("⚠️  Configuração do site já existe. Atualizando...");
    await prisma.siteConfig.update({
      where: { id: existingConfig.id },
      data: {
        companyName: "NOVOCODE",
        companyDescription:
          "Transformamos ideias em soluções digitais inovadoras. Somos especialistas em desenvolvimento web, mobile e consultoria tecnológica, oferecendo soluções personalizadas para empresas de todos os portes.",
        companyMission:
          "Nossa missão é democratizar a tecnologia, criando soluções digitais que impulsionem o crescimento dos nossos clientes através de inovação, qualidade e excelência técnica.",
        companyVision:
          "Ser a principal referência em desenvolvimento de soluções tecnológicas no sul do Brasil, reconhecida pela inovação, qualidade e relacionamento próximo com nossos clientes.",
        companyValues: [
          "Inovação contínua",
          "Qualidade em primeiro lugar",
          "Transparência total",
          "Relacionamento próximo",
          "Resultados mensuráveis",
          "Crescimento sustentável",
        ],
        email: "novocode.tec@gmail.com",
        phone: "(47) 98881-5799",
        whatsapp: "5547988815799",
        address: "Brusque, Santa Catarina - Brasil",
        socialFacebook: "https://facebook.com/novocode",
        socialInstagram: "https://instagram.com/novocode",
        socialLinkedin: "https://linkedin.com/company/novocode",
        socialGithub: "https://github.com/NovoCode-Tec",
        defaultMetaTitle:
          "NOVOCODE - Desenvolvimento Web e Soluções Tecnológicas",
        defaultMetaDescription:
          "Especialistas em desenvolvimento web, mobile e consultoria tecnológica. Transformamos suas ideias em soluções digitais inovadoras.",
        defaultKeywords: [
          "desenvolvimento web",
          "aplicativos mobile",
          "consultoria tecnológica",
          "sistemas web",
          "e-commerce",
          "automação",
          "Brusque",
          "Santa Catarina",
        ],
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        maintenanceMode: false,
        allowRegistration: false,
      },
    });
  } else {
    await prisma.siteConfig.create({
      data: {
        companyName: "NOVOCODE",
        companyDescription:
          "Transformamos ideias em soluções digitais inovadoras. Somos especialistas em desenvolvimento web, mobile e consultoria tecnológica, oferecendo soluções personalizadas para empresas de todos os portes.",
        companyMission:
          "Nossa missão é democratizar a tecnologia, criando soluções digitais que impulsionem o crescimento dos nossos clientes através de inovação, qualidade e excelência técnica.",
        companyVision:
          "Ser a principal referência em desenvolvimento de soluções tecnológicas no sul do Brasil, reconhecida pela inovação, qualidade e relacionamento próximo com nossos clientes.",
        companyValues: [
          "Inovação contínua",
          "Qualidade em primeiro lugar",
          "Transparência total",
          "Relacionamento próximo",
          "Resultados mensuráveis",
          "Crescimento sustentável",
        ],
        email: "novocode.tec@gmail.com",
        phone: "(47) 98881-5799",
        whatsapp: "5547988815799",
        address: "Brusque, Santa Catarina - Brasil",
        socialFacebook: "https://facebook.com/novocode",
        socialInstagram: "https://instagram.com/novocode",
        socialLinkedin: "https://linkedin.com/company/novocode",
        socialGithub: "https://github.com/NovoCode-Tec",
        defaultMetaTitle:
          "NOVOCODE - Desenvolvimento Web e Soluções Tecnológicas",
        defaultMetaDescription:
          "Especialistas em desenvolvimento web, mobile e consultoria tecnológica. Transformamos suas ideias em soluções digitais inovadoras.",
        defaultKeywords: [
          "desenvolvimento web",
          "aplicativos mobile",
          "consultoria tecnológica",
          "sistemas web",
          "e-commerce",
          "automação",
          "Brusque",
          "Santa Catarina",
        ],
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        maintenanceMode: false,
        allowRegistration: false,
      },
    });
  }

  console.log("✅ Configurações do site criadas/atualizadas com sucesso!");
}

async function seedTestimonials() {
  console.log("🌱 Populando depoimentos...");

  const testimonials: Array<{
    clientName: string;
    clientEmail: string;
    clientPosition: string;
    clientCompany: string;
    content: string;
    rating: number;
    featured: boolean;
    order: number;
    requestToken: string;
    status: "APPROVED";
    publicationStatus: "PUBLISHED";
  }> = [
    {
      clientName: "Maria Silva",
      clientEmail: "maria@techstart.com",
      clientPosition: "CEO",
      clientCompany: "TechStart Solutions",
      content:
        "A NOVOCODE transformou nossa visão em realidade. O sistema de gestão que desenvolveram revolucionou nossos processos internos e aumentou nossa produtividade em 40%. Equipe técnica excepcional!",
      rating: 5,
      featured: true,
      order: 1,
      requestToken: "token-maria-silva",
      status: "APPROVED" as const,
      publicationStatus: "PUBLISHED" as const,
    },
    {
      clientName: "João Santos",
      clientEmail: "joao@industriacatarinense.com",
      clientPosition: "Diretor de TI",
      clientCompany: "Indústria Catarinense LTDA",
      content:
        "Excelente trabalho na modernização de nosso sistema legado. A migração foi feita sem interrupções e o resultado superou nossas expectativas. Recomendo fortemente!",
      rating: 5,
      featured: true,
      order: 2,
      requestToken: "token-joao-santos",
      status: "APPROVED" as const,
      publicationStatus: "PUBLISHED" as const,
    },
    {
      clientName: "Ana Costa",
      clientEmail: "ana@ecommerceverde.com",
      clientPosition: "Fundadora",
      clientCompany: "E-commerce Verde",
      content:
        "Nossa loja virtual desenvolvida pela NOVOCODE triplicou nossas vendas online. A plataforma é intuitiva, rápida e tem todas as funcionalidades que precisávamos. Suporte sempre presente.",
      rating: 5,
      featured: true,
      order: 3,
      requestToken: "token-ana-costa",
      status: "APPROVED" as const,
      publicationStatus: "PUBLISHED" as const,
    },
    {
      clientName: "Carlos Oliveira",
      clientEmail: "carlos@construtorasul.com",
      clientPosition: "Gerente de Projetos",
      clientCompany: "Construtora Sul",
      content:
        "O aplicativo mobile que desenvolveram para nossos clientes foi um diferencial no mercado. Interface linda e funcionalidades práticas. Projeto entregue no prazo!",
      rating: 5,
      featured: false,
      order: 4,
      requestToken: "token-carlos-oliveira",
      status: "APPROVED" as const,
      publicationStatus: "PUBLISHED" as const,
    },
  ];
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log("✅ Depoimentos criados com sucesso!");
}

async function seedFAQs() {
  console.log("🌱 Populando FAQ...");

  const faqs = [
    {
      question: "Quanto tempo leva para desenvolver um projeto?",
      answer:
        "O tempo varia conforme a complexidade do projeto. Projetos simples levam 2-4 semanas, enquanto sistemas mais complexos podem levar 2-6 meses. Sempre fornecemos um cronograma detalhado na proposta.",
      category: "Prazos",
      order: 1,
    },
    {
      question: "Quais tecnologias vocês utilizam?",
      answer:
        "Trabalhamos com tecnologias modernas como React, Next.js, Node.js, Python, PostgreSQL, MongoDB, React Native, Flutter e muito mais. Escolhemos a melhor stack para cada projeto.",
      category: "Tecnologia",
      order: 2,
    },
    {
      question: "Oferecem suporte pós-entrega?",
      answer:
        "Sim! Todos os nossos projetos incluem garantia e suporte técnico. Oferecemos diferentes planos de manutenção para atender às necessidades específicas de cada cliente.",
      category: "Suporte",
      order: 3,
    },
    {
      question: "Como funciona o processo de desenvolvimento?",
      answer:
        "Seguimos uma metodologia ágil: 1) Análise de requisitos, 2) Prototipagem, 3) Desenvolvimento iterativo, 4) Testes rigorosos, 5) Deploy e treinamento. O cliente acompanha todo o processo.",
      category: "Processo",
      order: 4,
    },
    {
      question: "Trabalham com empresas de que porte?",
      answer:
        "Atendemos desde startups e pequenas empresas até grandes corporações. Nosso foco é entregar soluções adequadas ao orçamento e necessidades de cada cliente.",
      category: "Clientes",
      order: 5,
    },
    {
      question: "É possível fazer alterações durante o desenvolvimento?",
      answer:
        "Sim! Nossa metodologia ágil permite ajustes durante o projeto. Mudanças são discutidas em termos de impacto no prazo e orçamento, sempre com total transparência.",
      category: "Processo",
      order: 6,
    },
  ];
  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
  }

  console.log("✅ FAQ criado com sucesso!");
}

async function main() {
  try {
    await seedSiteConfig();
    await seedTestimonials();
    await seedFAQs();

    console.log("🎉 Seed de configurações concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
