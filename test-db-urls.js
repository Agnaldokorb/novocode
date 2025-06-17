// Script para tentar diferentes URLs de conexão do Supabase
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const currentUrl = process.env.DATABASE_URL;
console.log('🔍 Testando diferentes configurações de conexão...\n');

// URLs alternativas para testar
const urlVariations = [
  // URL atual (com pooler)
  currentUrl,
  
  // URL direta (sem pooler)
  currentUrl?.replace('pooler.supabase.com', 'supabase.com'),
  
  // URL com parâmetros de SSL
  currentUrl + '&sslmode=require',
  
  // URL com timeout maior
  currentUrl + '&connect_timeout=10&statement_timeout=30000',
  
  // URL sem pooler e com SSL
  currentUrl?.replace('pooler.supabase.com', 'supabase.com') + '&sslmode=require',
];

async function testConnection(url, description) {
  if (!url) return;
  
  console.log(`🧪 Testando: ${description}`);
  console.log(`📍 URL: ${url.replace(/:[^:]*@/, ':***@')}`);
  
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    },
    log: ['error'],
  });

  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ SUCESSO! Conexão estabelecida');
    console.log('📊 Teste query:', result);
    
    // Tentar uma query mais complexa
    const userCount = await prisma.$queryRaw`SELECT COUNT(*) as total FROM users`;
    console.log('👥 Contagem de usuários:', userCount);
    
    return url;
  } catch (error) {
    console.log('❌ FALHOU:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log(''); // linha vazia
  }
  
  return null;
}

async function findWorkingConnection() {
  const testCases = [
    [urlVariations[0], 'URL atual (com pooler)'],
    [urlVariations[1], 'URL direta (sem pooler)'],
    [urlVariations[2], 'URL atual + SSL obrigatório'],
    [urlVariations[3], 'URL atual + timeout estendido'],
    [urlVariations[4], 'URL direta + SSL obrigatório'],
  ];
  
  for (const [url, description] of testCases) {
    const workingUrl = await testConnection(url, description);
    if (workingUrl) {
      console.log('🎉 SOLUÇÃO ENCONTRADA!');
      console.log('💡 Para corrigir definitivamente, substitua no .env:');
      console.log(`DATABASE_URL="${workingUrl}"`);
      return workingUrl;
    }
  }
  
  console.log('⚠️ Nenhuma URL funcionou. Possíveis soluções:');
  console.log('1. Verificar se o projeto Supabase está ativo');
  console.log('2. Regenerar a senha do banco no dashboard Supabase');
  console.log('3. Verificar se há limitações de IP/região');
  console.log('4. Usar apenas API REST (sistema já funciona assim)');
  
  return null;
}

findWorkingConnection().catch(console.error);
