// Teste do formulário de contato completo
require("dotenv").config({ path: ".env" });
const nodemailer = require("nodemailer");

// Replicar a função de template do contact.ts
const createContactEmailTemplate = (data) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Novo Contato - NOVOCODE</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .content {
          background: #f8fafc;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        .field-label {
          font-weight: bold;
          color: #1e293b;
          margin-bottom: 5px;
        }
        .field-value {
          color: #475569;
        }
        .message-field {
          border-left-color: #8b5cf6;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📧 Novo Contato Recebido</h1>
        <p>Formulário de contato do site NOVOCODE</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="field-label">👤 Nome:</div>
          <div class="field-value">${data.name}</div>
        </div>
        
        <div class="field">
          <div class="field-label">📧 Email:</div>
          <div class="field-value">${data.email}</div>
        </div>
        
        ${
          data.phone
            ? `
        <div class="field">
          <div class="field-label">📱 Telefone:</div>
          <div class="field-value">${data.phone}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.company
            ? `
        <div class="field">
          <div class="field-label">🏢 Empresa:</div>
          <div class="field-value">${data.company}</div>
        </div>
        `
            : ""
        }
        
        <div class="field">
          <div class="field-label">📝 Assunto:</div>
          <div class="field-value">${data.subject}</div>
        </div>
        
        <div class="field message-field">
          <div class="field-label">💬 Mensagem:</div>
          <div class="field-value">${data.message.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>NOVOCODE - Tecnologia e Inovação</strong></p>
        <p>Este email foi gerado automaticamente pelo formulário de contato do site.</p>
        <p>Responda diretamente para o email do cliente: ${data.email}</p>
      </div>
    </body>
    </html>
  `;

  const text = `
    Novo Contato Recebido - NOVOCODE
    
    Nome: ${data.name}
    Email: ${data.email}
    ${data.phone ? `Telefone: ${data.phone}` : ""}
    ${data.company ? `Empresa: ${data.company}` : ""}
    Assunto: ${data.subject}
    
    Mensagem:
    ${data.message}
    
    ---
    NOVOCODE - Tecnologia e Inovação
    Responda diretamente para: ${data.email}
  `;

  return { html, text };
};

async function testContactForm() {
  console.log("🧪 Testando formulário de contato completo...");

  try {
    // Simular dados do formulário
    const formData = {
      name: "João da Silva",
      email: "joao.teste@gmail.com",
      phone: "(11) 99999-9999",
      company: "Empresa Teste Ltda",
      subject: "Solicitação de desenvolvimento de site",
      message:
        "Olá! Preciso de um site institucional para minha empresa. Gostaria de saber mais sobre os serviços da NOVOCODE.",
    };

    console.log("📝 Dados do formulário:", formData);

    // Configurar transporter igual ao código real
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    // Criar template igual ao código real
    const template = createContactEmailTemplate(formData);

    // Configurar email igual ao código real
    const mailOptions = {
      from: `"NOVOCODE" <${
        process.env.BREVO_FROM_EMAIL || "noreply@novocode.com.br"
      }>`,
      to: "novocode.tec@gmail.com",
      subject: `[SITE] ${formData.subject} - ${formData.name}`,
      html: template.html,
      text: template.text,
    };

    console.log("📤 Configurações do email:");
    console.log("From:", mailOptions.from);
    console.log("To:", mailOptions.to);
    console.log("Subject:", mailOptions.subject);

    // Enviar email
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ SUCESSO! Email do formulário enviado:");
    console.log("Message ID:", result.messageId);
    console.log("Response:", result.response);
    console.log("");
    console.log("🎯 VERIFIQUE:");
    console.log("1. Caixa de entrada: novocode.tec@gmail.com");
    console.log("2. Pasta de spam/lixo eletrônico");
    console.log("3. Filtros de email no Gmail");
    console.log("");
    console.log("📋 RECOMENDAÇÕES:");
    console.log("• Verificar se novocode.tec@gmail.com pode receber emails");
    console.log("• Adicionar no-reply@novocode.com.br aos contatos");
    console.log("• Verificar configurações de spam no Gmail");
  } catch (error) {
    console.error("❌ Erro no teste do formulário:", error);
  }
}

testContactForm();
