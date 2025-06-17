'use client';

import { useState, useEffect } from 'react';
import { Wrench, Clock, Mail, Phone, MessageCircle } from "lucide-react";

interface SiteConfig {
  companyName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
}

export default function MaintenancePage() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSiteConfig(data.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar configurações:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Valores padrão caso não consiga carregar do banco
  const config = siteConfig || {
    companyName: "NovoCode",
    email: "contato@novocode.dev",
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Ícone de manutenção */}
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <Wrench className="w-8 h-8 text-orange-600" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Site em Manutenção
        </h1>

        {/* Descrição */}
        <p className="text-gray-600 mb-6">
          Estamos trabalhando para melhorar nossos serviços. 
          O site voltará ao ar em breve!
        </p>

        {/* Tempo estimado */}
        <div className="flex items-center justify-center text-blue-600 mb-8">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">
            Tempo estimado: algumas horas
          </span>
        </div>

        {/* Informações de contato */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Precisa de ajuda?
          </h2>
          
          <div className="space-y-3">
            {/* Email */}
            <a 
              href={`mailto:${config.email}`}
              className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{config.email}</span>
            </a>

            {/* Telefone */}
            <a 
              href={`tel:${config.phone}`}
              className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{config.phone}</span>
            </a>

            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${config.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2024 {config.companyName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
