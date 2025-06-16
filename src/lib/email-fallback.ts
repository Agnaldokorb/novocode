// Sistema de fallback para envio de emails
// Use este sistema quando o Brevo não estiver configurado ou falhar

interface EmailFallbackData {
  clientName: string;
  clientEmail: string;
  token: string;
  serviceName?: string;
}

// Função para criar notificação manual quando email falha
export const createManualNotification = async (data: EmailFallbackData) => {
  console.log("📝 Criando notificação manual para depoimento:");
  console.log(`Cliente: ${data.clientName}`);
  console.log(`Email: ${data.clientEmail}`);
  console.log(
    `Link: ${process.env.NEXT_PUBLIC_APP_URL}/depoimento/${data.token}`
  );

  // Aqui você pode implementar outras formas de notificação:
  // - Salvar em uma tabela de notificações pendentes
  // - Enviar para um webhook
  // - Criar uma tarefa no sistema de CRM
  // - Notificar administradores via Slack/Discord

  return {
    success: true,
    message:
      "Notificação manual criada. Envie o link manualmente para o cliente.",
    link: `${process.env.NEXT_PUBLIC_APP_URL}/depoimento/${data.token}`,
  };
};

// Template de email para copiar e colar manualmente
export const getManualEmailTemplate = (data: EmailFallbackData) => {
  const testimonialUrl = `${process.env.NEXT_PUBLIC_APP_URL}/depoimento/${data.token}`;

  return {
    subject: "🌟 Sua opinião é importante para nós - NOVOCODE",
    to: data.clientEmail,
    body: `
Olá, ${data.clientName}!

Esperamos que esteja tudo bem com você!

Recentemente concluímos ${
      data.serviceName ? `o serviço de ${data.serviceName}` : "nosso trabalho"
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
    `.trim(),
  };
};

// Função para gerar instruções de envio manual via Brevo
export const getBrevoManualInstructions = (data: EmailFallbackData) => {
  const template = getManualEmailTemplate(data);

  return {
    instructions: `
📧 INSTRUÇÕES PARA ENVIO MANUAL VIA BREVO

1. Acesse: https://app.brevo.com/
2. Vá em "Campaigns" > "Email" > "Create an email campaign"
3. Escolha "One-time campaign"
4. Configure:
   - Para: ${template.to}
   - Assunto: ${template.subject}
   - Conteúdo: (copie o texto abaixo)

5. Cole o conteúdo do email:
${template.body}

6. Envie a campanha

💡 Alternativa: Use o "Transactional" do Brevo para envio direto.
    `,
    template,
  };
};

const emailFallback = {
  createManualNotification,
  getManualEmailTemplate,
  getBrevoManualInstructions,
};

export default emailFallback;
