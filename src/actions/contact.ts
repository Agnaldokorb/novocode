"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { createLeadAction } from "./leads";

// Schema de validação para o formulário de contato
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      // Regex simples para telefone brasileiro
      return /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[^\d+]/g, ""));
    }, "Formato de telefone inválido"),
  company: z.string().max(100, "Nome da empresa muito longo").optional(),
  subject: z
    .string()
    .min(5, "Assunto deve ter pelo menos 5 caracteres")
    .max(200, "Assunto muito longo"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem muito longa"),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

// Função para criar template de email
const createContactEmailTemplate = (data: ContactFormInput) => {
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
        }
        .footer p {
          margin: 5px 0;
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

export async function sendContactAction(data: ContactFormInput) {
  try {
    // Validar dados
    const validatedData = contactSchema.parse(data);

    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD) {
      console.error("Configurações SMTP não encontradas");
      return {
        success: false,
        error:
          "Serviço de email não configurado. Entre em contato por telefone.",
      };
    }

    // Criar transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    }); // Criar template de email
    const template = createContactEmailTemplate(validatedData);

    // Configurar email
    const mailOptions = {
      from: `"NOVOCODE" <${
        process.env.BREVO_FROM_EMAIL || "noreply@novocode.com.br"
      }>`,
      to: "novocode.tec@gmail.com",
      subject: `[SITE] ${validatedData.subject} - ${validatedData.name}`,
      html: template.html,
      text: template.text,
    }; // Enviar email
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email de contato enviado com sucesso!");
    console.log("📧 Para:", mailOptions.to);
    console.log("📝 Assunto:", mailOptions.subject);
    console.log("🆔 Message ID:", result.messageId);
    console.log("📤 Response:", result.response);

    // Criar lead automaticamente
    try {
      await createLeadAction({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        message: `[CONTATO] ${validatedData.subject}\n\n${validatedData.message}`,
        source: "Website - Formulário de Contato",
        interestedServices: ["Consultoria"],
        budget: undefined,
        timeline: undefined,
      });
      console.log(
        "Lead criado automaticamente para contato:",
        validatedData.email
      );
    } catch (leadError) {
      console.error("Erro ao criar lead para contato:", leadError);
      // Não falha a operação principal se houver erro na criação do lead
    }

    return {
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
        fieldErrors: error.errors.reduce((acc, curr) => {
          if (curr.path[0]) {
            acc[curr.path[0] as string] = curr.message;
          }
          return acc;
        }, {} as Record<string, string>),
      };
    }

    console.error("Erro inesperado:", error);
    return {
      success: false,
      error: "Erro interno. Tente novamente mais tarde.",
    };
  }
}
