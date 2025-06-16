import { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Site em Manutenção - NovoCode",
  description: "O site está temporariamente em manutenção. Voltaremos em breve!",
};

async function getSiteConfig() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('site_config')
      .select('companyName, email, phone, whatsapp')
      .single();
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return null;
  }
}

export default async function MaintenancePage() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Ícone de manutenção */}
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
          <svg 
            className="w-8 h-8 text-yellow-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Site em Manutenção
        </h1>

        {/* Descrição */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Nosso site está temporariamente em manutenção para melhorias e atualizações. 
          Voltaremos em breve com novidades!
        </p>

        {/* Informações de contato */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">
            Precisa entrar em contato?
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            {siteConfig?.email && (
              <p>
                📧 Email: {siteConfig.email}
              </p>
            )}
            {siteConfig?.whatsapp && (
              <p>
                📱 WhatsApp: {siteConfig.whatsapp}
              </p>
            )}
            {siteConfig?.phone && (
              <p>
                📞 Telefone: {siteConfig.phone}
              </p>
            )}
            {!siteConfig?.email && !siteConfig?.whatsapp && !siteConfig?.phone && (
              <p>📧 Email: contato@novocode.com.br</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span>Manutenção em andamento...</span>
        </div>

        {/* Nome da empresa */}
        {siteConfig?.companyName && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              {siteConfig.companyName}
            </p>
          </div>
        )}

        {/* Link para admin (apenas para referência) */}
        <div className="mt-2">
          <a 
            href="/admin" 
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Acesso administrativo
          </a>
        </div>
      </div>
    </div>
  );
}
