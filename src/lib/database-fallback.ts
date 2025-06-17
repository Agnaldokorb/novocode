// Configuração de banco com fallback para API REST
import { PrismaClient } from '@prisma/client';
import { prismaWithRetry } from './prisma';

// Singleton para Prisma Client
let prisma: PrismaClient | null = null;
let isDbAvailable = false;
let lastDbCheck = 0;
const DB_CHECK_INTERVAL = 30000; // 30 segundos

export async function getPrismaClient(): Promise<PrismaClient | null> {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  }
  
  // Verificar se o banco está disponível
  const now = Date.now();
  if (now - lastDbCheck > DB_CHECK_INTERVAL) {
    lastDbCheck = now;
    try {
      await prismaWithRetry(async () => {
        await prisma!.$connect();
        await prisma!.$queryRaw`SELECT 1`;
      });
      isDbAvailable = true;
      console.log('✅ Banco de dados disponível via Prisma');
    } catch (error) {
      isDbAvailable = false;
      console.warn('⚠️ Banco indisponível via Prisma, usando fallback REST');
    }
  }
  
  return isDbAvailable ? prisma : null;
}

// Cliente Supabase REST como fallback
class SupabaseRestClient {
  private baseUrl: string;
  private apiKey: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    this.apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  }
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/rest/v1${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Métodos para Site Config
  async getSiteConfig() {
    try {
      const config = await this.request('/site_config?select=*');
      return config[0] || null;
    } catch (error) {
      console.error('Erro ao buscar configuração via REST:', error);
      return null;
    }
  }
  
  async updateSiteConfig(data: any) {
    try {
      await this.request('/site_config', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar configuração via REST:', error);
      return false;
    }
  }
  // Métodos para Services
  async getServices() {
    try {
      return await this.request('/services?select=*&status=eq.PUBLISHED&order=order');
    } catch (error) {
      console.error('Erro ao buscar serviços via REST:', error);
      return [];
    }
  }
  
  // Métodos para Technologies
  async getTechnologies() {
    try {
      return await this.request('/technologies?select=*&isActive=eq.true&order=order');
    } catch (error) {
      console.error('Erro ao buscar tecnologias via REST:', error);
      return [];
    }
  }
  
  // Métodos para Portfolio
  async getPortfolios() {
    try {
      return await this.request('/portfolio?select=*&publicationStatus=eq.PUBLISHED&order=order');
    } catch (error) {
      console.error('Erro ao buscar portfolios via REST:', error);
      return [];
    }
  }
    // Métodos para Blog Posts
  async getBlogPosts(limit = 10) {
    try {
      return await this.request(`/blog_posts?select=*&status=eq.PUBLISHED&order=createdAt.desc&limit=${limit}`);
    } catch (error) {
      console.error('Erro ao buscar posts via REST:', error);
      return [];
    }
  }
  
  // Métodos para Testimonials
  async getTestimonials() {
    try {
      return await this.request('/testimonials?select=*&order=order');
    } catch (error) {
      console.error('Erro ao buscar depoimentos via REST:', error);
      return [];
    }
  }
  
  // Métodos para Statistics
  async getStatistics() {
    try {
      return await this.request('/statistics?select=*');
    } catch (error) {
      console.error('Erro ao buscar estatísticas via REST:', error);
      return [];
    }
  }
  
  // Método para criar contact/lead
  async createContact(data: any) {
    try {
      await this.request('/contacts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar contato via REST:', error);
      return false;
    }
  }
  
  // Método para criar orçamento
  async createBudget(data: any) {
    try {
      await this.request('/budgets', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar orçamento via REST:', error);
      return false;
    }
  }
}

// Instância única do cliente REST
export const supabaseRest = new SupabaseRestClient();

// Função para verificar se o banco está disponível
export function isDatabaseAvailable(): boolean {
  return isDbAvailable;
}

// Função helper para executar operações com fallback
export async function withDatabaseFallback<T>(
  prismaOperation: () => Promise<T>,
  restFallback: () => Promise<T>,
  defaultValue: T
): Promise<T> {
  const prismaClient = await getPrismaClient();
  
  if (prismaClient) {
    try {
      return await prismaOperation();
    } catch (error) {
      console.warn('Erro na operação Prisma, tentando fallback REST:', error);
    }
  }
  
  try {
    return await restFallback();
  } catch (error) {
    console.error('Erro também no fallback REST:', error);
    return defaultValue;
  }
}
