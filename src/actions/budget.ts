"use server";

import nodemailer from "nodemailer";
import { budgetFormSchema, type BudgetFormInput } from "@/lib/schemas";
import { createLeadAction } from "./leads";

// Função para mapear valores do enum para texto legível
const getProjectTypeLabel = (type: string) => {
  const labels = {
    website: "Website Institucional",
    ecommerce: "E-commerce/Loja Virtual",
    sistema: "Sistema de Gestão",
    "mobile-app": "Aplicativo Mobile",
    "api-integracao": "API/Integração",
    consultoria: "Consultoria Técnica",
    manutencao: "Manutenção/Suporte",
    outro: "Outro",
  };
  return labels[type as keyof typeof labels] || type;
};

const getBudgetRangeLabel = (range: string) => {
  const labels = {
    "ate-5k": "Até R$ 5.000",
    "5k-15k": "R$ 5.000 - R$ 15.000",
    "15k-30k": "R$ 15.000 - R$ 30.000",
    "30k-50k": "R$ 30.000 - R$ 50.000",
    "50k-100k": "R$ 50.000 - R$ 100.000",
    "acima-100k": "Acima de R$ 100.000",
    conversar: "Preferir conversar sobre valores",
  };
  return labels[range as keyof typeof labels] || range;
};

const getTimelineLabel = (timeline: string) => {
  const labels = {
    urgente: "Urgente (até 2 semanas)",
    rapido: "Rápido (até 1 mês)",
    normal: "Normal (1-3 meses)",
    flexivel: "Flexível (3-6 meses)",
    "longo-prazo": "Longo prazo (6+ meses)",
    conversar: "Conversar sobre prazo",
  };
  return labels[timeline as keyof typeof labels] || timeline;
};

const getPreferredContactLabel = (contact: string) => {
  const labels = {
    email: "E-mail",
    whatsapp: "WhatsApp",
    telefone: "Telefone",
  };
  return labels[contact as keyof typeof labels] || contact;
};

export async function sendBudgetAction(data: BudgetFormInput) {
  try {
    // Validar dados
    const validatedData = budgetFormSchema.parse(data);

    // Verificar variáveis de ambiente
    const smtpUser = process.env.BREVO_SMTP_USER;
    const smtpPassword = process.env.BREVO_SMTP_PASSWORD;
    const fromEmail = process.env.BREVO_FROM_EMAIL;

    if (!smtpUser || !smtpPassword || !fromEmail) {
      console.error("Variáveis de ambiente SMTP não configuradas");
      return {
        success: false,
        error: "Configuração de email não encontrada",
      };
    } // Configurar transporter do nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Montar o template HTML do email
    const emailHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Solicitação de Orçamento - NOVOCODE</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .title {
            color: #1e293b;
            margin: 0;
            font-size: 24px;
        }
        .section {
            margin-bottom: 30px;
            padding: 25px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        .section-title {
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        .section-content {
            color: #475569;
            line-height: 1.7;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 15px;
        }
        .info-item {
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 5px;
        }
        .info-value {
            color: #6b7280;
        }
        .features-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        .feature-item {
            padding: 10px 15px;
            background: white;
            border-radius: 20px;
            border: 1px solid #d1d5db;
            font-size: 14px;
            text-align: center;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #6b7280;
            font-size: 14px;
        }
        @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; }
            .container { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">NOVOCODE</div>
            <h1 class="title">🚀 Nova Solicitação de Orçamento</h1>
        </div>

        <!-- Dados do Cliente -->
        <div class="section">
            <h2 class="section-title">👤 Dados do Cliente</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Nome:</div>
                    <div class="info-value">${validatedData.name}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${validatedData.email}</div>
                </div>
                ${
                  validatedData.phone
                    ? `
                <div class="info-item">
                    <div class="info-label">Telefone:</div>
                    <div class="info-value">${validatedData.phone}</div>
                </div>
                `
                    : ""
                }
                ${
                  validatedData.company
                    ? `
                <div class="info-item">
                    <div class="info-label">Empresa:</div>
                    <div class="info-value">${validatedData.company}</div>
                </div>
                `
                    : ""
                }
            </div>
        </div>

        <!-- Detalhes do Projeto -->
        <div class="section">
            <h2 class="section-title">💼 Detalhes do Projeto</h2>
            <div class="section-content">
                <div class="info-item" style="margin-bottom: 15px;">
                    <div class="info-label">Nome do Projeto:</div>
                    <div class="info-value" style="font-size: 16px; font-weight: 600;">${
                      validatedData.projectName
                    }</div>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Tipo:</div>
                        <div class="info-value">${getProjectTypeLabel(
                          validatedData.projectType
                        )}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Contato Preferido:</div>
                        <div class="info-value">${getPreferredContactLabel(
                          validatedData.preferredContact
                        )}</div>
                    </div>
                </div>
                <div class="info-item" style="margin-top: 15px;">
                    <div class="info-label">Descrição:</div>
                    <div class="info-value">${
                      validatedData.projectDescription
                    }</div>
                </div>
            </div>
        </div>

        <!-- Funcionalidades -->
        <div class="section">
            <h2 class="section-title">⚙️ Funcionalidades Desejadas</h2>
            <div class="features-list">
                ${validatedData.features
                  .map(
                    (feature) => `<div class="feature-item">${feature}</div>`
                  )
                  .join("")}
            </div>
        </div>

        <!-- Orçamento e Prazo -->
        <div class="section">
            <h2 class="section-title">💰 Orçamento e Prazo</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Faixa de Orçamento:</div>
                    <div class="info-value" style="font-weight: 600;">${getBudgetRangeLabel(
                      validatedData.budgetRange
                    )}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Prazo Desejado:</div>
                    <div class="info-value" style="font-weight: 600;">${getTimelineLabel(
                      validatedData.timeline
                    )}</div>
                </div>
            </div>
        </div>

        ${
          validatedData.preferredTechnologies.length > 0
            ? `
        <!-- Tecnologias -->
        <div class="section">
            <h2 class="section-title">🛠️ Tecnologias Preferidas</h2>
            <div class="features-list">
                ${validatedData.preferredTechnologies
                  .map((tech) => `<div class="feature-item">${tech}</div>`)
                  .join("")}
            </div>
        </div>
        `
            : ""
        }

        <!-- Informações Adicionais -->
        ${
          validatedData.hasExistingWebsite ||
          validatedData.hasDesign ||
          validatedData.additionalInfo
            ? `
        <div class="section">
            <h2 class="section-title">ℹ️ Informações Adicionais</h2>
            <div class="section-content">
                ${
                  validatedData.hasExistingWebsite
                    ? `
                <div class="info-item" style="margin-bottom: 10px;">
                    <div class="info-label">Possui site atual:</div>
                    <div class="info-value">Sim ${
                      validatedData.existingWebsiteUrl
                        ? `- ${validatedData.existingWebsiteUrl}`
                        : ""
                    }</div>
                </div>
                `
                    : ""
                }
                ${
                  validatedData.hasDesign
                    ? `
                <div class="info-item" style="margin-bottom: 10px;">
                    <div class="info-label">Possui design pronto:</div>
                    <div class="info-value">Sim ${
                      validatedData.designFiles
                        ? `- ${validatedData.designFiles}`
                        : ""
                    }</div>
                </div>
                `
                    : ""
                }
                ${
                  validatedData.additionalInfo
                    ? `
                <div class="info-item">
                    <div class="info-label">Informações Adicionais:</div>
                    <div class="info-value">${validatedData.additionalInfo}</div>
                </div>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }        <div class="footer">
            <p><strong>NOVOCODE - Tecnologia e Inovação</strong></p>
            <p>E-mail: novocode.tec@gmail.com | WhatsApp: (11) 99999-9999</p>
            <p>Este é um e-mail automático gerado pelo sistema de orçamentos.</p>
        </div>
    </div>
</body>
</html>
    `;

    // Texto plano como fallback
    const emailText = `
NOVA SOLICITAÇÃO DE ORÇAMENTO - NOVOCODE

=== DADOS DO CLIENTE ===
Nome: ${validatedData.name}
Email: ${validatedData.email}
${validatedData.phone ? `Telefone: ${validatedData.phone}` : ""}
${validatedData.company ? `Empresa: ${validatedData.company}` : ""}

=== DETALHES DO PROJETO ===
Nome do Projeto: ${validatedData.projectName}
Tipo: ${getProjectTypeLabel(validatedData.projectType)}
Descrição: ${validatedData.projectDescription}

=== FUNCIONALIDADES ===
${validatedData.features.join(", ")}

=== ORÇAMENTO E PRAZO ===
Orçamento: ${getBudgetRangeLabel(validatedData.budgetRange)}
Prazo: ${getTimelineLabel(validatedData.timeline)}

=== PREFERÊNCIAS ===
Contato preferido: ${getPreferredContactLabel(validatedData.preferredContact)}
${
  validatedData.preferredTechnologies.length > 0
    ? `Tecnologias preferidas: ${validatedData.preferredTechnologies.join(
        ", "
      )}`
    : ""
}

${
  validatedData.additionalInfo
    ? `=== INFORMAÇÕES ADICIONAIS ===\n${validatedData.additionalInfo}`
    : ""
}

=== MARKETING ===
Aceita receber comunicações: ${validatedData.acceptMarketing ? "Sim" : "Não"}

---
NOVOCODE - Tecnologia e Inovação
E-mail: novocode.tec@gmail.com
    `; // Enviar email
    const info = await transporter.sendMail({
      from: fromEmail,
      to: "novocode.tec@gmail.com",
      subject: `🚀 Nova Solicitação de Orçamento - ${validatedData.projectName}`,
      text: emailText,
      html: emailHTML,
    });

    console.log("Email de orçamento enviado:", info.messageId);

    // Criar lead automaticamente
    try {
      const interestedServices = [];

      // Mapear tipo de projeto para serviços
      if (validatedData.projectType === "website") {
        interestedServices.push("Website Institucional");
      } else if (validatedData.projectType === "ecommerce") {
        interestedServices.push("E-commerce");
      } else if (validatedData.projectType === "sistema") {
        interestedServices.push("Sistema de Gestão");
      } else if (validatedData.projectType === "mobile-app") {
        interestedServices.push("Aplicativo Mobile");
      } else if (validatedData.projectType === "api-integracao") {
        interestedServices.push("API/Integração");
      } else if (validatedData.projectType === "consultoria") {
        interestedServices.push("Consultoria");
      } else {
        interestedServices.push("Desenvolvimento");
      }      await createLeadAction({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        message: `[ORÇAMENTO] ${validatedData.projectName}\n\n${
          validatedData.projectDescription
        }\n\nFuncionalidades: ${validatedData.features.join(
          ", "
        )}\n\nOrçamento: ${getBudgetRangeLabel(validatedData.budgetRange)}\n\nPrazo: ${getTimelineLabel(validatedData.timeline)}${validatedData.additionalInfo ? `\n\nInformações adicionais: ${validatedData.additionalInfo}` : ""}`,
        source: "Website - Formulário de Orçamento",
        interestedServices,
        budget: getBudgetRangeLabel(validatedData.budgetRange),
        timeline: getTimelineLabel(validatedData.timeline),
      });
      console.log(
        "Lead criado automaticamente para orçamento:",
        validatedData.email
      );
    } catch (leadError) {
      console.error("Erro ao criar lead para orçamento:", leadError);
      // Não falha a operação principal se houver erro na criação do lead
    }

    return {
      success: true,
      message: "Solicitação de orçamento enviada com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao enviar solicitação de orçamento:", error);

    if (error instanceof Error && "issues" in error) {
      return {
        success: false,
        error: "Dados inválidos fornecidos",
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor. Tente novamente.",
    };
  }
}
