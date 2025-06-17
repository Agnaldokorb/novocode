// Teste específico para debugar o erro 400 na API getBlogPosts
require('dotenv').config();
const fetch = require('node-fetch').default || require('node-fetch');

async function debugBlogPostsAPI() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🔍 Debugando erro 400 na API getBlogPosts...\n');
  
  async function testRequest(endpoint, description) {
    try {
      const url = `${supabaseUrl}/rest/v1${endpoint}`;
      console.log(`🧪 Testando: ${description}`);
      console.log(`📍 URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Sucesso: ${data.length} registros`);
        if (data.length > 0) {
          console.log(`📋 Campos disponíveis: ${Object.keys(data[0]).join(', ')}`);
          console.log(`📄 Primeiro registro:`, JSON.stringify(data[0], null, 2).substring(0, 200) + '...');
        }
      } else {
        const errorText = await response.text();
        console.log(`❌ Erro ${response.status}: ${response.statusText}`);
        console.log(`📝 Detalhes:`, errorText);
      }
      console.log(''); // linha vazia
    } catch (error) {
      console.log(`💥 Erro de rede: ${error.message}\n`);
    }
  }
  
  // Testar diferentes variações da query de blog posts
  await testRequest('/blog_posts?select=*', 'Query básica - todos os campos');
  await testRequest('/blog_posts?select=*&limit=1', 'Query básica com limit');
  await testRequest('/blog_posts?select=id,title,status', 'Query com campos específicos');
  await testRequest('/blog_posts?select=*&status=eq.PUBLISHED', 'Query com filtro status PUBLISHED');
  await testRequest('/blog_posts?select=*&status=eq.DRAFT', 'Query com filtro status DRAFT');
  await testRequest('/blog_posts', 'Query sem parâmetros');
  
  // Testar ordenação que estava causando problema
  await testRequest('/blog_posts?select=*&order=created_at.desc', 'Query com ordenação');
  await testRequest('/blog_posts?select=*&order=createdAt.desc', 'Query com ordenação (createdAt)');
  
  // A query problemática original
  await testRequest('/blog_posts?select=*&status=eq.PUBLISHED&order=created_at.desc&limit=10', 'Query original problemática');
}

debugBlogPostsAPI().catch(console.error);
