import { PrismaClient, TechnologyCategory } from "@prisma/client";

const prisma = new PrismaClient();

// Função para gerar slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove múltiplos hífens
    .trim();
}

const correctTechnologies = [
  // Frontend
  {
    name: "React",
    description:
      "Biblioteca JavaScript para construção de interfaces de usuário",
    category: "FRONTEND" as TechnologyCategory,
    color: "#61DAFB",
    icon: "⚛️",
    website: "https://reactjs.org",
    order: 1,
  },
  {
    name: "Next.js",
    description: "Framework React para produção com SSR e SSG",
    category: "FRONTEND" as TechnologyCategory,
    color: "#000000",
    icon: "▲",
    website: "https://nextjs.org",
    order: 2,
  },
  {
    name: "TypeScript",
    description: "Superset tipado do JavaScript",
    category: "FRONTEND" as TechnologyCategory,
    color: "#3178C6",
    icon: "🔷",
    website: "https://www.typescriptlang.org",
    order: 3,
  },
  {
    name: "Tailwind CSS",
    description: "Framework CSS utility-first para desenvolvimento rápido",
    category: "FRONTEND" as TechnologyCategory,
    color: "#06B6D4",
    icon: "🎨",
    website: "https://tailwindcss.com",
    order: 4,
  },

  // Backend
  {
    name: "Node.js",
    description: "Runtime JavaScript para servidor",
    category: "BACKEND" as TechnologyCategory,
    color: "#339933",
    icon: "🟢",
    website: "https://nodejs.org",
    order: 10,
  },
  {
    name: "Prisma",
    description: "ORM moderno para Node.js e TypeScript",
    category: "BACKEND" as TechnologyCategory,
    color: "#2D3748",
    icon: "🔺",
    website: "https://www.prisma.io",
    order: 11,
  },

  // Database
  {
    name: "PostgreSQL",
    description: "Sistema de gerenciamento de banco de dados objeto-relacional",
    category: "DATABASE" as TechnologyCategory,
    color: "#336791",
    icon: "🐘",
    website: "https://www.postgresql.org",
    order: 20,
  },

  // Cloud & DevOps
  {
    name: "Supabase",
    description:
      "Plataforma de desenvolvimento open source com auth, database e storage",
    category: "CLOUD" as TechnologyCategory,
    color: "#3ECF8E",
    icon: "⚡",
    website: "https://supabase.com",
    order: 40,
  },
];

async function fixTechnologies() {
  console.log("🔧 Corrigindo dados das tecnologias...");

  try {
    // Primeiro, deletar todas as tecnologias existentes
    await prisma.technology.deleteMany({});
    console.log("✅ Tecnologias antigas removidas");

    // Inserir tecnologias corretas
    let created = 0;

    for (const tech of correctTechnologies) {
      const created_tech = await prisma.technology.create({
        data: {
          ...tech,
          slug: generateSlug(tech.name),
        },
      });

      console.log(`✅ Tecnologia criada: ${created_tech.name}`);
      created++;
    }

    console.log(`\n🎉 Correção concluída! ${created} tecnologias corrigidas.`);
  } catch (error) {
    console.error("❌ Erro ao corrigir tecnologias:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
fixTechnologies();
