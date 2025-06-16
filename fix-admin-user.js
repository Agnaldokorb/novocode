const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function fixAdminUser() {
  try {
    console.log("🔄 Corrigindo usuário admin...");

    // Deletar usuário existente se houver problema
    await prisma.user.deleteMany({
      where: { email: "admin@novocode.com.br" },
    });
    console.log("🗑️ Usuário admin anterior removido");

    // Criar hash da senha
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("🔐 Hash da senha criado");

    // Criar novo usuário admin
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
    console.log("📧 Email:", adminUser.email);
    console.log("👤 Nome:", adminUser.name);
    console.log("🔑 Role:", adminUser.role);
    console.log("🔐 Senha:", password);
    console.log("\n🎉 Agora você pode fazer login no painel admin!");
  } catch (error) {
    console.error("❌ Erro ao corrigir usuário admin:", error.message);
    console.error("Código:", error.code);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

fixAdminUser();
