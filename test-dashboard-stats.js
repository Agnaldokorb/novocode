// Teste específico das funções do dashboard stats
require('dotenv').config();
const fetch = require('node-fetch').default || require('node-fetch');

async function testDashboardStats() {
  console.log('🎯 Testando funcionalidades do dashboard...\n');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  async function request(endpoint, options = {}) {
    const url = `${supabaseUrl}/rest/v1${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Testar cada endpoint usado no dashboard
  const endpoints = [
    { name: 'Services', url: '/services?select=*' },
    { name: 'Portfolio', url: '/portfolio?select=*' },
    { name: 'Blog Posts', url: '/blog_posts?select=*' },
    { name: 'Technologies', url: '/technologies?select=*' },
  ];
  
  const results = {};
  
  for (const { name, url } of endpoints) {
    try {
      const data = await request(url);
      results[name] = {
        success: true,
        count: data.length,
        sample: data[0] ? Object.keys(data[0]) : []
      };
      console.log(`✅ ${name}: ${data.length} registros`);
      if (data[0]) {
        console.log(`   Campos: ${Object.keys(data[0]).slice(0, 5).join(', ')}${Object.keys(data[0]).length > 5 ? '...' : ''}`);
      }
    } catch (error) {
      results[name] = {
        success: false,
        error: error.message
      };
      console.log(`❌ ${name}: ${error.message}`);
    }
  }
  
  console.log('\n📊 Simulando cálculos do dashboard...');
  
  // Simular os cálculos que o dashboard faz
  if (results.Services.success && results.Portfolio.success) {
    const services = await request('/services?select=*');
    const portfolios = await request('/portfolio?select=*');
    
    console.log('✅ Dashboard Stats simulado:');
    console.log('   📁 Total de serviços:', services.length);
    console.log('   📁 Serviços publicados:', services.filter(s => s.status === 'PUBLISHED').length);
    console.log('   📁 Serviços em destaque:', services.filter(s => s.featured).length);
    console.log('   💼 Total de portfolios:', portfolios.length);
    console.log('   💼 Portfolios publicados:', portfolios.filter(p => p.publicationStatus === 'PUBLISHED').length);
    console.log('   💼 Portfolios em destaque:', portfolios.filter(p => p.featured).length);
  }
  
  return results;
}

testDashboardStats().catch(console.error);
