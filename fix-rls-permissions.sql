-- Script para configurar permissões RLS da tabela users
-- Execute este SQL no painel do Supabase > SQL Editor

-- 1. Verificar se RLS está habilitado na tabela users
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- 2. Desabilitar RLS temporariamente para permitir acesso (CUIDADO: apenas para desenvolvimento)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 3. OU criar políticas RLS adequadas (opção mais segura)
-- Primeiro, habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Criar política para permitir leitura de usuários autenticados
CREATE POLICY "Allow authenticated users to read users" ON public.users
FOR SELECT
TO authenticated
USING (true);

-- 5. Criar política para permitir que usuários vejam seus próprios dados
CREATE POLICY "Users can view own data" ON public.users
FOR SELECT
TO authenticated
USING (auth.email() = email);

-- 6. Criar política para permitir que admins vejam todos os dados
CREATE POLICY "Admins can view all users" ON public.users
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE email = auth.email() 
    AND role = 'ADMIN' 
    AND "isActive" = true
  )
);

-- 7. Verificar políticas criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'public';

-- 8. Testar acesso (deve retornar o usuário)
SELECT id, email, name, role, "isActive" 
FROM public.users 
WHERE email = 'agnaldokorb@gmail.com'; 