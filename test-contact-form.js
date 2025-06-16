require("dotenv").config();

// Simular as importações do Next.js
global.process.env.NODE_ENV = "development";

// Importar a função de contato
const { sendContactAction } = require("./src/actions/contact.ts");

async function testContactForm() {
  console.log("🧪 Testando formulário de contato completo...\n");

  const testData = {
    name: "João Silva",
    email: "teste@exemplo.com",
    phone: "(11) 99999-9999",
    company: "Teste Empresa LTDA",
    subject: "Teste do Sistema de Contato",
    message:
      "Esta é uma mensagem de teste para verificar se o sistema de contato está funcionando corretamente. O sistema deve criar um lead automaticamente e enviar um email para a equipe da NOVOCODE.",
  };

  console.log("📋 Dados do teste:");
  console.log(JSON.stringify(testData, null, 2));
  console.log("\n📤 Enviando formulário...\n");

  try {
    const result = await sendContactAction(testData);

    console.log("📊 Resultado do envio:");
    console.log("✅ Sucesso:", result.success);
    console.log("📝 Mensagem:", result.message);

    if (result.error) {
      console.log("❌ Erro:", result.error);
    }

    if (result.fieldErrors) {
      console.log("🔍 Erros de campos:", result.fieldErrors);
    }
  } catch (error) {
    console.error("❌ Erro inesperado:", error);
  }
}

testContactForm();
