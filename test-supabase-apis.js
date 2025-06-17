// Teste das APIs REST do Supabase para verificar nomes de tabelas corretos
require('dotenv').config();
const fetch = require('node-fetch').default || require('node-fetch');

async function testSupabaseAPIs() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const endpoints = [
    '/users',
    '/services', 
    '/technologies',
    '/portfolio',
    '/blog_posts',
    '/site_config',
    '/testimonials',
    '/faqs',
    '/leads'
  ];
  
  console.log('🔍 Testando endpoints da API REST do Supabase...\n');
  
  for (const endpoint of endpoints) {
    try {
      const url = `${supabaseUrl}/rest/v1${endpoint}?select=count&limit=1`;
      const response = await fetch(url, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Range': '0-0'
        }
      });
      
      if (response.ok) {
        const contentRange = response.headers.get('content-range');
        console.log(`✅ ${endpoint.padEnd(15)} - OK (${contentRange || 'N/A'})`);
      } else {
        console.log(`❌ ${endpoint.padEnd(15)} - ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`💥 ${endpoint.padEnd(15)} - Erro: ${error.message}`);
    }
  }
  
  console.log('\n🔧 Testando queries específicas...');
  
  // Testar queries específicas que usamos no fallback
  const queries = [
    '/services?select=*&status=eq.PUBLISHED',
    '/technologies?select=*&isActive=eq.true',
    '/portfolio?select=*&publicationStatus=eq.PUBLISHED',
    '/blog_posts?select=*&status=eq.PUBLISHED',
    '/site_config?select=*'
  ];
  
  for (const query of queries) {
    try {
      const url = `${supabaseUrl}/rest/v1${query}&limit=1`;
      const response = await fetch(url, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${query.split('?')[0].padEnd(15)} - Filtro OK (${data.length} itens)`);
      } else {
        const error = await response.text();
        console.log(`❌ ${query.split('?')[0].padEnd(15)} - ${response.status}: ${error.substring(0, 100)}`);
      }
    } catch (error) {
      console.log(`💥 ${query.split('?')[0].padEnd(15)} - Erro: ${error.message}`);
    }
  }
}

testSupabaseAPIs().catch(console.error);
