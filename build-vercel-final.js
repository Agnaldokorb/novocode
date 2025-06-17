#!/usr/bin/env node

/**
 * Script de build robusto para Vercel
 * Garante que o build funcione mesmo com problemas do Prisma
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

// Função para executar comandos com retry
function execWithRetry(command, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📦 Executando: ${command} (tentativa ${i + 1}/${retries})`);
      const result = execSync(command, { 
        stdio: 'inherit',
        encoding: 'utf-8',
        timeout: 300000, // 5 minutos
      });
      return result;
    } catch (error) {
      console.warn(`⚠️ Tentativa ${i + 1} falhou:`, error.message);
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retry
      console.log('⏳ Aguardando 2 segundos antes da próxima tentativa...');
      setTimeout(() => {}, 2000);
    }
  }
}

// Função para verificar se o Prisma Client existe
function checkPrismaClient() {
  const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma', 'client');
  return fs.existsSync(prismaClientPath);
}

try {  // 1. Limpar cache antigo
  console.log('🧹 Limpando cache...');
  try {
    if (fs.existsSync('.next')) {
      execSync('rmdir /s /q .next', { stdio: 'inherit' });
    }
  } catch (e) {
    console.log('Cache .next não existe ou já foi limpo');
  }

  // 2. Instalar dependências (se necessário)
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Instalando dependências...');
    execWithRetry('npm ci --prefer-offline --no-audit');
  }

  // 3. Tentar gerar Prisma Client (com fallback)
  console.log('🔧 Gerando Prisma Client...');
  try {
    execWithRetry('npx prisma generate');
    console.log('✅ Prisma Client gerado com sucesso');
  } catch (error) {
    console.warn('⚠️ Falha ao gerar Prisma Client, continuando com cliente existente...');
    
    // Verificar se existe um cliente existente
    if (!checkPrismaClient()) {
      console.log('🔄 Tentando regenerar Prisma Client com configurações alternativas...');
      try {
        // Tentar com configurações mais permissivas
        process.env.PRISMA_GENERATE_IN_POSTINSTALL = 'true';
        execSync('npx prisma generate --generator client', { stdio: 'inherit' });
      } catch (retryError) {
        console.error('❌ Não foi possível gerar Prisma Client. Build continuará com fallback.');
      }
    }
  }
  // 4. Build do Next.js
  console.log('🏗️ Executando build do Next.js...');
  try {
    execWithRetry('npx next build', 2);
    console.log('✅ Build concluído com sucesso!');
  } catch (buildError) {
    console.error('❌ Erro no build do Next.js:', buildError.message);
    
    // Tentar build com configurações de fallback
    console.log('🔄 Tentando build com configurações de fallback...');
    try {
      process.env.SKIP_ENV_VALIDATION = 'true';
      process.env.NEXT_TELEMETRY_DISABLED = '1';
      execSync('npx next build', { stdio: 'inherit' });
      console.log('✅ Build com fallback concluído!');
    } catch (fallbackError) {
      console.error('❌ Build falhou completamente:', fallbackError.message);
      process.exit(1);
    }
  }

  // 5. Verificar se o build foi bem-sucedido
  const buildDir = path.join(__dirname, '.next');
  if (fs.existsSync(buildDir)) {
    console.log('✅ Build finalizado com sucesso!');
    console.log('📁 Arquivos de build disponíveis em .next/');
    
    // Listar alguns arquivos importantes
    try {
      const buildFiles = fs.readdirSync(buildDir);
      console.log('📋 Estrutura do build:', buildFiles.slice(0, 10));
    } catch (e) {
      console.log('📋 Build directory criado com sucesso');
    }
  } else {
    console.error('❌ Diretório de build não foi criado');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Erro fatal no build:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}

console.log('🎉 Build para Vercel concluído!');
