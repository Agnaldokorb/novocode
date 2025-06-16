const fs = require('fs');
const path = require('path');

// Lista de arquivos a serem limpos (apenas scripts de teste, não os fontes principais)
const filesToClean = [
  'check-admin-user.js',
  'create-admin-user.js', 
  'update-admin-password.js',
  'check-site-config-full.js',
  'update-site-config-defaults.js',
  'test-improved-site-config.js',
  'test-get-site-config.js',
  'test-site-config-loading.js'
];

// Padrões a serem removidos ou substituídos
const patterns = [
  // Logs com emails
  { regex: /console\.log\([^)]*email[^)]*\);/gi, replacement: '// Email log removed for security' },
  // Logs com dados de usuário específicos
  { regex: /console\.log\([^)]*agnaldokorb[^)]*\);/gi, replacement: '// User data log removed for security' },
  // Logs com emails gmail
  { regex: /console\.log\([^)]*gmail\.com[^)]*\);/gi, replacement: '// Email log removed for security' },
  // Logs com userData completo
  { regex: /console\.log\([^)]*userData[^)]*{[^}]*}[^)]*\);/gi, replacement: '// User data log removed for security' }
];

console.log('🧹 Removendo logs sensíveis dos scripts...\n');

filesToClean.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    patterns.forEach(pattern => {
      if (pattern.regex.test(content)) {
        content = content.replace(pattern.regex, pattern.replacement);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${fileName} - logs sensíveis removidos`);
    } else {
      console.log(`➖ ${fileName} - nenhum log sensível encontrado`);
    }
  } else {
    console.log(`❌ ${fileName} - arquivo não encontrado`);
  }
});

console.log('\n🔒 Limpeza de segurança concluída!');
console.log('📋 Logs sensíveis removidos para proteger dados pessoais.');
