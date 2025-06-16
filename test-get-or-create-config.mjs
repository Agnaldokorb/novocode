import { getOrCreateSiteConfig } from './src/actions/site-config.js';

async function testGetOrCreateSiteConfig() {
  try {
    console.log('🔍 Testando função getOrCreateSiteConfig...\n');
    
    const config = await getOrCreateSiteConfig();
    
    console.log('📋 Configuração retornada pela função:');
    console.log('=====================================');
    console.log('🏢 Nome da Empresa:', config.companyName);
    console.log('📝 Descrição:', config.companyDescription);
    console.log('🎯 Missão:', config.companyMission);
    console.log('👁️ Visão:', config.companyVision);
    console.log('💎 Valores:', config.companyValues);
    console.log('📧 Email:', config.email);
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
    console.log('=====================================');

    // Verificar tipos
    console.log('\n🔍 Verificando tipos dos dados:');
    console.log('typeof companyDescription:', typeof config.companyDescription);
    console.log('typeof email:', typeof config.email);
    console.log('typeof companyValues:', typeof config.companyValues, '(length:', config.companyValues?.length, ')');
    console.log('typeof defaultKeywords:', typeof config.defaultKeywords, '(length:', config.defaultKeywords?.length, ')');
    
  } catch (error) {
    console.error('❌ Erro ao testar getOrCreateSiteConfig:', error);
  }
}

testGetOrCreateSiteConfig();
