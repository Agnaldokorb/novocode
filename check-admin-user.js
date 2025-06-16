const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function checkAdminUser() {
  try {
    console.log("🔄 Verificando usuário admin...");

    const adminUser = await prisma.user.findUnique({
      where: { email: "admin@novocode.com.br" },
    });

    if (!adminUser) {
      console.log("❌ Usuário admin não encontrado!");
      return;
    }

    console.log("✅ Usuário admin encontrado:");
    // Email log removed for security
    console.log("👤 Nome:", adminUser.name);
    console.log("🔑 Role:", adminUser.role);
    // Email log removed for security
    console.log("📅 Criado em:", adminUser.createdAt);

    // Testar senha
    const testPassword = "admin123";
    const isPasswordValid = await bcrypt.compare(
      testPassword,
      adminUser.password
    );
    console.log("🔐 Senha 'admin123' válida:", isPasswordValid ? "Sim" : "Não");

    if (!isPasswordValid) {
      console.log("🔄 Atualizando senha para 'admin123'...");
      const hashedPassword = await bcrypt.hash(testPassword, 12);
      await prisma.user.update({
        where: { id: adminUser.id },
        data: { password: hashedPassword },
      });
      console.log("✅ Senha atualizada!");
    }
  } catch (error) {
    console.error("❌ Erro:", error.message);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

checkAdminUser();
