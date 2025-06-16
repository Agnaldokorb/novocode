# NovoCode - Site Institucional

Este é um projeto Next.js 15 com Prisma, Supabase e TypeScript.

## 🚀 Getting Started

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm
- Conta no Supabase

### Instalação Local

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env.local` baseado no `.env.example`

4. Execute o desenvolvimento:
```bash
npm run dev
```

### 📦 Build para Produção

```bash
npm run build
```

### 🚀 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel. As seguintes variáveis de ambiente devem ser configuradas:

**Essenciais:**
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`

**Opcionais (SMTP):**
- `BREVO_SMTP_USER`
- `BREVO_SMTP_PASSWORD`
- `BREVO_FROM_EMAIL`

### 🛠 Scripts Disponíveis

- `npm run dev` - Desenvolvimento
- `npm run build` - Build para produção  
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linting

### 📋 Stack Tecnológica

- **Frontend**: Next.js 15, React 19, TypeScript
- **Banco de Dados**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth com @supabase/ssr
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Email**: Brevo (SendinBlue)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
