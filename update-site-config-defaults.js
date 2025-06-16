const { PrismaClient } = require('@prisma/client');

async function updateSiteConfigWithDefaults() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Atualizando configurações do site com valores padrão...\n');
    
    const result = await prisma.siteConfig.update({
      where: { id: "1" },
      data: {
        companyDescription: "Tecnologia e Inovação para o seu negócio",
        companyMission: "Transformar ideias em soluções digitais inovadoras que impulsionam o crescimento dos nossos clientes.",
        companyVision: "Ser referência em desenvolvimento de software e consultoria tecnológica, criando soluções que fazem a diferença.",
        companyValues: [
          "Inovação",
          "Qualidade", 
          "Transparência",
          "Compromisso",
          "Excelência",
        ],
        email: "novocode.tec@gmail.com",
        phone: "(47) 98881-5799",
        whatsapp: "5547988815799",
        address: "Brusque, Santa Catarina, Brasil",
        socialLinkedin: "https://linkedin.com/company/novocode",
        socialGithub: "https://github.com/NovoCode-Tec",
        defaultMetaTitle: "NOVOCODE - Tecnologia e Inovação",
        defaultMetaDescription: "Desenvolvimento de sistemas web, aplicações mobile e soluções tecnológicas personalizadas para empresas de todos os portes.",
        defaultKeywords: [
          "desenvolvimento web",
          "sistemas web", 
          "aplicativos mobile",
          "consultoria tecnológica",
          "desenvolvimento de software",
          "React",
          "Next.js",
          "Node.js",
          "Brusque",
          "Santa Catarina",
        ],
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        // Manter valores existentes para estes campos
        // maintenanceMode: false,
        // allowRegistration: false,
      },
    });
    
    console.log('✅ Configurações atualizadas com sucesso!');
    console.log('=====================================');
    console.log(`Nome da empresa: ${result.companyName}`);
    console.log(`Descrição: ${result.companyDescription}`);
    console.log(`Missão: ${result.companyMission}`);
    // Email log removed for security
    console.log(`Telefone: ${result.phone}`);
    console.log(`WhatsApp: ${result.whatsapp}`);
    console.log(`Valores: ${result.companyValues.join(', ')}`);
    console.log(`Cor primária: ${result.primaryColor}`);
    console.log(`Modo manutenção: ${result.maintenanceMode}`);
    console.log('=====================================');
    
  } catch (error) {
    console.error('❌ Erro ao atualizar configurações:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateSiteConfigWithDefaults();
