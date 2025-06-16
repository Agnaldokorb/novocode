const { PrismaClient } = require('@prisma/client');

async function disableMaintenance() {
  const prisma = new PrismaClient();
    try {
    const result = await prisma.siteConfig.upsert({
      where: { id: "1" },
      update: { maintenanceMode: false },
      create: { id: "1", maintenanceMode: false }
    });
    
    console.log('✅ Modo de manutenção DESABILITADO');
    console.log('Configuração atual:', result);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

disableMaintenance();
