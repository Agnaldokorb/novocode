# Configuração do Supabase Storage

## 📋 Visão Geral

Este documento contém as instruções para configurar o Supabase Storage para funcionar com o sistema de upload de imagens implementado.

## 🚀 Configuração Necessária

### 1. Criar Bucket no Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá para **Storage** no menu lateral
3. Clique em **Create bucket**
4. Configure:
   - **Name**: `uploads`
   - **Public bucket**: ✅ Marcar como público
   - **File size limit**: 50MB (opcional)
   - **Allowed MIME types**: Deixar vazio (será controlado pela aplicação)

### 2. Configurar Políticas RLS (Row Level Security)

Vá para **Storage** > **Policies** e crie as seguintes políticas:

#### Política de Upload (INSERT)

```sql
-- Nome: Allow public uploads
-- Operação: INSERT
-- Target roles: public

-- Policy:
true
```

#### Política de Visualização (SELECT)

```sql
-- Nome: Allow public read access
-- Operação: SELECT
-- Target roles: public

-- Policy:
true
```

#### Política de Exclusão (DELETE)

```sql
-- Nome: Allow public delete
-- Operação: DELETE
-- Target roles: public

-- Policy:
true
```

### 3. Estrutura de Pastas

O sistema criará automaticamente as seguintes pastas no bucket `uploads`:

```
uploads/
├── services/          # Imagens dos serviços
├── portfolio/         # Imagens do portfólio
├── technologies/      # Ícones das tecnologias
├── blog/             # Imagens dos posts do blog
└── site/             # Logo e favicon do site
```

## 🔧 Configurações por Módulo

### Serviços

- **Pasta**: `services`
- **Tamanho máximo**: 5MB
- **Tipos permitidos**: JPEG, PNG, WebP, GIF

### Portfólio

- **Pasta**: `portfolio`
- **Tamanho máximo**: 10MB
- **Tipos permitidos**: JPEG, PNG, WebP, GIF

### Tecnologias

- **Pasta**: `technologies`
- **Tamanho máximo**: 2MB
- **Tipos permitidos**: JPEG, PNG, WebP, SVG

### Blog

- **Pasta**: `blog`
- **Tamanho máximo**: 5MB
- **Tipos permitidos**: JPEG, PNG, WebP, GIF

### Site (Logo/Favicon)

- **Pasta**: `site`
- **Tamanho máximo**: 3MB
- **Tipos permitidos**: JPEG, PNG, WebP, SVG

## 🧪 Como Testar

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Acesse qualquer formulário de criação/edição:

   - http://localhost:3000/admin/services/new
   - http://localhost:3000/admin/portfolio/new
   - http://localhost:3000/admin/technologies/new
   - http://localhost:3000/admin/blog/new
   - http://localhost:3000/admin/settings (aba Configurações do Site)

3. Teste o upload de uma imagem

4. Verifique se:
   - O arquivo foi enviado para o Supabase Storage
   - A imagem aparece no preview
   - A URL é salva corretamente no banco de dados

## 🚨 Solução de Problemas

### Erro: "Failed to upload file"

**Possíveis causas:**

- Bucket não existe ou não está público
- Políticas RLS não configuradas
- Arquivo maior que o limite permitido
- Tipo de arquivo não permitido

**Solução:**

1. Verifique se o bucket `uploads` existe e está público
2. Verifique as políticas RLS
3. Verifique o tamanho e tipo do arquivo

### Erro: "Cannot read properties of null"

**Causa:** Variáveis de ambiente não configuradas

**Solução:**
Verifique se estão definidas no `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="sua-url-do-supabase"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima"
```

### Imagens não aparecem no site público

**Causa:** URLs não estão sendo geradas corretamente

**Solução:**

1. Verifique se o bucket está público
2. Teste a URL manualmente no navegador
3. Verifique se a política SELECT permite acesso público

## 📚 URLs de Acesso

- **Dashboard do Supabase**: https://supabase.com/dashboard
- **Storage no projeto**: https://supabase.com/dashboard/project/[PROJECT_ID]/storage/buckets
- **Políticas**: https://supabase.com/dashboard/project/[PROJECT_ID]/storage/policies

## ✅ Status da Implementação

- ✅ **Serviço de Storage**: Implementado (`src/lib/storage.ts`)
- ✅ **Componente ImageUpload**: Implementado (`src/components/ui/image-upload.tsx`)
- ✅ **Componente GalleryUpload**: Implementado (`src/components/ui/gallery-upload.tsx`)
- ✅ **Formulários integrados**: Serviços, Portfólio, Tecnologias, Blog, Configurações
- 🔄 **Configuração do Supabase**: **Necessária configuração manual**

---

⚠️ **Importante**: As configurações do Supabase Storage devem ser feitas manualmente no dashboard antes de testar os uploads.
