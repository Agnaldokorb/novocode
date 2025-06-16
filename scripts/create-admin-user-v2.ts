// filepath: c:\dev\sites-novocode\novocode\scripts\create-admin-user.ts
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const adminEmail = "admin@novocode.com.br";
  const adminPassword = "admin123";
  const adminName = "Administrador NOVOCODE";

  try {
    console.log("🚀 Verificando usuário administrador...");

    // 1. Verificar se usuário já existe na tabela users
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      console.log("ℹ️  Usuário já existe na tabela users");
      console.log(`📧 Email: ${existingUser.email}`);
      console.log(`👤 Nome: ${existingUser.name}`);
      console.log(`🛡️ Role: ${existingUser.role}`);
      console.log(`✅ Status: ${existingUser.isActive ? "Ativo" : "Inativo"}`);
      console.log(`🔑 Senha: ${adminPassword}`);
      console.log("\n🌐 Acesse: http://localhost:3000/login");
      return;
    }

    // 2. Verificar se usuário existe no Supabase Auth
    const { data: existingAuthUsers } = await supabase.auth.admin.listUsers();
    let authUserId = existingAuthUsers.users.find(
      (u) => u.email === adminEmail
    )?.id;

    if (!authUserId) {
      console.log("📝 Criando usuário no Supabase Auth...");
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
        });

      if (authError) {
        console.error(
          "❌ Erro ao criar usuário no Supabase Auth:",
          authError.message
        );
        return;
      }

      authUserId = authData.user!.id;
      console.log("✅ Usuário criado no Supabase Auth");
    } else {
      console.log("ℹ️  Usuário já existe no Supabase Auth");
    }

    // 3. Criar usuário na tabela users
    console.log("📝 Criando usuário na tabela users...");
    const user = await prisma.user.create({
      data: {
        id: authUserId,
        email: adminEmail,
        name: adminName,
        role: "ADMIN",
        isActive: true,
      },
    });

    console.log("✅ Usuário criado na tabela users");
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Senha: ${adminPassword}`);
    console.log(`👤 Nome: ${adminName}`);
    console.log(`🛡️ Role: ${user.role}`);
    console.log(`✅ Status: ${user.isActive ? "Ativo" : "Inativo"}`);

    console.log("\n🎉 Usuário administrador criado com sucesso!");
    console.log("🌐 Acesse: http://localhost:3000/login");
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);

    if (error instanceof Error && error.message.includes("Unique constraint")) {
      console.log("ℹ️  Usuário já existe no banco de dados");
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
createAdminUser().catch(console.error);
