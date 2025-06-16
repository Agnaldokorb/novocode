const { PrismaClient } = require('@prisma/client');

async function enableMaintenance() {
  const prisma = new PrismaClient();
  
  try {
    const result = await prisma.siteConfig.update({
      where: { id: "1" },
      data: { maintenanceMode: true }
    });
    
    console.log('🚧 Modo de manutenção HABILITADO');
    console.log('Configuração atual:', result);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

enableMaintenance();
