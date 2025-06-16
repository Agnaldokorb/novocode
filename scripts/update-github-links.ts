import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateGitHubLinks() {
  console.log("🔄 Atualizando links do GitHub no banco de dados...");

  try {
    // Buscar portfolios com repositoryUrl antigo
    const portfoliosWithOldLinks = await prisma.portfolio.findMany({
      where: {
        repositoryUrl: {
          contains: "github.com/novocode",
        },
      },
      select: {
        id: true,
        title: true,
        repositoryUrl: true,
      },
    });

    console.log(
      `📊 Encontrados ${portfoliosWithOldLinks.length} projetos com links antigos do GitHub`
    );

    // Atualizar cada portfolio individualmente
    for (const portfolio of portfoliosWithOldLinks) {
      if (portfolio.repositoryUrl) {
        const newUrl = portfolio.repositoryUrl.replace(
          "github.com/novocode",
          "github.com/NovoCode-Tec"
        );

        await prisma.portfolio.update({
          where: { id: portfolio.id },
          data: { repositoryUrl: newUrl },
        });

        console.log(`✅ Atualizado: ${portfolio.title}`);
        console.log(`   Antigo: ${portfolio.repositoryUrl}`);
        console.log(`   Novo: ${newUrl}`);
      }
    }

    // Verificar se há outros campos que podem ter links antigos
    const siteConfigsWithOldLinks = await prisma.siteConfig.findMany({
      where: {
        socialGithub: {
          contains: "github.com/novocode",
        },
      },
    });

    if (siteConfigsWithOldLinks.length > 0) {
      console.log(
        `📊 Encontradas ${siteConfigsWithOldLinks.length} configurações de site com links antigos`
      );

      for (const config of siteConfigsWithOldLinks) {
        if (config.socialGithub) {
          const newUrl = config.socialGithub.replace(
            "github.com/novocode",
            "github.com/NovoCode-Tec"
          );

          await prisma.siteConfig.update({
            where: { id: config.id },
            data: { socialGithub: newUrl },
          });

          console.log(`✅ Configuração atualizada:`);
          console.log(`   Antigo: ${config.socialGithub}`);
          console.log(`   Novo: ${newUrl}`);
        }
      }
    }

    console.log("🎉 Todos os links do GitHub foram atualizados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao atualizar links:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
updateGitHubLinks();
