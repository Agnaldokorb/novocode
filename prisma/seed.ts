import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL;
if (!connectionString) throw new Error("Defina DATABASE_URL para executar o seed.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const client = await prisma.client.upsert({
    where: { cpfCnpj: "12345678901" },
    update: {},
    create: {
      name: "Cliente Exemplo",
      email: "cliente.exemplo@example.com",
      phone: "11999999999",
      cpfCnpj: "12345678901",
    },
  });

  await prisma.company.upsert({
    where: { cnpj: "12345678000190" },
    update: { clientId: client.id },
    create: {
      clientId: client.id,
      legalName: "Empresa Exemplo LTDA",
      tradeName: "Empresa Exemplo",
      cnpj: "12345678000190",
      email: "empresa.exemplo@example.com",
    },
  });
}

main()
  .finally(() => prisma.$disconnect())
  .catch((error) => {
    console.error("Falha ao executar seed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
