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
    category: "FRONTEND" as TechnologyCategory,
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
    name: "Express.js",
    description: "Framework web minimalista para Node.js",
    category: "BACKEND" as TechnologyCategory,
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    website: "https://expressjs.com",
    order: 11,
  },
  {
    name: "NestJS",
    description:
      "Framework Node.js progressivo para aplicações server-side escaláveis",
    category: "BACKEND" as TechnologyCategory,
    color: "#E0234E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
    website: "https://nestjs.com",
    order: 12,
  },
  {
    name: "Python",
    description: "Linguagem de programação de alto nível",
    category: "BACKEND" as TechnologyCategory,
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    website: "https://www.python.org",
    order: 13,
  },

  // Database
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
    name: "MySQL",
    description: "Sistema de gerenciamento de banco de dados relacional",
    category: "DATABASE" as TechnologyCategory,
    color: "#4479A1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    website: "https://www.mysql.com",
    order: 21,
  },
  {
    name: "MongoDB",
    description: "Banco de dados NoSQL orientado a documentos",
    category: "DATABASE" as TechnologyCategory,
    color: "#47A248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    website: "https://www.mongodb.com",
    order: 22,
  },
  {
    name: "Redis",
    description:
      "Estrutura de dados em memória usada como banco de dados, cache e message broker",
    category: "DATABASE" as TechnologyCategory,
    color: "#DC382D",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    website: "https://redis.io",
    order: 23,
  },

  // Mobile
  {
    name: "React Native",
    description: "Framework para desenvolvimento mobile multiplataforma",
    category: "MOBILE" as TechnologyCategory,
    color: "#61DAFB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    website: "https://reactnative.dev",
    order: 30,
  },
  {
    name: "Flutter",
    description: "Framework UI do Google para desenvolvimento multiplataforma",
    category: "MOBILE" as TechnologyCategory,
    color: "#02569B",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    website: "https://flutter.dev",
    order: 31,
  },

  // Cloud
  {
    name: "AWS",
    description: "Plataforma de serviços de computação em nuvem da Amazon",
    category: "CLOUD" as TechnologyCategory,
    color: "#FF9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com",
    order: 40,
  },
  {
    name: "Vercel",
    description: "Plataforma de deploy e hospedagem para aplicações frontend",
    category: "CLOUD" as TechnologyCategory,
    color: "#000000",
    icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
    website: "https://vercel.com",
    order: 41,
  },
  {
    name: "Supabase",
    description: "Alternativa open source ao Firebase",
    category: "CLOUD" as TechnologyCategory,
    color: "#3ECF8E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    website: "https://supabase.com",
    order: 42,
  },

  // DevOps
  {
    name: "Docker",
    description: "Plataforma de containerização",
    category: "DEVOPS" as TechnologyCategory,
    color: "#2496ED",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    website: "https://www.docker.com",
    order: 50,
  },
  {
    name: "Git",
    description: "Sistema de controle de versão distribuído",
    category: "DEVOPS" as TechnologyCategory,
    color: "#F05032",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    website: "https://git-scm.com",
    order: 51,
  },
  {
    name: "GitHub",
    description:
      "Plataforma de hospedagem de código-fonte com controle de versão Git",
    category: "DEVOPS" as TechnologyCategory,
    color: "#181717",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    website: "https://github.com",
    order: 52,
  },
];

async function seedTechnologies() {
  console.log("🌱 Populando tecnologias...");

  try {
    // Buscar usuário admin para associar as tecnologias
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminUser) {
      console.error(
        "❌ Usuário admin não encontrado. Execute o script de criação do usuário admin primeiro."
      );
      return;
    }

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
      } // Criar tecnologia
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
