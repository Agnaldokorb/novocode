const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log("🔄 Conectando ao banco de dados...");

    // Verificar se já existe um usuário admin
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      // Email log removed for security
      return;
    }

    // Criar hash da senha
    const password = "admin123"; // Senha padrão
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário admin
    const adminUser = await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@novocode.com.br",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log("✅ Usuário admin criado com sucesso!");
    // Email log removed for security
    console.log("🔑 Senha:", password);
    console.log("⚠️  IMPORTANTE: Altere a senha após o primeiro login!");
  } catch (error) {
    console.error("❌ Erro ao criar usuário admin:", error.message);

    if (error.code === "P1001") {
      console.log("\n🔧 Problema de conectividade com o banco:");
      console.log("1. Verifique se o Supabase está ativo");
      console.log("2. Verifique a variável DATABASE_URL no .env");
      console.log("3. Tente novamente em alguns minutos");
    }
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

createAdminUser();
