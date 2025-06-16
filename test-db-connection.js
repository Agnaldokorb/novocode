const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("🔄 Testando conexão com o banco de dados...");

    // Teste simples de conexão
    await prisma.$connect();
    console.log("✅ Conexão estabelecida com sucesso!");

    // Teste de query simples
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Query de teste executada:", result);

    // Verificar se as tabelas existem
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log("📋 Tabelas encontradas:", tables.length);
    tables.forEach((table) => console.log(`  - ${table.table_name}`));
  } catch (error) {
    console.error("❌ Erro na conexão:", error.message);
    console.error("Código do erro:", error.code);

    if (error.code === "P1001") {
      console.log("\n🔧 Possíveis soluções:");
      console.log("1. Verificar se o Supabase está ativo");
      console.log("2. Verificar as variáveis de ambiente DATABASE_URL");
      console.log("3. Verificar conectividade de rede");
      console.log("4. Verificar se o projeto Supabase não foi pausado");
    }
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

testConnection();
