import { useEffect, useState } from 'react';

interface MaintenanceStatus {
  isMaintenanceMode: boolean;
  loading: boolean;
  error: string | null;
}

export function useMaintenanceStatus(): MaintenanceStatus {
  const [status, setStatus] = useState<MaintenanceStatus>({
    isMaintenanceMode: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function checkMaintenanceStatus() {
      try {
        const response = await fetch('/api/maintenance-status');
        if (!response.ok) {
          throw new Error('Falha ao verificar status de manutenção');
        }
        
        const data = await response.json();
        setStatus({
          isMaintenanceMode: data.maintenanceMode || false,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStatus({
          isMaintenanceMode: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
      }
    }

    checkMaintenanceStatus();
  }, []);

  return status;
}
