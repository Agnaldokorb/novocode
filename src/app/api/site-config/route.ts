import { NextResponse } from 'next/server';
import { getSiteConfig } from '@/actions/site-config';

export async function GET() {
  try {
    const siteConfig = await getSiteConfig();
    
    return NextResponse.json({
      success: true,
      data: siteConfig
    });
  } catch (error) {
    console.error('Erro ao buscar configurações do site:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erro ao buscar configurações',
      data: null
    }, { status: 500 });
  }
}
