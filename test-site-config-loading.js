const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSiteConfigLoading() {
  try {
    console.log('🔍 Testando carregamento das configurações do site...\n');

    // Simular a função getOrCreateSiteConfig
    let config = await prisma.siteConfig.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    console.log('📋 Config carregada do banco:');
    console.log('=====================================');
    if (config) {
      console.log('🏢 Nome da Empresa:', config.companyName);
      console.log('📝 Descrição:', config.companyDescription);
      console.log('🎯 Missão:', config.companyMission);
      console.log('👁️ Visão:', config.companyVision);
      console.log('💎 Valores:', config.companyValues);
      // Email log removed for security
      console.log('📱 Telefone:', config.phone);
      console.log('💬 WhatsApp:', config.whatsapp);
      console.log('📍 Endereço:', config.address);
      console.log('🔗 LinkedIn:', config.socialLinkedin);
      console.log('🐙 GitHub:', config.socialGithub);
      console.log('📊 Título Meta:', config.defaultMetaTitle);
      console.log('📝 Descrição Meta:', config.defaultMetaDescription);
      console.log('🔑 Palavras-chave:', config.defaultKeywords);
      console.log('🎨 Cor Primária:', config.primaryColor);
      console.log('🎨 Cor Secundária:', config.secondaryColor);
      console.log('🔧 Modo Manutenção:', config.maintenanceMode);
      console.log('👤 Permitir Registro:', config.allowRegistration);
    } else {
      console.log('❌ Nenhuma configuração encontrada no banco');
    }

    console.log('\n=====================================');

    // Verificar se há campos nulos ou vazios
    if (config) {
      console.log('\n🔍 Verificando campos que podem estar vazios:');
      const emptyFields = [];
      
      if (!config.companyDescription) emptyFields.push('companyDescription');
      if (!config.companyMission) emptyFields.push('companyMission');
      if (!config.companyVision) emptyFields.push('companyVision');
      if (!config.email) emptyFields.push('email');
      if (!config.phone) emptyFields.push('phone');
      if (!config.whatsapp) emptyFields.push('whatsapp');
      if (!config.address) emptyFields.push('address');
      if (!config.defaultMetaTitle) emptyFields.push('defaultMetaTitle');
      if (!config.defaultMetaDescription) emptyFields.push('defaultMetaDescription');
      if (!config.primaryColor) emptyFields.push('primaryColor');
      if (!config.secondaryColor) emptyFields.push('secondaryColor');
      if (config.companyValues.length === 0) emptyFields.push('companyValues');
      if (config.defaultKeywords.length === 0) emptyFields.push('defaultKeywords');

      if (emptyFields.length > 0) {
        console.log('⚠️ Campos vazios encontrados:', emptyFields);
      } else {
        console.log('✅ Todos os campos essenciais estão preenchidos');
      }
    }

  } catch (error) {
    console.error('❌ Erro ao testar configurações:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSiteConfigLoading();
