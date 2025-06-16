-- Script para debugar o usuário admin
-- Execute este SQL no painel do Supabase > SQL Editor

-- 1. Verificar se a tabela users existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'users';

-- 2. Verificar a estrutura da tabela users
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- 3. Verificar todos os usuários na tabela
SELECT id, email, name, role, "isActive", "createdAt", "updatedAt"
FROM users 
ORDER BY "createdAt" DESC;

-- 4. Verificar especificamente o usuário admin
SELECT id, email, name, role, "isActive", "createdAt", "updatedAt"
FROM users 
WHERE email = 'admin@novocode.com.br';

-- 5. Verificar se há duplicatas
SELECT email, COUNT(*) as count
FROM users 
GROUP BY email
HAVING COUNT(*) > 1;

-- 6. Atualizar o usuário admin (caso necessário)
UPDATE users 
SET 
  name = 'Administrador',
  role = 'ADMIN',
  "isActive" = true,
  "updatedAt" = NOW()
WHERE email = 'admin@novocode.com.br';

-- 7. Verificar novamente após atualização
SELECT id, email, name, role, "isActive", "createdAt", "updatedAt"
FROM users 
WHERE email = 'admin@novocode.com.br'; 