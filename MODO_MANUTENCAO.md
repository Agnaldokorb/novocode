# Sistema de Modo de Manutenção

## Funcionalidades Implementadas

### 1. **Controle pelo Admin**
- Localização: `/admin/settings` → Configurações Avançadas
- Checkbox "Modo de manutenção" com descrição explicativa
- Alerta visual quando ativado explicando o comportamento

### 2. **Middleware de Redirecionamento**
- Localização: `middleware.ts`
- Verifica automaticamente o status no banco de dados
- Redireciona usuários não-admin para `/maintenance`
- **Rotas protegidas durante manutenção:**
  - `/admin/*` - Acesso liberado para administradores
  - `/login` - Login de administradores
  - `/maintenance` - Página de manutenção
  - `/api/*` - APIs necessárias
  - `/_next/*` - Assets do Next.js
  - `/favicon.ico` - Favicon

### 3. **Página de Manutenção**
- Localização: `/maintenance`
- Design responsivo e amigável
- Busca informações reais do site (nome, contatos)
- Fallback para informações padrão
- Link discreto para acesso administrativo

### 4. **Banner de Alerta no Admin**
- Aparece em todas as páginas administrativas quando ativo
- Aviso claro sobre o status de manutenção
- Link direto para desativar nas configurações

### 5. **API de Status**
- Endpoint: `/api/maintenance-status`
- Retorna status atual do modo manutenção
- Usado pelo hook React para verificações client-side

### 6. **Hook React**
- Localização: `src/hooks/use-maintenance-status.ts`
- Permite verificar status em componentes client-side
- Gerencia estados de loading e erro

## Como Usar

### Ativar Modo Manutenção:
1. Acesse `/admin/settings`
2. Role até "Configurações Avançadas"
3. Marque "Modo de manutenção"
4. Clique em "Salvar Configurações"

### Desativar:
1. Mesmos passos, mas desmarque a opção
2. Ou clique no link do banner de alerta

### Verificar Status:
- Visite qualquer página do site (exceto admin)
- Se ativo, será redirecionado para `/maintenance`

## Comportamento Técnico

### Durante Manutenção:
- ✅ Admins: Acesso total ao `/admin`
- ✅ Admins: Podem fazer login normalmente
- ❌ Visitantes: Redirecionados para `/maintenance`
- ❌ Usuários não-admin: Sem acesso ao site público

### Segurança:
- Verificação em middleware (server-side)
- Consulta direta ao banco de dados
- Não depende de cookies ou sessões
- Proteção contra bypass client-side

## Arquivos Modificados/Criados

### Novos Arquivos:
- `src/app/maintenance/page.tsx`
- `src/app/api/maintenance-status/route.ts`
- `src/components/maintenance-banner.tsx`
- `src/hooks/use-maintenance-status.ts`

### Arquivos Modificados:
- `middleware.ts` - Lógica de redirecionamento
- `src/app/admin/layout.tsx` - Banner de alerta
- `src/app/admin/settings/_components/site-config-form.tsx` - UI melhorada

### Schema (já existia):
- Campo `maintenanceMode` na tabela `site_config`

## Customização

### Página de Manutenção:
- Edite `src/app/maintenance/page.tsx`
- Modifique estilos, textos ou layout
- Adicione mais informações dinâmicas

### Rotas Permitidas:
- Edite `maintenanceAllowedRoutes` no `middleware.ts`
- Adicione rotas que devem ficar acessíveis

### Banner de Alerta:
- Customize em `src/components/maintenance-banner.tsx`
- Modifique cores, textos ou comportamento

## Notas Importantes

1. **Performance**: A verificação é feita no middleware, executada apenas uma vez por requisição
2. **Cache**: O Next.js pode cachear a página de manutenção - considere configurar headers apropriados se necessário
3. **SEO**: Durante manutenção, motores de busca verão a página de manutenção
4. **APIs**: APIs permanecem acessíveis - ajuste se necessário para sua aplicação
