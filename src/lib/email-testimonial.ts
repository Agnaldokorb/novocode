import nodemailer from "nodemailer";

// Verificar se as configurações do Brevo estão definidas
const isBrevoConfigured = () => {
  return !!(
    process.env.BREVO_SMTP_USER &&
    process.env.BREVO_SMTP_PASSWORD &&
    process.env.BREVO_FROM_EMAIL
  );
};

// Configuração do transporter com Brevo
const createBrevoTransporter = () => {
  if (!isBrevoConfigured()) {
    console.warn(
      "⚠️ Configurações do Brevo não encontradas. Verifique as variáveis de ambiente:"
    );
    console.warn("- BREVO_SMTP_USER");
    console.warn("- BREVO_SMTP_PASSWORD");
    console.warn("- BREVO_FROM_EMAIL");
    return null;
  }

  console.log("📧 Configurando transporter Brevo:", {
    host: "smtp-relay.brevo.com",
    port: 587,
    user: process.env.BREVO_SMTP_USER?.substring(0, 5) + "***", // Mascarar email para logs
  });

  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASSWORD,
    },
    // Configurações para melhor compatibilidade
    connectionTimeout: 10000, // 10 segundos
    greetingTimeout: 5000, // 5 segundos
    socketTimeout: 10000, // 10 segundos
  });
};

interface TestimonialEmailData {
  clientName: string;
  clientEmail: string;
  token: string;
  projectName?: string;
  serviceName?: string;
}

// Template HTML para solicitação de depoimento
const getTestimonialRequestTemplate = (data: TestimonialEmailData) => {
  const testimonialUrl = `${process.env.NEXT_PUBLIC_APP_URL}/depoimento/${data.token}`;

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Solicitação de Depoimento - NOVOCODE</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .title {
          color: #1e293b;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .highlight {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          margin: 20px 0;
          transition: transform 0.2s;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }
        .stars {
          color: #fbbf24;
          font-size: 20px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">NOVOCODE</div>
          <p style="color: #64748b;">Tecnologia e Sistemas</p>
        </div>
        
        <h1 class="title">Olá, ${data.clientName}! 👋</h1>
        
        <div class="content">
          <p>Esperamos que esteja tudo bem com você!</p>
          
          <p>Recentemente concluímos ${
            data.projectName
              ? `o projeto "${data.projectName}"`
              : data.serviceName
              ? `o serviço de ${data.serviceName}`
              : "nosso trabalho"
          } para você, e ficamos muito felizes com o resultado alcançado.</p>
          
          <div class="highlight">
            <h3 style="margin: 0 0 10px 0;">🌟 Sua opinião é muito importante para nós!</h3>
            <p style="margin: 0;">Gostaríamos de saber como foi sua experiência trabalhando conosco.</p>
          </div>
          
          <p>Seu depoimento nos ajuda a:</p>
          <ul>
            <li>✅ Melhorar continuamente nossos serviços</li>
            <li>🤝 Ajudar outros clientes a conhecer nosso trabalho</li>
            <li>💪 Fortalecer nossa parceria de longo prazo</li>
          </ul>
          
          <p>Levará apenas alguns minutos e seria uma grande ajuda para nossa empresa!</p>
          
          <div style="text-align: center;">
            <div class="stars">⭐⭐⭐⭐⭐</div>
            <a href="${testimonialUrl}" class="button">
              📝 Deixar Meu Depoimento
            </a>
          </div>
          
          <p><small>💡 <strong>Dica:</strong> Você pode falar sobre a qualidade do trabalho, atendimento, prazos, resultados obtidos, ou qualquer aspecto que considere importante!</small></p>
        </div>
        
        <div class="footer">
          <p><strong>NOVOCODE TECNOLOGIA E SISTEMAS LTDA</strong></p>
          <p>Este link é único e pessoal. Não compartilhe com terceiros.</p>
          <p>Se você não deseja mais receber estes emails, pode ignorar esta mensagem.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template de texto simples para fallback
const getTestimonialRequestText = (data: TestimonialEmailData) => {
  const testimonialUrl = `${process.env.NEXT_PUBLIC_APP_URL}/depoimento/${data.token}`;

  return `
🌟 Solicitação de Depoimento - NOVOCODE

Olá, ${data.clientName}!

Esperamos que esteja tudo bem com você!

Recentemente concluímos ${
    data.projectName
      ? `o projeto "${data.projectName}"`
      : data.serviceName
      ? `o serviço de ${data.serviceName}`
      : "nosso trabalho"
  } para você, e ficamos muito felizes com o resultado alcançado.

Sua opinião é muito importante para nós! Gostaríamos de saber como foi sua experiência trabalhando conosco.

Seu depoimento nos ajuda a:
• Melhorar continuamente nossos serviços
• Ajudar outros clientes a conhecer nosso trabalho
• Fortalecer nossa parceria de longo prazo

Levará apenas alguns minutos e seria uma grande ajuda para nossa empresa!

👉 Deixar depoimento: ${testimonialUrl}

Dica: Você pode falar sobre a qualidade do trabalho, atendimento, prazos, resultados obtidos, ou qualquer aspecto que considere importante!

Atenciosamente,
Equipe NOVOCODE
NOVOCODE TECNOLOGIA E SISTEMAS LTDA

---
Este link é único e pessoal. Não compartilhe com terceiros.
  `.trim();
};

// Função principal para enviar solicitação de depoimento
export async function sendTestimonialRequestEmail(data: TestimonialEmailData) {
  console.log(
    `📧 Iniciando envio de solicitação de depoimento para: ${data.clientEmail}`
  );

  const transporter = createBrevoTransporter();

  if (!transporter) {
    throw new Error("Configurações do Brevo não encontradas");
  }

  try {
    // Verificar conexão primeiro
    console.log("🔗 Verificando conexão com Brevo...");
    await transporter.verify();
    console.log("✅ Conexão com Brevo verificada!");

    const mailOptions = {
      from: `"NOVOCODE" <${process.env.BREVO_FROM_EMAIL}>`,
      to: data.clientEmail,
      subject: "🌟 Sua opinião é importante para nós - NOVOCODE",
      text: getTestimonialRequestText(data),
      html: getTestimonialRequestTemplate(data),
    };

    console.log("📤 Enviando email de solicitação de depoimento...");
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email de solicitação enviado com sucesso!");
    console.log("🆔 Message ID:", result.messageId);
    console.log("📤 Response:", result.response);

    return {
      success: true,
      messageId: result.messageId,
      response: result.response,
    };
  } catch (error) {
    console.error("❌ Erro ao enviar email de solicitação:", error);
    throw error;
  }
}

// Função para enviar lembrete de depoimento
export async function sendTestimonialReminderEmail(data: TestimonialEmailData) {
  console.log(`📧 Enviando lembrete de depoimento para: ${data.clientEmail}`);

  const transporter = createBrevoTransporter();

  if (!transporter) {
    throw new Error("Configurações do Brevo não encontradas");
  }

  try {
    await transporter.verify();

    const mailOptions = {
      from: `"NOVOCODE" <${process.env.BREVO_FROM_EMAIL}>`,
      to: data.clientEmail,
      subject: "🔔 Lembrete: Seu depoimento é importante - NOVOCODE",
      text: getTestimonialRequestText(data),
      html: getTestimonialRequestTemplate(data).replace(
        "Sua opinião é muito importante para nós!",
        "Ainda não recebemos seu depoimento!"
      ),
    };

    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Lembrete de depoimento enviado!");
    console.log("🆔 Message ID:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
      response: result.response,
    };
  } catch (error) {
    console.error("❌ Erro ao enviar lembrete:", error);
    throw error;
  }
}

// Função para testar configuração do email
export async function testBrevoConnection() {
  console.log("🧪 Testando conexão com Brevo...");

  const transporter = createBrevoTransporter();

  if (!transporter) {
    return { success: false, error: "Configurações do Brevo não encontradas" };
  }

  try {
    await transporter.verify();
    console.log("✅ Conexão com Brevo OK!");

    // Enviar email de teste
    const testResult = await transporter.sendMail({
      from: `"NOVOCODE TEST" <${process.env.BREVO_FROM_EMAIL}>`,
      to: "novocode.tec@gmail.com",
      subject: "[TESTE] Sistema de Depoimentos - NOVOCODE",
      html: `
        <h2>🚀 Teste do Sistema de Depoimentos</h2>
        <p>Este é um email de teste para verificar se o sistema está funcionando corretamente.</p>
        <p><strong>Data/Hora:</strong> ${new Date().toLocaleString("pt-BR")}</p>
        <p><strong>Status:</strong> Sistema funcionando ✅</p>
        <hr>
        <p><small>Email enviado automaticamente pelo sistema de testes.</small></p>
      `,
      text: `
        Teste do Sistema de Depoimentos - NOVOCODE
        
        Este é um email de teste para verificar se o sistema está funcionando.
        Data/Hora: ${new Date().toLocaleString("pt-BR")}
        Status: Sistema funcionando ✅
        
        Email enviado automaticamente pelo sistema de testes.
      `,
    });

    console.log("✅ Email de teste enviado!");
    console.log("🆔 Message ID:", testResult.messageId);

    return {
      success: true,
      messageId: testResult.messageId,
      message: "Conexão e envio testados com sucesso!",
    };
  } catch (error) {
    console.error("❌ Erro no teste:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
