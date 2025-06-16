const { PrismaClient } = require("@prisma/client");

async function checkSiteConfig() {
  const prisma = new PrismaClient();

  try {
    const config = await prisma.siteConfig.findFirst();
    console.log("=== CONFIGURAÇÕES DO SITE ===");

    if (config) {
      console.log("ID:", config.id);
      console.log("Nome da empresa:", config.companyName);
      console.log("Logo:", config.logo);
      console.log("Favicon:", config.favicon);
      console.log("Meta Title:", config.defaultMetaTitle);
      console.log("Meta Description:", config.defaultMetaDescription);
      console.log("Cor primária:", config.primaryColor);
      console.log("Google Analytics:", config.googleAnalyticsId);
      console.log("Facebook Pixel:", config.facebookPixelId);
      console.log("Modo manutenção:", config.maintenanceMode);
    } else {
      console.log("Nenhuma configuração encontrada no banco de dados!");
    }
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSiteConfig();
