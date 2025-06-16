# 📧 Configuração do Sistema de Email para Depoimentos

## 🚨 Problema Identificado

O sistema de email não está enviando porque falta a configuração da variável `NEXT_PUBLIC_APP_URL`.

## ✅ Solução

### 1. Criar arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Configurações do Brevo para envio de emails
BREVO_SMTP_USER=8f6a7e001@smtp-brevo.com
BREVO_SMTP_PASSWORD=/* sua senha do Brevo aqui */
BREVO_FROM_EMAIL=novocode.tec@gmail.com

# URL da aplicação para links de depoimento
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Para produção, use:
# NEXT_PUBLIC_APP_URL=https://seudominio.com
```

### 2. Reiniciar o servidor

Após criar o arquivo `.env.local`, reinicie o servidor Next.js:

```bash
npm run dev
```

### 3. Testar o sistema

1. Acesse o painel admin: `http://localhost:3000/admin/leads`
2. Altere o status de um lead para "Ganho" (WON)
3. Verifique os logs no console do servidor
4. Verifique se o email chegou na caixa de entrada

## 🔍 Debug

### Logs esperados quando funcionar:

```
🎯 Status alterado para WON! Iniciando processo de depoimento para: cliente@email.com
📝 Criando novo registro de testimonial...
✅ Testimonial criado com ID: xxx
🔍 Verificando configurações de email...
BREVO_SMTP_USER: ✅ Configurado
BREVO_SMTP_PASSWORD: ✅ Configurado
BREVO_FROM_EMAIL: novocode.tec@gmail.com
NEXT_PUBLIC_APP_URL: http://localhost:3000
📧 Tentando enviar email de solicitação de depoimento...
📧 Configurando transporter Brevo: { host: 'smtp-relay.brevo.com', port: 587, user: '8f6a7***' }
🔗 Verificando conexão com Brevo...
✅ Conexão com Brevo verificada!
📤 Enviando email de solicitação de depoimento...
✅ Email de solicitação enviado com sucesso!
✅ Solicitação de depoimento enviada para cliente@email.com
```

### Se der erro:

- Verifique se todas as variáveis estão configuradas
- Verifique se a senha do Brevo está correta
- Verifique a conexão de internet
- Verifique os logs detalhados no console

## 🎯 Resultado Esperado

Quando o sistema estiver funcionando:

1. ✅ Lead alterado para status "Ganho"
2. ✅ Registro de testimonial criado automaticamente
3. ✅ Email enviado para o cliente com link único
4. ✅ Mensagem de sucesso no admin: "Status atualizado e solicitação de depoimento enviada!"

## 📧 Template do Email

O cliente receberá um email com:

- Assunto: "🌟 Sua opinião é importante para nós - NOVOCODE"
- Conteúdo HTML responsivo
- Link único para deixar depoimento
- Instruções claras sobre como proceder

## 🔄 Sistema de Fallback

Se o Brevo falhar, o sistema:

1. Cria notificação manual
2. Gera template de email para envio manual
3. Mostra instruções no console
4. Retorna mensagem: "Status atualizado. Email de depoimento precisa ser enviado manualmente."
