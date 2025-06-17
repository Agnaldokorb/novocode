import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configuração otimizada para Next.js
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Configurações de connection pool otimizadas
  ...(process.env.NODE_ENV === 'production' && {
    transactionOptions: {
      timeout: 5000, // 5 segundos
    },
  }),
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Função helper para operações com retry
export async function prismaWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Se não é erro de conexão, não tenta novamente
      if (!error || typeof error !== 'object' || !('code' in error) || (error as any).code !== 'P1001') {
        throw error;
      }
      
      console.warn(`Tentativa ${attempt}/${maxRetries} falhou:`, lastError.message);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError!;
}
