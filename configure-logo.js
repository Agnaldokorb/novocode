const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function configureLogo() {
  try {
    // Configurar logo padrão do NOVOCODE
    const logoUrl = '/novocode-logo.svg';
    
    const config = await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        logo: logoUrl,
        companyName: 'NOVOCODE',
      },
      create: {
        id: 1,
        companyName: 'NOVOCODE',
        logo: logoUrl,
        description: 'Desenvolvimento de software profissional',
        keywords: 'desenvolvimento, software, web, aplicações',
        metaTitle: 'NOVOCODE - Desenvolvimento Web Profissional',
        metaDescription: 'Desenvolvimento de sites e sistemas web profissionais com tecnologias modernas.',
        socialImageUrl: logoUrl,
        maintenanceMode: false,
        footerText: '© 2025 NOVOCODE. Todos os direitos reservados.',
        contactEmail: 'contato@novocode.com.br',
        contactPhone: '(11) 99999-9999',
        contactAddress: 'São Paulo, SP'
      }
    });

    console.log('✅ Logo configurada com sucesso!');
    console.log('📋 Configuração atualizada:');
    console.log('- Company Name:', config.companyName);
    console.log('- Logo URL:', config.logo);
    console.log('- Logo presente:', !!config.logo);
    
  } catch (error) {
    console.log('❌ Erro ao configurar logo:', error.message);
    console.log('💡 Verifique se o banco de dados está acessível.');
  } finally {
    await prisma.$disconnect();
  }
}

configureLogo();
