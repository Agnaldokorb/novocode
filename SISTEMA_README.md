# NOVOCODE - Sistema de Gestão de Conteúdo

Sistema completo para gerenciamento do site da **NOVOCODE TECNOLOGIA E SISTEMAS LTDA**, desenvolvido com as melhores tecnologias modernas.

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **PostgreSQL** (Supabase)
- **Prisma ORM**
- **React Hook Form**
- **Zod** (Validação)
- **Supabase Auth**
- **dayjs** (Manipulação de datas)
- **react-number-format** (Máscaras)

## 🗄️ Estrutura do Banco de Dados

O sistema possui os seguintes modelos principais:

### Principais Entidades

- **User** - Usuários administradores do sistema
- **Service** - Serviços oferecidos pela empresa
- **Portfolio** - Projetos e cases de sucesso
- **Technology** - Tecnologias utilizadas nos projetos
- **BlogPost** - Artigos e posts do blog
- **Lead** - Contatos e propostas de clientes
- **Testimonial** - Depoimentos e avaliações
- **FAQ** - Perguntas frequentes
- **SiteConfig** - Configurações gerais do site

### Funcionalidades por Módulo

#### 🛡️ Serviços

- ✅ CRUD completo de serviços
- ✅ Categorização por tipo (Development, Consulting, etc.)
- ✅ Status de publicação (Draft, Published, Archived)
- ✅ Sistema de destaque (featured)
- ✅ SEO otimizado (meta tags, keywords)
- ✅ Galeria de imagens
- ✅ Relacionamento com tecnologias
- ✅ Características (features, benefits, deliverables)

#### 📁 Portfólio

- ✅ CRUD completo de projetos
- ✅ Status do projeto (Planning, Development, Completed, etc.)
- ✅ Informações do cliente
- ✅ Tecnologias utilizadas
- ✅ Links (live URL, repositório)
- ✅ Métricas (team size, duration, complexity)
- ✅ Challenge, Solution e Results
- ✅ Galeria de screenshots

#### ⚙️ Tecnologias

- ✅ CRUD completo de tecnologias
- ✅ Categorização (Frontend, Backend, Database, etc.)
- ✅ Ícones e cores personalizadas
- ✅ Links para documentação oficial

#### 📝 Blog

- ✅ CRUD completo de posts
- ✅ Sistema de categorias e tags
- ✅ Cálculo automático de tempo de leitura
- ✅ Status de publicação
- ✅ SEO otimizado

#### 📊 Leads

- ✅ Captura de contatos
- ✅ Status de follow-up
- ✅ Serviços de interesse
- ✅ Informações de orçamento e prazo

#### 💬 Depoimentos

- ✅ Sistema de avaliações (1-5 estrelas)
- ✅ Relacionamento com projetos/serviços
- ✅ Informações do cliente

#### ❓ FAQ

- ✅ Perguntas e respostas
- ✅ Categorização
- ✅ Ordenação personalizada

#### ⚙️ Configurações do Site

- ✅ Informações da empresa
- ✅ Dados de contato
- ✅ Redes sociais
- ✅ SEO padrão
- ✅ Cores do tema
- ✅ Analytics

## 🚀 Como Usar

### 1. Configuração Inicial

1. **Configure o banco de dados Supabase:**

   ```env
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
   ```

2. **Execute as migrações do Prisma:**

   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

### 2. Acessando o Painel Admin

Acesse `http://localhost:3000/admin` para gerenciar o conteúdo do site.

### 3. Estrutura de Pastas

```
src/
├── actions/           # Server Actions para CRUD
├── app/              # Páginas Next.js (App Router)
│   ├── admin/        # Painel administrativo
│   └── ...
├── components/       # Componentes React
│   ├── forms/        # Formulários
│   └── ui/           # Componentes UI (shadcn)
├── lib/              # Utilitários e configurações
│   ├── prisma.ts     # Cliente Prisma
│   ├── supabase.ts   # Cliente Supabase
│   ├── schemas.ts    # Schemas Zod
│   └── utils.ts      # Funções utilitárias
└── types/            # Tipos TypeScript
```

## 📋 Funcionalidades Implementadas

### ✅ Sistema de Gerenciamento

- [x] CRUD de Serviços
- [x] CRUD de Portfólio
- [x] CRUD de Tecnologias
- [x] CRUD de Blog Posts
- [x] CRUD de Leads
- [x] CRUD de Depoimentos
- [x] CRUD de FAQ
- [x] Configurações do Site

### ✅ Validação e Segurança

- [x] Validação com Zod
- [x] Server Actions tipadas
- [x] Sanitização de dados
- [x] Tratamento de erros

### ✅ Utilitários

- [x] Geração automática de slugs
- [x] Formatação de dados brasileiros
- [x] Conversão de timezone (UTC ⇄ UTC-3)
- [x] Utilitários de SEO
- [x] Validação de email, telefone, URLs

## 🎨 Interface de Administração

O painel administrativo possui:

- **Dashboard** com resumo geral
- **Formulários completos** para cada entidade
- **Listagens com filtros** e paginação
- **Sistema de status** (draft, published, archived)
- **Upload de imagens** (integração com Supabase Storage)
- **SEO otimizado** para todas as páginas

## 🔧 Próximos Passos Sugeridos

1. **Implementar autenticação** com Supabase Auth
2. **Adicionar upload de arquivos** para imagens
3. **Criar páginas públicas** do site
4. **Implementar sistema de busca** avançada
5. **Adicionar dashboard** com métricas
6. **Implementar notificações** por email
7. **Adicionar temas** customizáveis
8. **Sistema de backup** automático

## 📄 Licença

Este projeto foi desenvolvido especificamente para a **NOVOCODE TECNOLOGIA E SISTEMAS LTDA**.

---

**Desenvolvido com ❤️ para a NOVOCODE**
