// Script para criar dados de exemplo do portfolio
import { PrismaClient, ProjectStatus, PublicationStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Criando dados de exemplo do portfolio...");

    // Buscar ou criar um usuário admin
    let adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          name: "Admin NOVOCODE",
          email: "admin@novocode.com.br",
          role: "ADMIN",
        },
      });
    }

    // Buscar tecnologias existentes
    const technologies = await prisma.technology.findMany({
      take: 6,
    });

    if (technologies.length === 0) {
      console.log(
        "❌ Nenhuma tecnologia encontrada. Execute primeiro o script de tecnologias."
      );
      return;
    }

    // Buscar serviços existentes
    const services = await prisma.service.findMany({
      take: 2,
    });

    // Criar portfolios de exemplo
    const portfolios = [
      {
        title: "Sistema de E-commerce NOVOCODE",
        slug: "sistema-ecommerce-novocode",
        shortDescription:
          "Plataforma completa de e-commerce desenvolvida com Next.js, Node.js e PostgreSQL",
        description:
          "Desenvolvimento de uma plataforma de e-commerce robusta e escalável para vendas online. O projeto incluiu integração com gateways de pagamento, sistema de gestão de estoque, painel administrativo completo e interface responsiva para os clientes.",
        challenge:
          "Criar uma solução de e-commerce que suportasse alto volume de transações e fornecesse uma experiência de usuário excepcional tanto para compradores quanto para administradores.",
        solution:
          "Utilizamos uma arquitetura moderna baseada em Next.js para o frontend, Node.js com Express para a API REST, PostgreSQL como banco de dados principal e Redis para cache. Implementamos autenticação JWT, integração com Stripe para pagamentos e AWS S3 para armazenamento de imagens.",
        results:
          "A plataforma resultou em um aumento de 300% nas vendas online do cliente, redução de 50% no tempo de carregamento das páginas e 98% de disponibilidade do sistema.",
        thumbnail:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        ],
        liveUrl: "https://demo-ecommerce.novocode.com.br",
        repositoryUrl: "https://github.com/NovoCode-Tec/ecommerce-demo",
        clientName: "TechStore Brasil",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-30"),
        duration: "5 meses",
        featured: true,
        status: ProjectStatus.COMPLETED,
        publicationStatus: PublicationStatus.PUBLISHED,
        order: 1,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
        serviceId: services[0]?.id || null,
      },
      {
        title: "App Mobile de Delivery",
        slug: "app-mobile-delivery",
        shortDescription:
          "Aplicativo móvel para delivery de comida com React Native e geolocalização",
        description:
          "Desenvolvimento de um aplicativo móvel completo para delivery de comida, incluindo app para clientes, app para entregadores e painel web para restaurantes. O projeto contemplou geolocalização em tempo real, pagamentos integrados e notificações push.",
        challenge:
          "Criar uma solução mobile que conectasse clientes, restaurantes e entregadores de forma eficiente, com rastreamento em tempo real e interface intuitiva.",
        solution:
          "Desenvolvemos com React Native para apps móveis multiplataforma, Node.js com Socket.io para comunicação em tempo real, MongoDB para dados flexíveis e integração com APIs de geolocalização e pagamento.",
        results:
          "O app foi adotado por mais de 50 restaurantes na primeira semana, com média de 4.8 estrelas nas lojas de apps e redução de 40% no tempo médio de entrega.",
        thumbnail:
          "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
        ],
        liveUrl: "https://app.deliveryfast.com.br",
        clientName: "DeliveryFast",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-08-15"),
        duration: "5.5 meses",
        featured: true,
        status: ProjectStatus.COMPLETED,
        publicationStatus: PublicationStatus.PUBLISHED,
        order: 2,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
        serviceId: services[1]?.id || null,
      },
      {
        title: "Dashboard Analytics Empresarial",
        slug: "dashboard-analytics-empresarial",
        shortDescription:
          "Dashboard interativo para análise de dados empresariais com D3.js e Python",
        description:
          "Criação de um dashboard complexo para análise de dados empresariais, com visualizações interativas, relatórios automatizados e integração com múltiplas fontes de dados. O sistema permite análise em tempo real de KPIs e métricas de negócio.",
        challenge:
          "Transformar grandes volumes de dados empresariais em insights visuais e acionáveis, integrando informações de diferentes sistemas corporativos.",
        solution:
          "Utilizamos React com D3.js para visualizações avançadas, Python com Pandas para processamento de dados, PostgreSQL para data warehouse e Apache Airflow para ETL automatizado.",
        results:
          "O dashboard permitiu uma redução de 60% no tempo de geração de relatórios e auxiliou na tomada de decisões que resultaram em 25% de aumento na eficiência operacional.",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop",
        ],
        repositoryUrl: "https://github.com/NovoCode-Tec/analytics-dashboard",
        clientName: "Corporação Industrial SP",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-11-30"),
        duration: "7 meses",
        featured: false,
        status: ProjectStatus.DEVELOPMENT,
        publicationStatus: PublicationStatus.PUBLISHED,
        order: 3,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
        serviceId: services[0]?.id || null,
      },
    ];

    // Criar cada portfolio
    for (const portfolioData of portfolios) {
      const existingPortfolio = await prisma.portfolio.findUnique({
        where: { slug: portfolioData.slug },
      });

      if (!existingPortfolio) {
        const portfolio = await prisma.portfolio.create({
          data: {
            ...portfolioData,
            technologies: {
              connect: technologies
                .slice(0, 4)
                .map((tech) => ({ id: tech.id })),
            },
          },
        });

        console.log(`✅ Portfolio criado: ${portfolio.title}`);
      } else {
        console.log(`⚠️  Portfolio já existe: ${portfolioData.title}`);
      }
    }

    console.log("🎉 Dados de exemplo do portfolio criados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao criar dados de exemplo:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
