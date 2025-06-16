const { PrismaClient } = require('@prisma/client');

async function testImprovedGetOrCreateSiteConfig() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testando função getOrCreateSiteConfig melhorada...\n');
    
    // Simular a função melhorada
    let config = await prisma.siteConfig.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    const defaultData = {
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
    };

    if (!config) {
      console.log('❌ Nenhuma configuração encontrada, criando uma nova...');
      config = await prisma.siteConfig.create({
        data: defaultData,
      });
    } else {
      console.log('✅ Configuração existente encontrada');
      console.log('🔍 Verificando se precisa atualizar...');
      
      // Verificar se a configuração existente precisa ser atualizada com valores padrão
      const needsUpdate = 
        !config.companyDescription ||
        !config.email ||
        !config.phone ||
        !config.defaultMetaTitle ||
        config.companyValues.length === 0 ||
        config.defaultKeywords.length === 0;

      console.log(`📋 Precisa atualizar: ${needsUpdate ? 'SIM' : 'NÃO'}`);

      if (needsUpdate) {
        console.log('🔄 Atualizando campos vazios...');
        
        const updateData = {};
        
        if (!config.companyDescription) {
          updateData.companyDescription = defaultData.companyDescription;
          console.log('  ✅ Adicionando companyDescription');
        }
        if (!config.companyMission) {
          updateData.companyMission = defaultData.companyMission;
          console.log('  ✅ Adicionando companyMission');
        }
        if (!config.companyVision) {
          updateData.companyVision = defaultData.companyVision;
          console.log('  ✅ Adicionando companyVision');
        }
        if (config.companyValues.length === 0) {
          updateData.companyValues = defaultData.companyValues;
          console.log('  ✅ Adicionando companyValues');
        }
        if (!config.email) {
          updateData.email = defaultData.email;
          // Email log removed for security
        }
        if (!config.phone) {
          updateData.phone = defaultData.phone;
          console.log('  ✅ Adicionando phone');
        }
        if (!config.whatsapp) {
          updateData.whatsapp = defaultData.whatsapp;
          console.log('  ✅ Adicionando whatsapp');
        }
        if (!config.address) {
          updateData.address = defaultData.address;
          console.log('  ✅ Adicionando address');
        }
        if (!config.socialLinkedin) {
          updateData.socialLinkedin = defaultData.socialLinkedin;
          console.log('  ✅ Adicionando socialLinkedin');
        }
        if (!config.socialGithub) {
          updateData.socialGithub = defaultData.socialGithub;
          console.log('  ✅ Adicionando socialGithub');
        }
        if (!config.defaultMetaTitle) {
          updateData.defaultMetaTitle = defaultData.defaultMetaTitle;
          console.log('  ✅ Adicionando defaultMetaTitle');
        }
        if (!config.defaultMetaDescription) {
          updateData.defaultMetaDescription = defaultData.defaultMetaDescription;
          console.log('  ✅ Adicionando defaultMetaDescription');
        }
        if (config.defaultKeywords.length === 0) {
          updateData.defaultKeywords = defaultData.defaultKeywords;
          console.log('  ✅ Adicionando defaultKeywords');
        }
        if (!config.primaryColor) {
          updateData.primaryColor = defaultData.primaryColor;
          console.log('  ✅ Adicionando primaryColor');
        }
        if (!config.secondaryColor) {
          updateData.secondaryColor = defaultData.secondaryColor;
          console.log('  ✅ Adicionando secondaryColor');
        }

        config = await prisma.siteConfig.update({
          where: { id: config.id },
          data: updateData,
        });
        
        console.log('✅ Atualização concluída!');
      }
    }

    console.log('\n🎯 Resultado final:');
    console.log('=====================================');
    console.log(`Nome da empresa: ${config.companyName}`);
    console.log(`Descrição: ${config.companyDescription}`);
    // Email log removed for security
    console.log(`Telefone: ${config.phone}`);
    console.log(`Valores da empresa: ${config.companyValues.join(', ')}`);
    console.log(`Cor primária: ${config.primaryColor}`);
    console.log(`Keywords: ${config.defaultKeywords.slice(0, 3).join(', ')}...`);
    console.log('=====================================');
    
  } catch (error) {
    console.error('❌ Erro ao testar função:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testImprovedGetOrCreateSiteConfig();
