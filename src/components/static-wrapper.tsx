'use client';

import { ReactNode } from 'react';

interface StaticWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper estático que não executa nenhuma lógica de servidor.
 * A verificação de manutenção agora é feita no middleware.
 */
export function StaticWrapper({ children }: StaticWrapperProps) {
  return <>{children}</>;
}
