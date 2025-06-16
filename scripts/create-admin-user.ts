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
    console.log("🚀 Criando usuário administrador...");

    // 1. Criar usuário no Supabase Auth
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

    console.log("✅ Usuário criado no Supabase Auth"); // 2. Criar usuário na tabela users
    const user = await prisma.user.create({
      data: {
        id: authData.user!.id,
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

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        console.log("ℹ️  Usuário já existe no banco de dados");

        // Verificar se existe no Supabase Auth
        const { data: existingUser } = await supabase.auth.admin.listUsers();
        const userExists = existingUser.users.find(
          (u) => u.email === adminEmail
        );

        if (!userExists) {
          console.log(
            "⚠️  Usuário não existe no Supabase Auth. Tentando criar..."
          );

          const { error: createError } = await supabase.auth.admin.createUser({
            email: adminEmail,
            password: adminPassword,
            email_confirm: true,
          });

          if (createError) {
            console.error(
              "❌ Erro ao criar no Supabase Auth:",
              createError.message
            );
          } else {
            console.log("✅ Usuário criado no Supabase Auth");
          }
        }
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
createAdminUser().catch(console.error);
