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

const technologies = [
  // Frontend
  {
    name: "React",
    description:
      "Biblioteca JavaScript para construção de interfaces de usuário",
    category: "FRONTEND" as TechnologyCategory as TechnologyCategory,
    color: "#61DAFB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    website: "https://reactjs.org",
    order: 1,
  },
  {
    name: "Next.js",
    description: "Framework React para produção com SSR e SSG",
    category: "FRONTEND" as TechnologyCategory,
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    website: "https://nextjs.org",
    order: 2,
  },
  {
    name: "TypeScript",
    description: "Superset tipado do JavaScript",
    category: "FRONTEND" as TechnologyCategory,
    color: "#3178C6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    website: "https://www.typescriptlang.org",
    order: 3,
  },
  {
    name: "Tailwind CSS",
    description: "Framework CSS utility-first",
    category: "FRONTEND" as TechnologyCategory,
    color: "#06B6D4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    website: "https://tailwindcss.com",
    order: 4,
  },

  // Backend
  {
    name: "Node.js",
    description: "Runtime JavaScript para servidor",
    category: "BACKEND" as TechnologyCategory,
    color: "#339933",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    website: "https://nodejs.org",
    order: 10,
  },
  {
    name: "PostgreSQL",
    description: "Sistema de gerenciamento de banco de dados objeto-relacional",
    category: "DATABASE" as TechnologyCategory,
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    website: "https://www.postgresql.org",
    order: 20,
  },
  {
    name: "Prisma",
    description: "ORM moderno para Node.js e TypeScript",
    category: "BACKEND" as TechnologyCategory,
    color: "#2D3748",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    website: "https://www.prisma.io",
    order: 11,
  },
  {
    name: "Supabase",
    description: "Alternativa open source ao Firebase",
    category: "CLOUD" as TechnologyCategory,
    color: "#3ECF8E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    website: "https://supabase.com",
    order: 40,
  },
];

async function seedTechnologies() {
  console.log("🌱 Populando tecnologias...");

  try {
    let created = 0;
    let skipped = 0;

    for (const tech of technologies) {
      // Verificar se já existe
      const existing = await prisma.technology.findFirst({
        where: { name: tech.name },
      });

      if (existing) {
        console.log(`⏭️  Tecnologia "${tech.name}" já existe, pulando...`);
        skipped++;
        continue;
      }

      // Criar tecnologia
      await prisma.technology.create({
        data: {
          ...tech,
          slug: generateSlug(tech.name),
        },
      });

      console.log(`✅ Criada: ${tech.name} (${tech.category})`);
      created++;
    }

    console.log(`\n🎉 Concluído!`);
    console.log(`✅ ${created} tecnologias criadas`);
    console.log(`⏭️  ${skipped} tecnologias já existiam`);
    console.log(`📊 Total: ${created + skipped} tecnologias`);
  } catch (error) {
    console.error("❌ Erro ao popular tecnologias:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
seedTechnologies().catch(console.error);
