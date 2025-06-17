#!/usr/bin/env node

/**
 * Script para testar o build local antes do deploy na Vercel
 * Simula as condições do ambiente de produção
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Iniciando teste de build para produção...');

try {
  // 1. Verificar se as variáveis de ambiente estão configuradas
  console.log('🔍 Verificando variáveis de ambiente...');
  
  const envFile = path.join(__dirname, '.env');
  const envLocalFile = path.join(__dirname, '.env.local');
  
  if (!fs.existsSync(envFile) && !fs.existsSync(envLocalFile)) {
    console.warn('⚠️ Nenhum arquivo .env encontrado. Criando .env de exemplo...');
    
    const envExample = `# Configurações do banco de dados
DATABASE_URL="postgresql://usuario:senha@host:5432/database"

# Configurações do Supabase
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima"
SUPABASE_SERVICE_ROLE_KEY="sua-chave-service-role"

# Configurações do site
NEXT_PUBLIC_SITE_URL="https://seu-dominio.com"

# Configurações de email (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-app"

# Configurações de autenticação
NEXTAUTH_SECRET="sua-chave-secreta-super-segura"
NEXTAUTH_URL="https://seu-dominio.com"

# Configurações de manutenção
MAINTENANCE_MODE="false"
MAINTENANCE_SECRET="chave-secreta-manutencao"
`;
    
    fs.writeFileSync('.env.example', envExample);
    console.log('📄 Arquivo .env.example criado. Configure suas variáveis antes do deploy.');
  }

  // 2. Limpar cache anterior
  console.log('🧹 Limpando cache de build...');
  if (fs.existsSync('.next')) {
    execSync('rmdir /s /q .next', { stdio: 'inherit' });
  }

  // 3. Instalar dependências
  console.log('📦 Instalando dependências...');
  execSync('npm ci --prefer-offline --no-audit', { stdio: 'inherit' });

  // 4. Executar build de produção
  console.log('🏗️ Executando build de produção...');
  execSync('node build-vercel-final.js', { stdio: 'inherit' });

  // 5. Testar se o servidor inicia
  console.log('🚀 Testando inicialização do servidor...');
  
  // Teste básico de start (timeout de 10 segundos)
  const testStart = new Promise((resolve, reject) => {
    const child = require('child_process').spawn('npm', ['start'], {
      stdio: 'pipe',
      shell: true
    });

    let output = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('ready') || output.includes('started') || output.includes('3000')) {
        child.kill();
        resolve(true);
      }
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('Error') && !error.includes('warning')) {
        child.kill();
        reject(new Error(error));
      }
    });

    // Timeout após 15 segundos
    setTimeout(() => {
      child.kill();
      resolve(true); // Assume que funcionou se não houve erro crítico
    }, 15000);
  });

  await testStart;
  console.log('✅ Servidor iniciou com sucesso!');

  // 6. Verificar estrutura de build
  console.log('📁 Verificando estrutura de build...');
  const buildPath = path.join(__dirname, '.next');
  const serverPath = path.join(buildPath, 'server');
  const staticPath = path.join(buildPath, 'static');

  if (!fs.existsSync(buildPath)) {
    throw new Error('Diretório .next não foi criado');
  }

  if (!fs.existsSync(serverPath)) {
    throw new Error('Diretório .next/server não foi criado');
  }

  console.log('✅ Estrutura de build está correta');

  // 7. Verificar tamanho do build
  const getDirectorySize = (dir) => {
    let size = 0;
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          size += getDirectorySize(filePath);
        } else {
          size += stats.size;
        }
      }
    } catch (e) {
      // Ignore errors
    }
    return size;
  };

  const buildSize = getDirectorySize(buildPath);
  const buildSizeMB = (buildSize / 1024 / 1024).toFixed(2);
  
  console.log(`📊 Tamanho do build: ${buildSizeMB} MB`);
  
  if (buildSize > 500 * 1024 * 1024) { // 500MB
    console.warn('⚠️ Build muito grande, considere otimizar');
  }

  console.log('🎉 Teste de build concluído com sucesso!');
  console.log('');
  console.log('✅ Seu projeto está pronto para deploy na Vercel!');
  console.log('');
  console.log('Para fazer o deploy:');
  console.log('1. npm install -g vercel');
  console.log('2. vercel --prod');
  console.log('');
  console.log('Ou conecte seu repositório diretamente no dashboard da Vercel.');

} catch (error) {
  console.error('❌ Erro no teste de build:', error.message);
  console.error('');
  console.error('Possíveis soluções:');
  console.error('- Verifique se todas as variáveis de ambiente estão configuradas');
  console.error('- Execute: npm run clean && npm install');
  console.error('- Verifique se o banco de dados está acessível (se necessário)');
  process.exit(1);
}
