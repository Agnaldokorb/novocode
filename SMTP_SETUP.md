# Configuração SMTP para Sistema de Emails

## 🚨 Problema Atual

O sistema está apresentando erro de conexão SMTP:

```
Error: connect ECONNREFUSED ::1:587
```

## ✅ Soluções Recomendadas

### 1. Configuração Gmail (Recomendado)

Adicione no seu arquivo `.env.local`:

```env
# Configurações SMTP Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-gmail
SMTP_FROM=seu-email@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Passos para configurar Gmail:**

1. Ative a verificação em 2 etapas na sua conta Google
2. Gere uma "Senha de app" específica para esta aplicação
3. Use a senha de app no campo `SMTP_PASS`

### 2. Configuração SendGrid (Profissional)

```env
# Configurações SMTP SendGrid
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=sua-api-key-sendgrid
SMTP_FROM=noreply@seudominio.com
NEXT_PUBLIC_APP_URL=https://seudominio.com
```

### 3. Configuração Mailtrap (Desenvolvimento)

```env
# Configurações SMTP Mailtrap (para testes)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=seu-username-mailtrap
SMTP_PASS=sua-senha-mailtrap
SMTP_FROM=test@example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 Implementação Alternativa com EmailJS

Se preferir uma solução client-side sem configuração de servidor SMTP:

### Instalar EmailJS:

```bash
npm install @emailjs/browser
```

### Configurar EmailJS:

1. Crie conta em https://www.emailjs.com/
2. Configure um serviço de email
3. Crie um template de email
4. Obtenha as chaves: Service ID, Template ID, Public Key

## 📧 Como Funciona o Sistema Atual

1. **Trigger**: Quando status do lead muda para "WON" (Ganho)
2. **Verificação**: Sistema verifica se já existe depoimento para este lead
3. **Criação**: Cria registro na tabela `testimonials` com token único
4. **Email**: Envia email com link personalizado para depoimento
5. **Link**: `https://seusite.com/depoimento/{token}`

## 🛠️ Testando o Sistema

Após configurar SMTP:

1. Vá para `/admin/leads`
2. Altere status de um lead para "Ganho"
3. Verifique os logs do servidor
4. Confirme se email foi enviado

## 📋 Checklist de Configuração

- [ ] Variáveis SMTP configuradas no `.env.local`
- [ ] Credenciais de email válidas
- [ ] Firewall/antivírus não bloqueando porta 587
- [ ] URL da aplicação configurada corretamente
- [ ] Teste de envio realizado

## 🔍 Debug

Para debugar problemas de email, adicione logs extras em `src/lib/email-testimonial.ts`:

```typescript
console.log("Configurações SMTP:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  from: process.env.SMTP_FROM,
});
```

## Configuração SMTP para Formulário de Contato

Este projeto utiliza o serviço **Brevo (antigo SendinBlue)** para envio de emails através do formulário de contato.

## Configuração

### 1. Criando uma conta no Brevo

1. Acesse [https://www.brevo.com/](https://www.brevo.com/)
2. Crie uma conta gratuita
3. Verifique seu email e complete o setup

### 2. Configurando SMTP

1. Acesse **Settings** > **SMTP & API**
2. Na seção **SMTP**, clique em **Generate new SMTP key**
3. Anote as credenciais:
   - **SMTP Server**: `smtp-relay.brevo.com`
   - **Port**: `587`
   - **Login**: seu email da conta Brevo
   - **Password**: a chave SMTP gerada

### 3. Configurando Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Edite o arquivo `.env.local` com suas credenciais do Brevo:
   ```env
   BREVO_SMTP_USER="seu-email@brevo.com"
   BREVO_SMTP_PASSWORD="sua-chave-smtp"
   BREVO_FROM_EMAIL="noreply@novocode.com.br"
   ```

### 4. Testando o Formulário

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

2. Acesse `http://localhost:3000/contato`
3. Preencha e envie o formulário
4. Verifique se o email chegou em `novocode.tec@gmail.com`

## Configuração de Produção

Para produção, configure as mesmas variáveis de ambiente na sua plataforma de hospedagem:

- **Vercel**: Project Settings > Environment Variables
- **Netlify**: Site Settings > Environment Variables
- **Railway**: Variables tab
- **Heroku**: Settings > Config Vars

## Solução de Problemas

### Erro: "Serviço de email não configurado"

- Verifique se as variáveis `BREVO_SMTP_USER` e `BREVO_SMTP_PASSWORD` estão definidas
- Certifique-se de que não há espaços extras nas variáveis

### Erro: "Authentication failed"

- Verifique suas credenciais no Brevo
- Regenere uma nova chave SMTP se necessário

### Emails não chegam

- Verifique a pasta de spam
- Confirme se o email de destino (`novocode.tec@gmail.com`) existe
- Verifique os logs do servidor para erros detalhados

## Recursos Implementados

- ✅ Formulário de contato responsivo
- ✅ Validação de dados com Zod
- ✅ Template de email HTML profissional
- ✅ Tratamento de erros e feedback ao usuário
- ✅ Integração com Brevo SMTP
- ✅ Página de contato completa com informações da empresa
- ✅ Links de contato direto (WhatsApp, Email)
- ✅ FAQ e informações de atendimento

## Estrutura de Arquivos

```
src/
├── app/(site)/contato/
│   └── page.tsx              # Página principal de contato
├── components/forms/
│   └── contact-form.tsx      # Componente do formulário
├── actions/
│   └── contact.ts            # Server action para processar formulário
├── lib/
│   └── email.ts              # Serviço de email com Brevo
└── components/site/
    ├── header.tsx            # Navegação atualizada
    └── contact-section.tsx   # Seção CTA homepage
```

## Personalização

### Alterando o Template do Email

Edite o arquivo `src/lib/email.ts` na função `createContactEmailTemplate()`.

### Modificando o Formulário

Edite o arquivo `src/components/forms/contact-form.tsx` para adicionar/remover campos.

### Atualizando Validações

Modifique o schema Zod em `src/actions/contact.ts` para ajustar as validações.
