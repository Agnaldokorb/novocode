// Script para testar se os ícones corrigidos estão funcionando
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testTechnologyIcons() {
  console.log("🧪 Testando ícones de tecnologias corrigidos...\n");

  const problematicTechnologies = ["AWS", "NestJS", "Tailwind CSS"];

  for (const techName of problematicTechnologies) {
    try {
      const technology = await prisma.technology.findFirst({
        where: {
          name: {
            contains: techName,
            mode: 'insensitive'
          }
        }
      });

      if (technology) {
        console.log(`✅ ${technology.name}:`);
        console.log(`   ID: ${technology.id}`);
        console.log(`   Ícone: ${technology.icon}`);
        console.log(`   Cor: ${technology.color}`);
        console.log(`   Status: ${technology.isActive ? 'Ativo' : 'Inativo'}\n`);

        // Verificar se a URL é válida
        if (technology.icon && technology.icon.startsWith('https://skillicons.dev')) {
          console.log(`   ✅ URL corrigida com sucesso - usando Skillicons\n`);
        } else {
          console.log(`   ⚠️ URL ainda não foi corrigida\n`);
        }
      } else {
        console.log(`❌ ${techName}: Não encontrado no banco de dados\n`);
      }
    } catch (error) {
      console.error(`❌ Erro ao buscar ${techName}:`, error);
    }
  }

  // Mostrar estatísticas gerais
  try {
    const totalTechs = await prisma.technology.count();
    const activeTechs = await prisma.technology.count({
      where: { isActive: true }
    });

    console.log("📊 Estatísticas gerais:");
    console.log(`   Total de tecnologias: ${totalTechs}`);
    console.log(`   Tecnologias ativas: ${activeTechs}`);
    console.log(`   Tecnologias inativas: ${totalTechs - activeTechs}\n`);

    console.log("🎉 Teste concluído!");
    console.log("📋 Próximos passos:");
    console.log("1. Reiniciar o servidor de desenvolvimento");
    console.log("2. Acessar /tecnologias para verificar visual");
    console.log("3. Verificar console do navegador para confirmar que não há mais erros");

  } catch (error) {
    console.error("❌ Erro ao buscar estatísticas:", error);
  }
}

testTechnologyIcons()
  .catch((error) => {
    console.error("❌ Erro no teste:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
