// Teste da query corrigida
require('dotenv').config();
const fetch = require('node-fetch').default || require('node-fetch');

async function testCorrectedQuery() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🎯 Testando query corrigida...\n');
  
  try {
    // Query corrigida (como está agora no código)
    const url = `${supabaseUrl}/rest/v1/blog_posts?select=*&status=eq.PUBLISHED&order=createdAt.desc&limit=10`;
    console.log('📍 URL corrigida:', url);
    
    const response = await fetch(url, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ SUCESSO! ${data.length} posts encontrados`);
      console.log('📄 Posts:');
      data.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title} (${post.status})`);
      });
    } else {
      const errorText = await response.text();
      console.log(`❌ Erro ${response.status}: ${response.statusText}`);
      console.log(`📝 Detalhes:`, errorText);
    }
  } catch (error) {
    console.log(`💥 Erro: ${error.message}`);
  }
}

testCorrectedQuery().catch(console.error);
