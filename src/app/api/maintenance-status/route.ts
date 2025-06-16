import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data: siteConfig, error } = await supabase
      .from('site_config')
      .select('maintenanceMode')
      .single();

    if (error) {
      console.error('Erro ao buscar configuração do site:', error);
      return NextResponse.json(
        { 
          maintenanceMode: false,
          error: 'Erro ao verificar status de manutenção' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      maintenanceMode: siteConfig?.maintenanceMode || false,
    });
    
  } catch (error) {
    console.error('Erro na API de status de manutenção:', error);
    return NextResponse.json(
      { 
        maintenanceMode: false,
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}
