import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// URL de exemplo de uma logo que pode estar no Supabase Storage
const LOGO_URL = "https://gdgidcaflispcxwbqnjf.supabase.co/storage/v1/object/public/uploads/logo/novocode-logo.png";

async function configureLogo() {
  try {
    console.log('🔍 Verificando configuração atual...');
    
    let siteConfig = await prisma.siteConfig.findFirst();
    
    if (siteConfig) {
      console.log('✅ Configuração encontrada:');
      console.log('- Logo atual:', siteConfig.logo || 'Não configurada');
      
      // Atualizar com a logo do Supabase Storage
      const updated = await prisma.siteConfig.update({
        where: { id: siteConfig.id },
        data: { 
          logo: LOGO_URL,
          companyName: "NOVOCODE" // Garantir que o nome está correto
        }
      });
      
      console.log('✅ Logo atualizada com sucesso!');
      console.log('- Nova logo:', updated.logo);
      console.log('- Nome da empresa:', updated.companyName);
      
    } else {
      console.log('❌ Nenhuma configuração encontrada. Criando nova...');
      
      const newConfig = await prisma.siteConfig.create({
        data: {
          companyName: "NOVOCODE",
          logo: LOGO_URL,
          companyDescription: "Desenvolvimento de soluções web inovadoras",
          email: "contato@novocode.tech",
          phone: "4733216890",
          whatsapp: "5547988815799",
          address: "Brusque, Santa Catarina, Brasil",
          defaultMetaTitle: "NOVOCODE - Tecnologia e Inovação",
          defaultMetaDescription: "Desenvolvimento de sistemas web, aplicações mobile e soluções tecnológicas personalizadas.",
          defaultKeywords: ["desenvolvimento web", "sistemas", "tecnologia"],
          companyValues: ["Inovação", "Qualidade", "Comprometimento"],
          primaryColor: "#3b82f6",
          secondaryColor: "#8b5cf6",
          maintenanceMode: false,
          allowRegistration: false,
        }
      });
      
      console.log('✅ Configuração criada com sucesso!');
      console.log('- Logo:', newConfig.logo);
      console.log('- Nome:', newConfig.companyName);
    }
    
  } catch (error) {
    console.error('❌ Erro ao configurar logo:', error.message);
    
    if (error.message.includes("Can't reach database")) {
      console.log('💡 Sugestão: Verifique se o banco de dados está acessível');
      console.log('💡 Como alternativa, você pode configurar uma logo padrão no código');
    }
  } finally {
    await prisma.$disconnect();
  }
}

configureLogo();
