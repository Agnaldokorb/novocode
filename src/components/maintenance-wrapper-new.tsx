import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase';

interface MaintenanceWrapperProps {
  children: ReactNode;
  allowDuringMaintenance?: boolean;
}

export async function MaintenanceWrapper({ 
  children, 
  allowDuringMaintenance = false 
}: MaintenanceWrapperProps) {
  // Se esta rota é permitida durante manutenção, não verificar
  if (allowDuringMaintenance) {
    return <>{children}</>;
  }

  console.log('🔍 MaintenanceWrapper verificando modo de manutenção...');

  // Verificar modo de manutenção
  let isMaintenanceMode = false;
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data: siteConfig, error } = await supabase
      .from('site_config')
      .select('maintenanceMode')
      .single();

    if (error) {
      console.log('⚠️ Erro ao verificar modo manutenção:', error.message);
      isMaintenanceMode = false;
    } else {
      isMaintenanceMode = siteConfig?.maintenanceMode || false;
      console.log('🔧 Modo de manutenção no BD:', isMaintenanceMode);
    }

    // Se está em modo manutenção, verificar se é admin
    if (isMaintenanceMode) {
      console.log('🚧 Site em modo de manutenção - verificando se é admin');
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Verificar se é admin
        const { data: userData } = await supabase
          .from('users')
          .select('id, isActive, role')
          .eq('email', user.email)
          .single();

        const isAdmin = userData && userData.isActive && userData.role === 'ADMIN';
        
        if (!isAdmin) {
          console.log('🚧 Redirecionando usuário não-admin para página de manutenção');
          redirect('/maintenance');
        } else {
          console.log('✅ Admin detectado - permitindo acesso durante manutenção');
        }
      } else {
        console.log('🚧 Redirecionando usuário não logado para página de manutenção');
        redirect('/maintenance');
      }
    }
  } catch (error) {
    console.log('⚠️ Erro na verificação de manutenção:', error);
    // Em caso de erro, não bloquear o acesso
  }

  return <>{children}</>;
}
