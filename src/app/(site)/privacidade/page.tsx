import { generateDynamicMetadata } from "@/lib/dynamic-metadata";

export async function generateMetadata() {
  return await generateDynamicMetadata({
    title: "Política de Privacidade",
    description:
      "Política de Privacidade e Proteção de Dados da NOVOCODE em conformidade com a LGPD - Lei Geral de Proteção de Dados.",
    keywords: [
      "política de privacidade",
      "LGPD",
      "proteção de dados",
      "privacidade",
      "dados pessoais",
      "cookies",
      "termos",
    ],
  });
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl text-blue-100">
              Transparência e proteção dos seus dados pessoais em conformidade
              com a LGPD
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Última atualização */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12">
              <p className="text-sm text-blue-700 mb-2">
                <strong>Última atualização:</strong> 11 de junho de 2025
              </p>
              <p className="text-blue-800">
                Esta Política de Privacidade está em conformidade com a Lei
                Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </div>

            {/* 1. Introdução */}
            <h2>1. Introdução</h2>
            <p>
              A <strong>NOVOCODE</strong> está comprometida com a proteção e
              privacidade dos dados pessoais de nossos usuários, clientes e
              visitantes. Esta Política de Privacidade explica como coletamos,
              usamos, armazenamos e protegemos suas informações pessoais em
              conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>

            {/* 2. Definições */}
            <h2>2. Definições</h2>
            <ul>
              <li>
                <strong>Dados Pessoais:</strong> Qualquer informação relacionada
                a pessoa natural identificada ou identificável
              </li>
              <li>
                <strong>Titular dos Dados:</strong> Pessoa natural a quem se
                referem os dados pessoais
              </li>
              <li>
                <strong>Controlador:</strong> NOVOCODE, pessoa jurídica
                responsável pelas decisões sobre o tratamento de dados pessoais
              </li>
              <li>
                <strong>Tratamento:</strong> Toda operação realizada com dados
                pessoais (coleta, armazenamento, uso, etc.)
              </li>
            </ul>

            {/* 3. Dados coletados */}
            <h2>3. Dados Pessoais Coletados</h2>
            <h3>3.1 Dados fornecidos diretamente por você:</h3>
            <ul>
              <li>Nome completo</li>
              <li>E-mail</li>
              <li>Telefone/WhatsApp</li>
              <li>Empresa/Organização</li>
              <li>Cargo/Função</li>
              <li>
                Informações sobre projeto (formulário de orçamento/contato)
              </li>
            </ul>

            <h3>3.2 Dados coletados automaticamente:</h3>
            <ul>
              <li>Endereço IP</li>
              <li>Informações do navegador</li>
              <li>Páginas visitadas</li>
              <li>Tempo de permanência no site</li>
              <li>Cookies e tecnologias similares</li>
            </ul>

            {/* 4. Finalidades */}
            <h2>4. Finalidades do Tratamento</h2>
            <p>
              Seus dados pessoais são tratados para as seguintes finalidades:
            </p>
            <ul>
              <li>
                <strong>Comunicação:</strong> Responder suas dúvidas e
                solicitações
              </li>
              <li>
                <strong>Prestação de Serviços:</strong> Desenvolvimento de
                projetos e soluções
              </li>
              <li>
                <strong>Marketing:</strong> Envio de informações sobre nossos
                serviços (com seu consentimento)
              </li>
              <li>
                <strong>Melhoria do Site:</strong> Análise de uso e otimização
                da experiência
              </li>
              <li>
                <strong>Cumprimento Legal:</strong> Atendimento a obrigações
                legais e regulatórias
              </li>
            </ul>

            {/* 5. Base legal */}
            <h2>5. Base Legal para o Tratamento</h2>
            <p>
              O tratamento dos seus dados pessoais é baseado nas seguintes
              hipóteses legais:
            </p>
            <ul>
              <li>
                <strong>Consentimento:</strong> Para marketing e comunicações
                promocionais
              </li>
              <li>
                <strong>Execução de Contrato:</strong> Para prestação de
                serviços contratados
              </li>
              <li>
                <strong>Interesse Legítimo:</strong> Para melhoria dos serviços
                e segurança
              </li>
              <li>
                <strong>Cumprimento de Obrigação Legal:</strong> Para atender
                exigências fiscais e tributárias
              </li>
            </ul>

            {/* 6. Compartilhamento */}
            <h2>6. Compartilhamento de Dados</h2>
            <p>
              Seus dados pessoais podem ser compartilhados nas seguintes
              situações:
            </p>
            <ul>
              <li>
                <strong>Prestadores de Serviços:</strong> Empresas que nos
                auxiliam (hospedagem, analytics, e-mail marketing)
              </li>
              <li>
                <strong>Autoridades Competentes:</strong> Quando exigido por lei
                ou ordem judicial
              </li>
              <li>
                <strong>Parceiros de Negócio:</strong> Somente com seu
                consentimento expresso
              </li>
            </ul>
            <p>
              <strong>Importante:</strong> Nunca vendemos seus dados pessoais
              para terceiros.
            </p>

            {/* 7. Armazenamento */}
            <h2>7. Armazenamento e Segurança</h2>
            <h3>7.1 Onde armazenamos:</h3>
            <ul>
              <li>
                Servidores seguros no Brasil ou em países com nível adequado de
                proteção
              </li>
              <li>Supabase (banco de dados criptografado)</li>
              <li>Provedores de e-mail com certificação de segurança</li>
            </ul>

            <h3>7.2 Medidas de segurança:</h3>
            <ul>
              <li>Criptografia de dados sensíveis</li>
              <li>Acesso restrito e autenticação</li>
              <li>Monitoramento de segurança</li>
              <li>Backups regulares e seguros</li>
            </ul>

            {/* 8. Retenção */}
            <h2>8. Período de Retenção</h2>
            <ul>
              <li>
                <strong>Dados de contato:</strong> Até 5 anos após o último
                contato
              </li>
              <li>
                <strong>Dados de projetos:</strong> Até 10 anos (prazo legal
                para contratos)
              </li>
              <li>
                <strong>Dados de marketing:</strong> Até a revogação do
                consentimento
              </li>
              <li>
                <strong>Logs de acesso:</strong> Até 6 meses
              </li>
            </ul>

            {/* 9. Cookies */}
            <h2>9. Cookies e Tecnologias Similares</h2>
            <p>Utilizamos cookies para:</p>
            <ul>
              <li>
                <strong>Essenciais:</strong> Funcionamento básico do site
              </li>
              <li>
                <strong>Analytics:</strong> Google Analytics para estatísticas
                de uso
              </li>
              <li>
                <strong>Marketing:</strong> Facebook Pixel para publicidade
                direcionada
              </li>
            </ul>
            <p>
              Você pode gerenciar cookies nas configurações do seu navegador.
            </p>

            {/* 10. Direitos do titular */}
            <h2>10. Seus Direitos (LGPD)</h2>
            <p>Como titular dos dados, você tem direito a:</p>
            <ul>
              <li>
                <strong>Confirmação:</strong> Saber se tratamos seus dados
              </li>
              <li>
                <strong>Acesso:</strong> Receber cópia dos seus dados
              </li>
              <li>
                <strong>Correção:</strong> Corrigir dados incompletos ou
                incorretos
              </li>
              <li>
                <strong>Eliminação:</strong> Solicitar exclusão dos dados
              </li>
              <li>
                <strong>Portabilidade:</strong> Receber dados em formato
                estruturado
              </li>
              <li>
                <strong>Oposição:</strong> Opor-se ao tratamento
              </li>
              <li>
                <strong>Revogação do Consentimento:</strong> Retirar
                consentimento a qualquer momento
              </li>
            </ul>

            {/* 11. Como exercer direitos */}
            <h2>11. Como Exercer seus Direitos</h2>
            <p>
              Para exercer qualquer um dos direitos acima, entre em contato
              conosco:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2">
                <li>
                  <strong>E-mail:</strong> privacidade@novocode.com.br
                </li>
                <li>
                  <strong>Telefone:</strong> (47) 98881-5799
                </li>
                <li>
                  <strong>Endereço:</strong> Brusque, SC - Brasil
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Responderemos sua solicitação em até 15 dias úteis.
              </p>
            </div>

            {/* 12. Menores de idade */}
            <h2>12. Dados de Menores de Idade</h2>
            <p>
              Nossos serviços são direcionados para pessoas maiores de 18 anos.
              Não coletamos intencionalmente dados de menores de idade. Caso
              identifiquemos tal situação, os dados serão imediatamente
              excluídos.
            </p>

            {/* 13. Alterações */}
            <h2>13. Alterações nesta Política</h2>
            <p>
              Esta Política pode ser atualizada periodicamente. Notificaremos
              sobre mudanças significativas por e-mail ou através de aviso no
              site. A versão mais atualizada estará sempre disponível nesta
              página.
            </p>

            {/* 14. Legislação */}
            <h2>14. Legislação Aplicável</h2>
            <p>
              Esta Política é regida pela legislação brasileira, especialmente
              pela Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e
              pelo Marco Civil da Internet (Lei nº 12.965/2014).
            </p>

            {/* 15. Contato DPO */}
            <h2>15. Encarregado de Proteção de Dados</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p>
                Para questões específicas sobre proteção de dados, contate nosso
                DPO:
              </p>
              <ul className="mt-4 space-y-1">
                <li>
                  <strong>E-mail:</strong> dpo@novocode.com.br
                </li>
                <li>
                  <strong>Nome:</strong> Encarregado NOVOCODE
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Esta Política de Privacidade foi elaborada em conformidade com a
                LGPD e é válida a partir de 11 de junho de 2025.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
