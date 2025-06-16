const { PrismaClient } = require('@prisma/client');

async function fixSiteConfig() {
  const prisma = new PrismaClient();
  
  try {
    // Buscar todos os registros
    const allConfigs = await prisma.siteConfig.findMany();
    console.log('📊 Total de registros encontrados:', allConfigs.length);
    
    // Excluir todos os registros
    await prisma.siteConfig.deleteMany();
    console.log('🗑️ Todos os registros foram deletados');
    
    // Criar um único registro com manutenção desabilitada
    const result = await prisma.siteConfig.create({
      data: {
        id: "1",
        companyName: "NOVOCODE TECNOLOGIA E SISTEMAS LTDA",
        maintenanceMode: false,
        allowRegistration: false
      }
    });
    
    console.log('✅ Registro único criado:', result);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixSiteConfig();
