import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkLogo() {
  try {
    console.log('🔍 Verificando configuração da logo...');
    
    const siteConfig = await prisma.siteConfig.findFirst();
    
    if (siteConfig) {
      console.log('✅ Configuração encontrada:');
      console.log('- ID:', siteConfig.id);
      console.log('- Nome do site:', siteConfig.siteName);
      console.log('- Logo:', siteConfig.logo || 'Não configurada');
      console.log('- Modo manutenção:', siteConfig.maintenanceMode);
      console.log('- Criado em:', siteConfig.createdAt);
    } else {
      console.log('❌ Nenhuma configuração encontrada no banco');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error.message);
    console.log('💡 Possível causa: Banco de dados não disponível');
  } finally {
    await prisma.$disconnect();
  }
}

checkLogo();
