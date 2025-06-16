const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    console.log("🔄 Atualizando senha do usuário admin...");

    // Criar hash da nova senha
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("🔐 Hash da nova senha criado");

    // Atualizar usuário admin
    const updatedUser = await prisma.user.update({
      where: { email: "admin@novocode.com.br" },
      data: {
        password: hashedPassword,
        name: "Administrador",
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log("✅ Usuário admin atualizado com sucesso!");
    // Email log removed for security
    console.log("👤 Nome:", updatedUser.name);
    console.log("🔑 Role:", updatedUser.role);
    console.log("🔐 Nova senha:", password);
    console.log("\n🎉 Agora você pode fazer login no painel admin!");
  } catch (error) {
    console.error("❌ Erro ao atualizar usuário admin:", error.message);

    if (error.code === "P2025") {
      console.log("🔄 Usuário não encontrado, criando novo...");

      try {
        const password = "admin123";
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
          data: {
            name: "Administrador",
            email: "admin@novocode.com.br",
            password: hashedPassword,
            role: "ADMIN",
            emailVerified: new Date(),
          },
        });

        console.log("✅ Novo usuário admin criado!");
        // Email log removed for security
        console.log("🔐 Senha:", password);
      } catch (createError) {
        console.error("❌ Erro ao criar usuário:", createError.message);
      }
    }
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

updateAdminPassword();
