// Script para diagnosticar o projeto Supabase
require('dotenv').config();
const fetch = require('node-fetch').default || require('node-fetch');

async function diagnoseSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🔍 Diagnosticando projeto Supabase...');
  console.log('URL do projeto:', supabaseUrl);
  console.log('Project ID:', supabaseUrl?.split('//')[1]?.split('.')[0]);
  
  try {
    // Teste 1: API de status público
    console.log('\n📡 Testando API REST...');
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    if (response.ok) {
      console.log('✅ API REST acessível');
    } else {
      console.log('❌ API REST com problemas:', response.status, response.statusText);
    }
    
    // Teste 2: Verificar se as tabelas existem
    console.log('\n📋 Testando acesso às tabelas...');
    const tablesResponse = await fetch(`${supabaseUrl}/rest/v1/users?select=count`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Range': '0-0'
      }
    });
    
    if (tablesResponse.ok) {
      console.log('✅ Tabela users acessível');
      const count = tablesResponse.headers.get('content-range');
      console.log('📊 Content-Range:', count);
    } else {
      console.log('❌ Problema ao acessar tabela users:', tablesResponse.status);
      const error = await tablesResponse.text();
      console.log('Erro:', error);
    }
    
  } catch (error) {
    console.error('❌ Erro no diagnóstico:', error.message);
  }
}

diagnoseSupabase().catch(console.error);
