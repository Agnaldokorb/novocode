import { PrismaClient, ProjectStatus, PublicationStatus } from "@prisma/client";

const prisma = new PrismaClient();

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

    const portfolioItems = [
      {
        title: "Sistema de Gestão para Clínica Médica",
        slug: "sistema-gestao-clinica-medica",
        shortDescription:
          "Sistema completo para gestão de pacientes, consultas e prontuários médicos",
        description:
          "Sistema desenvolvido com Next.js e PostgreSQL para uma clínica médica com gestão completa de pacientes, agendamento de consultas, prontuários eletrônicos e relatórios gerenciais.",
        featured: true,
        status: ProjectStatus.COMPLETED,
        publicationStatus: PublicationStatus.PUBLISHED,
        clientName: "Clínica São Lucas",
        metaTitle: "Sistema de Gestão para Clínica Médica - NOVOCODE",
        metaDescription:
          "Sistema completo desenvolvido para gestão de clínica médica",
        order: 1,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
      },
      {
        title: "E-commerce B2B para Distribuidora",
        slug: "ecommerce-b2b-distribuidora",
        shortDescription:
          "Plataforma e-commerce B2B com gestão de pedidos e catálogo de produtos",
        description:
          "Plataforma e-commerce desenvolvida para vendas B2B com catálogo de produtos, sistema de pedidos e gestão de representantes comerciais.",
        featured: true,
        status: ProjectStatus.COMPLETED,
        publicationStatus: PublicationStatus.PUBLISHED,
        clientName: "Distribuidora Tech Plus",
        metaTitle: "E-commerce B2B para Distribuidora - NOVOCODE",
        metaDescription:
          "Plataforma e-commerce B2B desenvolvida com tecnologias modernas",
        order: 2,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
      },
      {
        title: "App Mobile para Delivery",
        slug: "app-mobile-delivery",
        shortDescription:
          "Aplicativo mobile para delivery com sistema de pedidos em tempo real",
        description:
          "Aplicativo mobile desenvolvido para restaurante com cardápio digital, sistema de pedidos em tempo real, rastreamento de entrega e pagamento integrado.",
        featured: true,
        status: ProjectStatus.COMPLETED,
        publicationStatus: PublicationStatus.PUBLISHED,
        clientName: "Restaurante Sabor & Arte",
        metaTitle: "App Mobile para Delivery - NOVOCODE",
        metaDescription:
          "Aplicativo mobile para delivery desenvolvido com React Native",
        order: 3,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
      },
    ];

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
      }

      // Criar projeto
      const portfolio = await prisma.portfolio.create({
        data: item,
      });

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
