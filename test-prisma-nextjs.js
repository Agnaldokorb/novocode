// Teste do Prisma Client em ambiente Next.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testPrismaInNextJs() {
  console.log('🔍 Testando Prisma Client no contexto Next.js...\n');
  
  // Testar com diferentes configurações
  const configs = [
    {
      name: 'Configuração padrão',
      config: {}
    },
    {
      name: 'Sem log',
      config: { log: [] }
    },
    {
      name: 'Com timeout',
      config: { 
        datasources: {
          db: {
            url: process.env.DATABASE_URL + '&connect_timeout=10'
          }
        }
      }
    },
    {
      name: 'Singleton pattern',
      config: { log: ['error'] }
    }
  ];
  
  for (const { name, config } of configs) {
    console.log(`🧪 Testando: ${name}`);
    
    const prisma = new PrismaClient(config);
    
    try {
      // Simular ambiente Next.js - múltiplas conexões rápidas
      const promises = [
        prisma.user.count(),
        prisma.service.count(),
        prisma.portfolio.count(),
        prisma.technology.count(),
      ];
      
      const results = await Promise.all(promises);
      console.log('✅ Sucesso:', {
        users: results[0],
        services: results[1],
        portfolios: results[2],
        technologies: results[3]
      });
      
      await prisma.$disconnect();
      console.log('🔌 Desconectado com sucesso\n');
      
    } catch (error) {
      console.log('❌ Erro:', error.message);
      if (error.code) console.log('📋 Código:', error.code);
      console.log('');
      
      await prisma.$disconnect();
    }
  }
  
  // Testar padrão singleton
  console.log('🔄 Testando padrão singleton...');
  await testSingletonPattern();
}

// Singleton pattern para evitar múltiplas conexões
let prismaInstance = null;

function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  }
  return prismaInstance;
}

async function testSingletonPattern() {
  try {
    const prisma = getPrismaClient();
    
    // Múltiplas queries simultâneas como no dashboard
    const [users, services, portfolios, technologies] = await Promise.all([
      prisma.user.count(),
      prisma.service.count(),
      prisma.portfolio.count(),
      prisma.technology.count(),
    ]);
    
    console.log('✅ Singleton funcionou:', { users, services, portfolios, technologies });
    
    // Testar queries mais complexas
    const stats = await Promise.all([
      prisma.service.count({ where: { status: "PUBLISHED" } }),
      prisma.portfolio.count({ where: { publicationStatus: "PUBLISHED" } }),
      prisma.service.count({ where: { featured: true } }),
    ]);
    
    console.log('✅ Queries complexas funcionaram:', stats);
    
  } catch (error) {
    console.log('❌ Erro no singleton:', error.message);
  }
}

testPrismaInNextJs().catch(console.error);
