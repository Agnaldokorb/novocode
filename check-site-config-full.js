const { PrismaClient } = require('@prisma/client');

async function checkSiteConfig() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Verificando todas as configurações do site...\n');
    
    // Buscar todas as configurações
    const siteConfig = await prisma.siteConfig.findFirst();
    
    if (!siteConfig) {
      console.log('❌ Nenhuma configuração encontrada no banco de dados');
      return;
    }
    
    console.log('📋 Configurações completas do site:');
    console.log('=====================================');
    
    console.log(`🏢 Empresa:`);
    console.log(`  - Nome: ${siteConfig.companyName || 'Não definido'}`);
    console.log(`  - Descrição: ${siteConfig.companyDescription || 'Não definido'}`);
    console.log(`  - Missão: ${siteConfig.companyMission || 'Não definido'}`);
    console.log(`  - Visão: ${siteConfig.companyVision || 'Não definido'}`);
    console.log(`  - Valores: ${siteConfig.companyValues?.length > 0 ? siteConfig.companyValues.join(', ') : 'Não definido'}`);
    
    console.log(`\n📧 Contato:`);
    // Email log removed for security
    console.log(`  - Telefone: ${siteConfig.phone || 'Não definido'}`);
    console.log(`  - WhatsApp: ${siteConfig.whatsapp || 'Não definido'}`);
    console.log(`  - Endereço: ${siteConfig.address || 'Não definido'}`);
    
    console.log(`\n🔗 Redes Sociais:`);
    console.log(`  - Facebook: ${siteConfig.socialFacebook || 'Não definido'}`);
    console.log(`  - Instagram: ${siteConfig.socialInstagram || 'Não definido'}`);
    console.log(`  - LinkedIn: ${siteConfig.socialLinkedin || 'Não definido'}`);
    console.log(`  - Twitter: ${siteConfig.socialTwitter || 'Não definido'}`);
    console.log(`  - GitHub: ${siteConfig.socialGithub || 'Não definido'}`);
    
    console.log(`\n🎨 Aparência:`);
    console.log(`  - Logo: ${siteConfig.logo || 'Não definido'}`);
    console.log(`  - Favicon: ${siteConfig.favicon || 'Não definido'}`);
    console.log(`  - Cor Primária: ${siteConfig.primaryColor || 'Não definido'}`);
    console.log(`  - Cor Secundária: ${siteConfig.secondaryColor || 'Não definido'}`);
    
    console.log(`\n🔧 Sistema:`);
    console.log(`  - Modo Manutenção: ${siteConfig.maintenanceMode ? '🚧 ATIVO' : '✅ INATIVO'}`);
    console.log(`  - Permitir Registro: ${siteConfig.allowRegistration ? '✅ SIM' : '❌ NÃO'}`);
    
    console.log(`\n📊 Analytics:`);
    console.log(`  - Google Analytics: ${siteConfig.googleAnalyticsId || 'Não definido'}`);
    console.log(`  - Facebook Pixel: ${siteConfig.facebookPixelId || 'Não definido'}`);
    
    console.log(`\n🔍 SEO:`);
    console.log(`  - Título Padrão: ${siteConfig.defaultMetaTitle || 'Não definido'}`);
    console.log(`  - Descrição Padrão: ${siteConfig.defaultMetaDescription || 'Não definido'}`);
    console.log(`  - Palavras-chave: ${siteConfig.defaultKeywords?.length > 0 ? siteConfig.defaultKeywords.join(', ') : 'Não definido'}`);
    
    console.log(`\n📅 Timestamps:`);
    console.log(`  - Criado em: ${siteConfig.createdAt}`);
    console.log(`  - Atualizado em: ${siteConfig.updatedAt}`);
    
    console.log('\n=====================================');
    
  } catch (error) {
    console.error('❌ Erro ao buscar configurações:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSiteConfig();
