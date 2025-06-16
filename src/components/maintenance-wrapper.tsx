import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase';

interface MaintenanceWrapperProps {
  children: ReactNode;
  allowDuringMaintenance?: boolean;
}

async function checkMaintenanceAndAuth(): Promise<boolean> {
  console.log('🔍 MaintenanceWrapper verificando modo de manutenção...');

  try {
    const supabase = await createSupabaseServerClient();
    
    const { data: siteConfig, error } = await supabase
      .from('site_config')
      .select('maintenanceMode')
      .single();

    if (error) {
      console.log('⚠️ Erro ao verificar modo manutenção:', error.message);
      return false; // Em caso de erro, permitir acesso
    }

    const isMaintenanceMode = siteConfig?.maintenanceMode || false;
    console.log('🔧 Modo de manutenção no BD:', isMaintenanceMode);

    if (!isMaintenanceMode) {
      return false; // Não está em manutenção
    }

    console.log('🚧 Site em modo de manutenção - verificando se é admin');
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('🚧 Usuário não logado - redirecionamento necessário');
      return true; // Precisa redirecionar
    }

    // Verificar se é admin
    const { data: userData } = await supabase
      .from('users')
      .select('id, isActive, role')
      .eq('email', user.email)
      .single();

    const isAdmin = userData && userData.isActive && userData.role === 'ADMIN';
    
    if (!isAdmin) {
      console.log('🚧 Usuário não-admin - redirecionamento necessário');
      return true; // Precisa redirecionar
    } else {
      console.log('✅ Admin detectado - permitindo acesso durante manutenção');
      return false; // Admin pode acessar
    }
  } catch (error) {
    console.log('⚠️ Erro na verificação de manutenção:', error);
    return false; // Em caso de erro, permitir acesso
  }
}

export async function MaintenanceWrapper({ 
  children, 
  allowDuringMaintenance = false 
}: MaintenanceWrapperProps) {
  // Se esta rota é permitida durante manutenção, não verificar
  if (allowDuringMaintenance) {
    return <>{children}</>;
  }

  // Verificar se precisa redirecionar
  const shouldRedirect = await checkMaintenanceAndAuth();
  
  if (shouldRedirect) {
    console.log('🚧 Executando redirecionamento para /maintenance');
    redirect('/maintenance');
  }

  return <>{children}</>;
}
