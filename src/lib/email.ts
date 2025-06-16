import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

// Configuração do transportador Brevo
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASSWORD,
    },
  });
};

// Função para enviar email
export const sendEmail = async (options: EmailOptions) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"NOVOCODE" <${
        process.env.BREVO_FROM_EMAIL || "noreply@novocode.com.br"
      }>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

// Template para email de contato
export const createContactEmailTemplate = (data: ContactFormData) => {
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
          background: linear-gradient(135deg, #1e40af, #7c3aed);
          color: white;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .content {
          background: #f8fafc;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e2e8f0;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
        }
        .field-label {
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 5px;
        }
        .field-value {
          color: #374151;
        }
        .message-field {
          border-left-color: #7c3aed;
        }
        .footer {
          margin-top: 30px;
          padding: 20px;
          background: #1f2937;
          color: white;
          border-radius: 6px;
          text-align: center;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 Novo Contato Recebido</h1>
        <p>Mensagem enviada através do site NOVOCODE</p>
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

// Função específica para enviar email de contato
export const sendContactEmail = async (data: ContactFormData) => {
  const template = createContactEmailTemplate(data);

  return await sendEmail({
    to: "novocode.tec@gmail.com",
    subject: `[SITE] ${data.subject} - ${data.name}`,
    html: template.html,
    text: template.text,
  });
};
