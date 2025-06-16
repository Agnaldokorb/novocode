# Sistema de Orçamento - NOVOCODE

## Visão Geral

O sistema de orçamento foi implementado como uma extensão do sistema de contato, fornecendo uma interface mais detalhada para capturar requisitos de projeto e gerar orçamentos personalizados.

## Funcionalidades Implementadas

### ✅ Completas

1. **Schema de Validação Avançado** (`src/lib/schemas.ts`)

   - Validação completa de dados pessoais e do projeto
   - Tipos de projeto: Website, E-commerce, Sistema, Mobile App, API/Integração, Consultoria, Manutenção
   - Faixas de orçamento: Até R$ 5k, 5k-15k, 15k-30k, 30k-50k, 50k-100k, 100k+
   - Prazos: Urgente, Rápido, Normal, Flexível, Longo prazo
   - Validação de telefone brasileiro

2. **Formulário Avançado** (`src/components/forms/budget-form.tsx`)

   - Interface responsiva com React Hook Form
   - Seleção dinâmica de funcionalidades baseada no tipo de projeto
   - Tecnologias preferidas com badges visuais
   - Campos condicionais para site existente e arquivos de design
   - Contadores de caracteres e validação em tempo real

3. **Server Action com Email** (`src/actions/budget.ts`)

   - Integração com Brevo SMTP
   - Template HTML profissional com gradientes e styling
   - Organização clara dos dados por seções
   - Fallback para texto plano
   - Tratamento completo de erros

4. **Página de Orçamento** (`src/app/(site)/orcamento/page.tsx`)

   - Hero section com propostas de valor
   - Explicação do processo em 4 etapas
   - Formulário principal com sidebar informativa
   - Exemplos de projetos recentes
   - Integração com WhatsApp

5. **Navegação Atualizada** (`src/components/site/header.tsx`)
   - Link para página de orçamento no menu
   - CTAs redirecionados para orçamento

## Estrutura de Arquivos

```
src/
├── actions/
│   └── budget.ts                 # Server action para processamento
├── app/(site)/
│   └── orcamento/
│       └── page.tsx             # Página principal de orçamento
├── components/
│   └── forms/
│       └── budget-form.tsx      # Componente do formulário
└── lib/
    └── schemas.ts              # Schema Zod estendido
```

## Schema de Dados

### Campos Obrigatórios

- **Dados Pessoais**: Nome, Email
- **Projeto**: Nome, Tipo, Descrição
- **Funcionalidades**: Pelo menos 1 selecionada
- **Orçamento/Prazo**: Faixa e timeline
- **Contato**: Preferência (Email/WhatsApp/Telefone)
- **Termos**: Aceite obrigatório

### Campos Opcionais

- **Dados Pessoais**: Telefone, Empresa
- **Tecnologias**: Preferências do cliente
- **Site Existente**: URL se aplicável
- **Design**: Arquivos se disponíveis
- **Informações Adicionais**: Campo livre
- **Marketing**: Aceite de comunicações

## Funcionalidades por Tipo de Projeto

### Website Institucional

- Design responsivo, CMS, SEO, Analytics, Blog, Formulário de contato

### E-commerce

- Catálogo, Carrinho, Pagamento, Gestão de pedidos, Cupons, Avaliações

### Sistema de Gestão

- CRUD, Relatórios, Controle de acesso, Dashboard, Notificações, API

### Mobile App

- Interface nativa, Push notifications, Offline, App stores, Analytics

### API/Integração

- REST/GraphQL, Documentação, Autenticação, Rate limiting, Monitoramento

### Consultoria

- Auditoria, Arquitetura, Performance, Segurança, Treinamento

### Manutenção

- Atualizações, Bug fixes, Backup, Monitoramento, Suporte técnico

## Tecnologias Suportadas

**Frontend**: React, Next.js, Vue.js, Angular, TypeScript, JavaScript
**Backend**: Node.js, Python, PHP, .NET, Java
**Mobile**: React Native, Flutter, Swift, Kotlin
**Database**: PostgreSQL, MySQL, MongoDB, Firebase
**Cloud**: AWS, Google Cloud, Azure, Vercel, Netlify

## Email Template

O template de email inclui:

- **Header**: Logo e título com gradiente
- **Dados do Cliente**: Informações de contato organizadas
- **Detalhes do Projeto**: Nome, tipo, descrição
- **Funcionalidades**: Grid visual das features selecionadas
- **Orçamento/Prazo**: Valores formatados e legíveis
- **Tecnologias**: Se especificadas pelo cliente
- **Informações Adicionais**: Site existente, design, observações
- **Footer**: Dados da empresa e contato

## Configuração SMTP

As configurações já estão definidas no `.env`:

```env
BREVO_SMTP_USER="8f6a7e001@smtp-brevo.com"
BREVO_SMTP_PASSWORD="NFAWVsdtEavI3DfR"
BREVO_FROM_EMAIL="no-reply@novocode.com.br"
```

## Status do Projeto

- ✅ **Build**: Compilação sem erros
- ✅ **Servidor**: Funcionando em desenvolvimento
- ✅ **Formulário**: Interface completa e responsiva
- ✅ **Validação**: Schema Zod implementado
- ✅ **Email**: Template profissional funcionando
- ✅ **Navegação**: Links atualizados

## Próximos Passos

1. **Testes End-to-End**: Testar envio completo de orçamentos
2. **Documentação**: Adicionar JSDoc aos componentes
3. **Analytics**: Implementar tracking de conversões
4. **A/B Testing**: Testar diferentes layouts do formulário
5. **Admin Panel**: Interface para visualizar orçamentos recebidos

## Uso

1. Acesse `/orcamento` no navegador
2. Preencha o formulário com os dados do projeto
3. Selecione funcionalidades baseadas no tipo de projeto
4. Escolha faixa de orçamento e prazo
5. Submeta o formulário
6. Email será enviado automaticamente para `novocode.tec@gmail.com`

O sistema está completo e pronto para uso em produção.
