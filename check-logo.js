const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkLogo() {
  try {
    const config = await prisma.siteConfig.findFirst();
    console.log('📋 Configuração do site encontrada:');
    console.log('- Company Name:', config?.companyName || 'Não definido');
    console.log('- Logo URL:', config?.logo || 'Não definido');
    console.log('- Logo presente:', !!config?.logo);
    
    if (!config?.logo) {
      console.log('\n⚠️ PROBLEMA: Nenhuma logo está configurada no banco de dados!');
      console.log('💡 Solução: Configure uma logo através do painel admin em /admin/settings');
    }
  } catch (error) {
    console.log('❌ Erro ao conectar com banco:', error.message);
    console.log('🔄 Exibindo ícone de código padrão (fallback)');
  } finally {
    await prisma.$disconnect();
  }
}

checkLogo();
