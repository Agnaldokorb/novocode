const { createClient } = require('@supabase/supabase-js');

// Carregando variáveis de ambiente
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMaintenanceMode() {
  try {
    console.log('🔍 Verificando status do modo de manutenção...');
    
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .single();

    if (error) {
      console.error('❌ Erro ao buscar configurações:', error);
      return;
    }

    console.log('📋 Configurações atuais do site:');
    console.log({
      maintenanceMode: data.maintenanceMode,
      siteName: data.siteName,
      siteDescription: data.siteDescription
    });

    if (data.maintenanceMode) {
      console.log('🚧 MODO DE MANUTENÇÃO ESTÁ ATIVO');
    } else {
      console.log('✅ Site está em funcionamento normal');
    }

  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
  }
}

checkMaintenanceMode();
