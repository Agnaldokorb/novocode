// Script para testar se a logo está configurada corretamente
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testLogo() {
  console.log('🧪 Testando configuração da logo...\n');

  try {
    const siteConfig = await prisma.siteConfig.findFirst();
    
    if (siteConfig) {
      console.log('✅ Configuração encontrada no banco:');
      console.log(`- Nome da empresa: ${siteConfig.companyName}`);
      console.log(`- Logo: ${siteConfig.logo || 'Não configurada'}`);
      
      if (siteConfig.logo) {
        if (siteConfig.logo.includes('supabase.co')) {
          console.log('✅ Logo do Supabase Storage configurada');
        } else {
          console.log('ℹ️ Logo de outra fonte configurada');
        }
      } else {
        console.log('⚠️ Logo não configurada no banco');
      }
    } else {
      console.log('❌ Nenhuma configuração encontrada no banco');
    }
    
  } catch (error) {
    console.log('❌ Erro ao conectar com o banco:', error.message);
    console.log('📋 Fallbacks que serão usados:');
    console.log('- Nome da empresa: NOVOCODE (padrão)');
    console.log('- Logo: https://gdgidcaflispcxwbqnjf.supabase.co/storage/v1/object/public/uploads/logo/novocode-logo.png (padrão)');
    console.log('- Logo SVG local: /novocode-logo.svg (fallback final)');
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n📝 URLs de logo testadas:');
  console.log('1. Logo do banco de dados (se disponível)');
  console.log('2. Logo padrão do Supabase Storage');
  console.log('3. Logo SVG local como fallback final');
  
  console.log('\n🎯 Para testar:');
  console.log('1. Acesse o site e verifique se a logo aparece no header');
  console.log('2. Abra o console do navegador para ver se há erros de carregamento');
  console.log('3. Se a logo não carregar, o ícone de código aparecerá como fallback');
}

testLogo();
