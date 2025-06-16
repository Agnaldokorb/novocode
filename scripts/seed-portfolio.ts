import { PrismaClient, ProjectStatus, PublicationStatus } from "@prisma/client";

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const portfolioItems = [
  {
    title: "Sistema de Gestão para Clínica Médica",
    slug: "sistema-gestao-clinica-medica",
    shortDescription:
      "Sistema completo para gestão de pacientes, consultas e prontuários médicos",
    description: `Sistema desenvolvido com Next.js e PostgreSQL para uma clínica médica, incluindo:
    
- Gestão completa de pacientes
- Agendamento de consultas
- Prontuários eletrônicos
- Relatórios gerenciais
- Integração com sistemas de pagamento

O sistema revolucionou a organização da clínica, reduzindo em 60% o tempo gasto com tarefas administrativas.`,
    featured: true,
    status: "COMPLETED" as ProjectStatus,
    publicationStatus: "PUBLISHED" as PublicationStatus,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-30"),
    clientName: "Clínica São Lucas",
    liveUrl: null,
    repositoryUrl: null,
    thumbnail: null,
    gallery: [],
    metaTitle: "Sistema de Gestão para Clínica Médica - NOVOCODE",
    metaDescription:
      "Sistema completo desenvolvido para gestão de clínica médica com Next.js e PostgreSQL",
    keywords: ["sistema médico", "gestão clínica", "next.js", "postgresql"],
    order: 1,
  },
  {
    title: "E-commerce B2B para Distribuidora",
    slug: "ecommerce-b2b-distribuidora",
    shortDescription:
      "Plataforma e-commerce B2B com gestão de pedidos e catálogo de produtos",
    description: `Plataforma e-commerce desenvolvida especificamente para vendas B2B, incluindo:
    
- Catálogo de produtos com preços diferenciados
- Sistema de pedidos com aprovação
- Gestão de representantes comerciais
- Relatórios de vendas em tempo real
- Integração com ERP existente

A plataforma aumentou em 40% as vendas online da distribuidora no primeiro ano.`,
    featured: true,
    status: "COMPLETED" as ProjectStatus,
    publicationStatus: "PUBLISHED" as any,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-07-15"),
    clientName: "Distribuidora Tech Plus",
    liveUrl: null,
    repositoryUrl: null,
    thumbnail: null,
    gallery: [],
    metaTitle: "E-commerce B2B para Distribuidora - NOVOCODE",
    metaDescription:
      "Plataforma e-commerce B2B desenvolvida com tecnologias modernas",
    keywords: ["ecommerce", "b2b", "distribuidora", "vendas online"],
    order: 2,
  },
  {
    title: "App Mobile para Delivery",
    slug: "app-mobile-delivery",
    shortDescription:
      "Aplicativo mobile para delivery com sistema de pedidos em tempo real",
    description: `Aplicativo mobile nativo desenvolvido para restaurante, incluindo:
    
- Cardápio digital interativo
- Sistema de pedidos em tempo real
- Rastreamento de entrega
- Pagamento integrado (PIX, cartão)
- Dashboard administrativo web

O app resultou em 35% de aumento nos pedidos delivery e melhor experiência do cliente.`,
    featured: true,
    status: "COMPLETED" as ProjectStatus,
    publicationStatus: "PUBLISHED" as any,
    startDate: new Date("2024-05-10"),
    endDate: new Date("2024-08-20"),
    clientName: "Restaurante Sabor & Arte",
    liveUrl: null,
    repositoryUrl: null,
    thumbnail: null,
    gallery: [],
    metaTitle: "App Mobile para Delivery - NOVOCODE",
    metaDescription:
      "Aplicativo mobile para delivery desenvolvido com React Native",
    keywords: ["app mobile", "delivery", "react native", "restaurante"],
    order: 3,
  },
];

async function seedPortfolio() {
  console.log("🌱 Populando portfólio...");

  try {
    // Buscar o primeiro usuário admin para associar os projetos
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminUser) {
      console.error(
        "❌ Nenhum usuário admin encontrado. Execute o script de criação de usuário admin primeiro."
      );
      return;
    }

    // Buscar algumas tecnologias para associar aos projetos
    const technologies = await prisma.technology.findMany({
      take: 5,
    });

    let created = 0;
    let skipped = 0;

    for (const item of portfolioItems) {
      // Verificar se já existe
      const existing = await prisma.portfolio.findUnique({
        where: { slug: item.slug },
      });

      if (existing) {
        console.log(`⏭️  Já existe: ${item.title}`);
        skipped++;
        continue;
      } // Criar projeto
      const portfolio = await prisma.portfolio.create({
        data: {
          ...item,
          createdBy: adminUser.id,
          updatedBy: adminUser.id,
        },
      });

      // Associar algumas tecnologias
      if (technologies.length > 0) {
        const selectedTechs = technologies.slice(
          0,
          Math.floor(Math.random() * 3) + 2
        );
        await prisma.portfolio.update({
          where: { id: portfolio.id },
          data: {
            technologies: {
              connect: selectedTechs.map((tech) => ({ id: tech.id })),
            },
          },
        });
      }

      console.log(`✅ Projeto criado: ${portfolio.title}`);
      created++;
    }

    console.log(`\n🎉 Concluído!`);
    console.log(`✅ ${created} projetos criados`);
    console.log(`⏭️  ${skipped} projetos já existiam`);
    console.log(`📊 Total: ${created + skipped} projetos`);
  } catch (error) {
    console.error("❌ Erro ao popular portfólio:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPortfolio();
