import { sendContactAction } from "./src/actions/contact";

const testData = {
  name: "João Silva",
  email: "joao.teste@example.com",
  phone: "(11) 99999-9999",
  company: "Empresa Teste",
  subject: "Teste Sistema - Funcionalidade Contato",
  message:
    "Esta é uma mensagem de teste para verificar o funcionamento completo do sistema de contato da NOVOCODE. Deve criar um lead e enviar email.",
};

console.log("🧪 Testando sistema de contato...");
console.log("📋 Dados:", testData);

sendContactAction(testData)
  .then((result) => {
    console.log("\n✅ Resultado:", result);
    if (result.success) {
      console.log("🎉 Sistema funcionando corretamente!");
      console.log("📧 Email enviado ✅");
      console.log("📊 Lead criado ✅");
    } else {
      console.log("❌ Erro encontrado:", result.error);
    }
  })
  .catch((error) => {
    console.error("❌ Erro na execução:", error);
  });
