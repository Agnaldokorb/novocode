# NovoCode — Portal administrativo e do cliente

Aplicação Next.js 16 com landing page pública, autenticação via Supabase Auth, banco PostgreSQL acessado pelo Prisma 7 e documentos privados no Supabase Storage.

## Requisitos

- Node.js 22 ou superior
- PostgreSQL/Supabase
- Variáveis baseadas em `.env.example`

## Configuração

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run admin:create
npm run dev
```

Para desenvolvimento local com Supabase:

```bash
npx supabase start
```

Use a URL direta retornada pelo CLI como `DATABASE_URL`. O projeto também reconhece os aliases locais `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_DB_URL`, mas produção deve usar os nomes documentados em `.env.example`.

## Variáveis de ambiente

| Variável | Escopo | Finalidade |
| --- | --- | --- |
| `DATABASE_URL` | servidor | conexão PostgreSQL direta usada pelo Prisma |
| `NEXT_PUBLIC_SUPABASE_URL` | público | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | público | chave publicável; pode ser exposta ao navegador |
| `SUPABASE_SERVICE_ROLE_KEY` | servidor somente | criação administrativa de usuários e Storage privado |
| `SUPABASE_DOCUMENTS_BUCKET` | servidor | bucket privado; padrão `client-documents` |
| `ADMIN_EMAIL` | script | e-mail do primeiro administrador |
| `ADMIN_PASSWORD` | script | senha forte do primeiro administrador, mínimo 12 caracteres |
| `ADMIN_NAME` | script | nome do primeiro administrador |

Nunca crie uma variável `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`.

## Primeiro administrador

1. Aplique as migrations.
2. Defina `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_NAME` apenas no ambiente local/segredo de CI.
3. Execute `npm run admin:create`.
4. Remova as três variáveis de bootstrap quando não forem mais necessárias.

O script cria ou atualiza o usuário no Supabase Auth com `app_metadata.role = ADMIN` e sincroniza a identidade interna. Não existe endpoint ou formulário público capaz de conceder o papel ADMIN.

## Criação de clientes

1. Entre em `/admin`.
2. Cadastre o cliente em `/admin/clientes/novo`.
3. Cadastre uma empresa em `/admin/empresas/nova`.
4. Na página de detalhes do cliente, crie o acesso com e-mail e senha temporária.
5. Envie documentos em `/admin/documentos` e contratos em `/admin/contratos`.

O cliente entra em `/login` e é redirecionado para `/portal`. Não há `/signup` nem cadastro público.

## Modelo de dados

- `User`: identidade interna vinculada de forma única ao UUID do Supabase Auth; papel `ADMIN` ou `CLIENT`.
- `Client`: titular dos usuários, empresas, documentos e contratos.
- `Company`: pertence obrigatoriamente a um cliente.
- `Document`: metadados de PDF privado; o binário fica no Storage.
- `Contract`: vigência/status e vínculo opcional com um documento `CONTRATO`.
- `AuditLog`: histórico de ações administrativas e atualizações relevantes.

As exclusões em cascata foram evitadas nas entidades de negócio. Clientes, empresas e usuários usam desativação lógica.

## Segurança

- Toda página e Server Action administrativa chama `requireAdmin()`.
- O portal deriva `clientId` da sessão e nunca de query string ou payload para autorização.
- O download consulta o documento, valida propriedade e gera URL assinada por 60 segundos.
- O bucket `client-documents` é privado e aceita somente PDF de até 10 MB.
- Uploads validam extensão, MIME, tamanho e os bytes iniciais `%PDF-`.
- O `service_role` é importado somente por módulos `server-only`.
- Todas as tabelas públicas possuem RLS; `_prisma_migrations` não tem grants para `anon/authenticated`.
- As políticas do Data API permitem leitura própria para clientes e leitura ampla para ADMIN.
- Mutações são feitas no servidor com Prisma/credenciais administrativas e validação Zod.
- O `proxy` atualiza cookies e bloqueia usuários anônimos; layouts e camada de dados repetem autorização.

## Migrations

- `20260806200000_initial_secure_portal`: entidades, enums, constraints, índices, RLS e bucket privado.
- `20260806202000_optimize_rls_policies`: otimização dos claims de autenticação nas políticas.
- `20260806203000_secure_prisma_migrations`: proteção da tabela técnica de migrations.
- `20260806204000_index_document_uploader`: índice da chave estrangeira de uploader.

Use `npx prisma migrate deploy` em produção. Nunca use `prisma migrate reset` em um banco com dados.

## Qualidade e testes

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx supabase db advisors --local --type all --level warn --fail-on error
```

Os testes unitários cobrem a matriz crítica Cliente A/Cliente B/Admin e contas inativas. Para um ambiente de homologação, complemente com testes de login reais e upload/download usando usuários de teste do Supabase.
