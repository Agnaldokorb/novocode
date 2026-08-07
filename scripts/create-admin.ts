import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

loadEnvConfig(process.cwd());

function required(name: string, fallback?: string) {
  const value = process.env[name] ?? (fallback ? process.env[fallback] : undefined);
  if (!value) throw new Error(`Variável obrigatória ausente: ${name}`);
  return value;
}

const url = required("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
const serviceRole = required("SUPABASE_SERVICE_ROLE_KEY");
const connectionString = required("DATABASE_URL", "SUPABASE_DB_URL");
const email = required("ADMIN_EMAIL").toLowerCase();
const password = required("ADMIN_PASSWORD");
const name = required("ADMIN_NAME");

if (password.length < 12) throw new Error("ADMIN_PASSWORD deve ter ao menos 12 caracteres.");

const supabase = createClient(url, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listError) throw listError;
  let authUser = listed.users.find((user) => user.email?.toLowerCase() === email);

  if (!authUser) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: "ADMIN" },
    });
    if (error || !data.user) throw error ?? new Error("Falha ao criar usuário Auth.");
    authUser = data.user;
  } else {
    const { error } = await supabase.auth.admin.updateUserById(authUser.id, {
      password,
      app_metadata: { ...authUser.app_metadata, role: "ADMIN" },
    });
    if (error) throw error;
  }

  await prisma.user.upsert({
    where: { supabaseUserId: authUser.id },
    update: { email, name, role: "ADMIN", active: true, clientId: null },
    create: { supabaseUserId: authUser.id, email, name, role: "ADMIN", active: true },
  });

  console.log(`Administrador preparado com segurança: ${email}`);
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error("Falha ao criar administrador:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
