// Teste rápido da função sendBudgetAction
console.log("🧪 Testando função de orçamento...");

const testData = {
  // Dados pessoais
  name: "João Silva",
  email: "joao.teste@example.com",
  phone: "(11) 99999-9999",
  company: "Empresa Teste LTDA",

  // Dados do projeto
  projectName: "Site Institucional Teste",
  projectType: "website",
  projectDescription:
    "Desenvolvimento de um site institucional moderno e responsivo para apresentar a empresa e seus serviços.",

  // Funcionalidades
  features: ["Design responsivo", "SEO otimizado", "Formulário de contato"],

  // Orçamento e prazo
  budgetRange: "5k-15k",
  timeline: "normal",

  // Preferências
  preferredContact: "email",
  preferredTechnologies: ["React", "Next.js", "Tailwind CSS"],

  // Informações adicionais
  hasExistingWebsite: false,
  hasDesign: false,
  additionalInfo:
    "Preciso de um site profissional para melhorar a presença online da empresa.",

  // Termos
  acceptTerms: true,
  acceptMarketing: false,

  // Campo calculado
  projectGoals: "Aumentar a visibilidade online e gerar mais leads",
};

console.log("📋 Dados do teste:", JSON.stringify(testData, null, 2));
console.log("✅ Dados válidos - pronto para envio!");
