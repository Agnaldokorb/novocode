'use client';

import { useMaintenanceStatus } from '@/hooks/use-maintenance-status';
import { AlertTriangle } from 'lucide-react';

export function MaintenanceBanner() {
  const { isMaintenanceMode, loading } = useMaintenanceStatus();

  if (loading || !isMaintenanceMode) {
    return null;
  }

  return (
    <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
        <div className="text-orange-800">
          <strong>Site em modo de manutenção:</strong> Apenas administradores podem acessar o site. 
          Visitantes verão a página de manutenção.{' '}
          <a 
            href="/admin/settings" 
            className="underline hover:no-underline font-medium"
          >
            Desativar modo manutenção
          </a>
        </div>
      </div>
    </div>
  );
}
