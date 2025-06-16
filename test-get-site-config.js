const { PrismaClient } = require('@prisma/client');

async function testGetOrCreateSiteConfig() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testando função getOrCreateSiteConfig...\n');
    
    // Simular a função getOrCreateSiteConfig
    let config = await prisma.siteConfig.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    console.log('📋 Configuração encontrada no findFirst:');
    console.log(config);

    if (!config) {
      console.log('\n❌ Nenhuma configuração encontrada, criando uma nova...');
      
      config = await prisma.siteConfig.create({
        data: {
          companyName: "NOVOCODE",
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
          maintenanceMode: false,
          allowRegistration: false,
        },
      });
      
      console.log('\n✅ Nova configuração criada:');
      console.log(config);
    } else {
      console.log('\n✅ Configuração existente encontrada, usando ela.');
    }

    console.log('\n🎯 Resultado final da função:');
    console.log('=====================================');
    console.log(`Nome da empresa: ${config.companyName}`);
    console.log(`Descrição: ${config.companyDescription || 'Não definido'}`);
    // Email log removed for security
    console.log(`Telefone: ${config.phone || 'Não definido'}`);
    console.log(`Modo manutenção: ${config.maintenanceMode}`);
    console.log('=====================================');
    
  } catch (error) {
    console.error('❌ Erro ao testar getOrCreateSiteConfig:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testGetOrCreateSiteConfig();
