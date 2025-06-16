// Script para corrigir URLs de ícones de tecnologias que estão retornando erro 404
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const iconFixes = [
  {
    name: "AWS",
    newIcon: "https://skillicons.dev/icons?i=aws",
    description: "Corrigir ícone AWS com URL funcional"
  },
  {
    name: "NestJS", 
    newIcon: "https://skillicons.dev/icons?i=nest",
    description: "Corrigir ícone NestJS com URL funcional"
  },
  {
    name: "Tailwind CSS",
    newIcon: "https://skillicons.dev/icons?i=tailwind",
    description: "Corrigir ícone Tailwind CSS com URL funcional"
  }
];

async function fixTechnologyIcons() {
  console.log("🔧 Iniciando correção dos ícones de tecnologias...\n");

  for (const fix of iconFixes) {
    try {
      // Buscar tecnologia pelo nome
      const technology = await prisma.technology.findFirst({
        where: {
          name: {
            contains: fix.name,
            mode: 'insensitive'
          }
        }
      });

      if (technology) {
        // Atualizar o ícone
        await prisma.technology.update({
          where: { id: technology.id },
          data: { icon: fix.newIcon }
        });

        console.log(`✅ ${fix.name}: ${fix.description}`);
        console.log(`   Novo ícone: ${fix.newIcon}\n`);
      } else {
        console.log(`⚠️ ${fix.name}: Tecnologia não encontrada no banco\n`);
      }
    } catch (error) {
      console.error(`❌ Erro ao corrigir ${fix.name}:`, error);
    }
  }

  console.log("🎉 Correção de ícones concluída!");
  console.log("\n📋 Próximos passos:");
  console.log("1. Verificar se os ícones carregam corretamente");
  console.log("2. Testar a página /tecnologias");
  console.log("3. Verificar o console para confirmar que não há mais erros");
}

fixTechnologyIcons()
  .catch((error) => {
    console.error("❌ Erro no script:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
