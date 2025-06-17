// Script para testar conexão com banco de dados em produção
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    console.log('🔍 Testando conexão com banco de dados...');
    console.log('URL do banco:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':***@'));
    
    // Teste básico de conexão
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Teste de query simples
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query de teste executada:', result);
    
    // Teste de contagem de tabelas
    const userCount = await prisma.user.count();
    console.log('✅ Número de usuários:', userCount);
    
    const serviceCount = await prisma.service.count();
    console.log('✅ Número de serviços:', serviceCount);
    
    const portfolioCount = await prisma.portfolio.count();
    console.log('✅ Número de portfolios:', portfolioCount);
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.error('📝 Detalhes:', error);
    
    // Análise específica do erro
    if (error.message.includes('Can\'t reach database server')) {
      console.error('🔧 Problema: Servidor de banco de dados inacessível');
      console.error('💡 Possíveis causas:');
      console.error('   1. Banco de dados Supabase pausado/inativo');
      console.error('   2. Credenciais de conexão incorretas');
      console.error('   3. Configurações de rede/firewall');
      console.error('   4. Projeto Supabase foi removido/alterado');
    }
    
    if (error.message.includes('password authentication failed')) {
      console.error('🔧 Problema: Falha na autenticação');
      console.error('💡 Verifique as credenciais DATABASE_URL');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection().catch(console.error);
