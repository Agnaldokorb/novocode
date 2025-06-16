import { generateDynamicMetadata } from "@/lib/dynamic-metadata";

export async function generateMetadata() {
  return await generateDynamicMetadata({
    title: "Termos de Uso",
    description:
      "Termos de Uso e Condições Gerais da NOVOCODE. Conheça as regras e condições para utilização de nossos serviços.",
    keywords: [
      "termos de uso",
      "condições gerais",
      "contrato",
      "serviços",
      "responsabilidades",
      "direitos",
      "deveres",
    ],
  });
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Termos de Uso
            </h1>
            <p className="text-xl text-purple-100">
              Condições gerais para utilização de nossos serviços
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Última atualização */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-12">
              <p className="text-sm text-purple-700 mb-2">
                <strong>Última atualização:</strong> 11 de junho de 2025
              </p>
              <p className="text-purple-800">
                Estes termos são válidos para todos os serviços prestados pela
                NOVOCODE.
              </p>
            </div>

            {/* 1. Aceitação dos termos */}
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar os serviços da <strong>NOVOCODE</strong>,
              você concorda integralmente com estes Termos de Uso. Se você não
              concordar com qualquer parte destes termos, não deve utilizar
              nossos serviços.
            </p>

            {/* 2. Sobre a empresa */}
            <h2>2. Sobre a NOVOCODE</h2>
            <p>
              A NOVOCODE é uma empresa especializada em desenvolvimento de
              software, soluções web, aplicativos mobile e consultoria
              tecnológica, com sede em Brusque, Santa Catarina, Brasil.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4>Dados da Empresa:</h4>
              <ul className="mt-4 space-y-1">
                <li>
                  <strong>Razão Social:</strong> NOVOCODE Soluções Tecnológicas
                </li>
                <li>
                  <strong>Localização:</strong> Brusque, SC - Brasil
                </li>
                <li>
                  <strong>E-mail:</strong> novocode.tec@gmail.com
                </li>
                <li>
                  <strong>Telefone:</strong> (47) 98881-5799
                </li>
              </ul>
            </div>

            {/* 3. Serviços oferecidos */}
            <h2>3. Serviços Oferecidos</h2>
            <p>A NOVOCODE oferece os seguintes serviços:</p>
            <ul>
              <li>
                <strong>Desenvolvimento Web:</strong> Sites, sistemas web e
                e-commerce
              </li>
              <li>
                <strong>Aplicativos Mobile:</strong> Apps para iOS e Android
              </li>
              <li>
                <strong>Consultoria Tecnológica:</strong> Análise e estratégia
                de TI
              </li>
              <li>
                <strong>Automação de Processos:</strong> Integração de sistemas
                e APIs
              </li>
              <li>
                <strong>Manutenção e Suporte:</strong> Suporte técnico e
                atualizações
              </li>
            </ul>

            {/* 4. Uso do site */}
            <h2>4. Uso do Site</h2>
            <h3>4.1 Uso Permitido:</h3>
            <ul>
              <li>Navegar e visualizar o conteúdo</li>
              <li>Entrar em contato para solicitação de serviços</li>
              <li>Solicitar orçamentos</li>
              <li>Acessar informações sobre nossos serviços</li>
            </ul>

            <h3>4.2 Uso Proibido:</h3>
            <ul>
              <li>Realizar atividades ilegais ou fraudulentas</li>
              <li>Tentar hackear ou comprometer a segurança do site</li>
              <li>Enviar spam ou conteúdo malicioso</li>
              <li>Copiar ou reproduzir conteúdo sem autorização</li>
              <li>Interferir no funcionamento normal do site</li>
            </ul>

            {/* 5. Propriedade intelectual */}
            <h2>5. Propriedade Intelectual</h2>
            <p>
              Todos os conteúdos do site (textos, imagens, logos, códigos,
              design) são de propriedade da NOVOCODE e estão protegidos por
              direitos autorais e outras leis de propriedade intelectual.
            </p>
            <h3>5.1 Uso Autorizado:</h3>
            <ul>
              <li>Visualização para fins pessoais e informativos</li>
              <li>Compartilhamento de links para o site</li>
            </ul>
            <h3>5.2 Uso Não Autorizado:</h3>
            <ul>
              <li>Reprodução total ou parcial sem autorização</li>
              <li>Uso comercial do conteúdo</li>
              <li>Modificação ou criação de obras derivadas</li>
            </ul>

            {/* 6. Prestação de serviços */}
            <h2>6. Prestação de Serviços</h2>
            <h3>6.1 Processo de Contratação:</h3>
            <ol>
              <li>Solicitação de orçamento através do site</li>
              <li>Análise dos requisitos</li>
              <li>Elaboração de proposta comercial</li>
              <li>Aprovação e assinatura de contrato específico</li>
              <li>Início do desenvolvimento</li>
            </ol>

            <h3>6.2 Condições Gerais:</h3>
            <ul>
              <li>Todos os projetos são regidos por contrato específico</li>
              <li>Prazos e valores são definidos em cada proposta</li>
              <li>Alterações no escopo podem afetar prazo e custo</li>
              <li>Pagamentos conforme cronograma acordado</li>
            </ul>

            {/* 7. Responsabilidades do cliente */}
            <h2>7. Responsabilidades do Cliente</h2>
            <ul>
              <li>Fornecer informações precisas e completas</li>
              <li>Cumprir prazos de aprovação e feedback</li>
              <li>Realizar pagamentos conforme acordado</li>
              <li>Fornecer conteúdo e materiais necessários</li>
              <li>Testar e aprovar entregas conforme cronograma</li>
              <li>Manter confidencialidade sobre informações sigilosas</li>
            </ul>

            {/* 8. Responsabilidades da NOVOCODE */}
            <h2>8. Responsabilidades da NOVOCODE</h2>
            <ul>
              <li>Entregar serviços conforme especificação contratual</li>
              <li>Cumprir prazos acordados</li>
              <li>Manter confidencialidade das informações do cliente</li>
              <li>Prestar suporte técnico conforme contratado</li>
              <li>Seguir boas práticas de desenvolvimento</li>
              <li>Proteger dados pessoais conforme LGPD</li>
            </ul>

            {/* 9. Limitação de responsabilidade */}
            <h2>9. Limitação de Responsabilidade</h2>
            <p>A NOVOCODE não se responsabiliza por:</p>
            <ul>
              <li>Danos indiretos ou lucros cessantes</li>
              <li>
                Problemas causados por terceiros (hospedagem, domínios, etc.)
              </li>
              <li>Indisponibilidade de serviços de terceiros</li>
              <li>Alterações em APIs e serviços externos</li>
              <li>Conteúdo fornecido pelo cliente</li>
              <li>Problemas decorrentes de mau uso da solução entregue</li>
            </ul>

            {/* 10. Garantias */}
            <h2>10. Garantias</h2>
            <h3>10.1 Garantia de Funcionamento:</h3>
            <ul>
              <li>
                90 dias para correção de bugs em funcionalidades entregues
              </li>
              <li>Suporte para problemas de implementação</li>
              <li>Documentação técnica quando aplicável</li>
            </ul>

            <h3>10.2 Exclusões da Garantia:</h3>
            <ul>
              <li>Modificações realizadas por terceiros</li>
              <li>Problemas de infraestrutura (servidor, hospedagem)</li>
              <li>Mudanças em requisitos após aprovação</li>
              <li>Problemas causados por atualizações de terceiros</li>
            </ul>

            {/* 11. Pagamentos e cancelamentos */}
            <h2>11. Pagamentos e Cancelamentos</h2>
            <h3>11.1 Condições de Pagamento:</h3>
            <ul>
              <li>Conforme cronograma definido em contrato</li>
              <li>Geralmente: entrada + parcelas por entregas</li>
              <li>Formas de pagamento: PIX, transferência bancária</li>
              <li>Juros de 1% ao mês para atraso</li>
            </ul>

            <h3>11.2 Política de Cancelamento:</h3>
            <ul>
              <li>Cliente pode cancelar com 30 dias de antecedência</li>
              <li>Trabalho já realizado será cobrado proporcionalmente</li>
              <li>
                Entrega dos materiais produzidos até a data do cancelamento
              </li>
              <li>
                Sem restituição de valores já pagos por trabalho executado
              </li>
            </ul>

            {/* 12. Confidencialidade */}
            <h2>12. Confidencialidade</h2>
            <p>A NOVOCODE se compromete a manter absoluto sigilo sobre:</p>
            <ul>
              <li>Informações comerciais e estratégicas do cliente</li>
              <li>Dados técnicos e de negócio</li>
              <li>Códigos-fonte e soluções desenvolvidas</li>
              <li>Qualquer informação marcada como confidencial</li>
            </ul>

            {/* 13. Proteção de dados (LGPD) */}
            <h2>13. Proteção de Dados (LGPD)</h2>
            <p>
              A NOVOCODE está comprometida com a proteção de dados pessoais
              conforme a Lei Geral de Proteção de Dados (LGPD). Para informações
              detalhadas, consulte nossa{" "}
              <a href="/privacidade" className="text-blue-600 hover:underline">
                Política de Privacidade
              </a>
              .
            </p>

            <h3>13.1 Principais Compromissos:</h3>
            <ul>
              <li>Tratamento de dados apenas para finalidades específicas</li>
              <li>Implementação de medidas de segurança adequadas</li>
              <li>Respeito aos direitos dos titulares de dados</li>
              <li>Transparência no tratamento de informações</li>
            </ul>

            {/* 14. Resolução de conflitos */}
            <h2>14. Resolução de Conflitos</h2>
            <h3>14.1 Processo de Resolução:</h3>
            <ol>
              <li>
                <strong>Negociação Direta:</strong> Tentativa de resolução
                amigável
              </li>
              <li>
                <strong>Mediação:</strong> Mediação por terceiro neutro
              </li>
              <li>
                <strong>Arbitragem:</strong> Quando acordado entre as partes
              </li>
              <li>
                <strong>Judicial:</strong> Como último recurso
              </li>
            </ol>

            <h3>14.2 Foro Competente:</h3>
            <p>
              Foro da Comarca de Brusque, Santa Catarina, para dirimir quaisquer
              controvérsias.
            </p>

            {/* 15. Alterações nos termos */}
            <h2>15. Alterações nos Termos</h2>
            <p>
              A NOVOCODE se reserva o direito de modificar estes Termos de Uso a
              qualquer momento. Alterações significativas serão comunicadas por:
            </p>
            <ul>
              <li>E-mail para clientes cadastrados</li>
              <li>Aviso no site por pelo menos 30 dias</li>
              <li>Atualização da data de modificação</li>
            </ul>

            {/* 16. Vigência */}
            <h2>16. Vigência e Rescisão</h2>
            <p>
              Estes termos permanecem em vigor enquanto você utilizar nossos
              serviços. Qualquer violação pode resultar na suspensão do acesso
              aos serviços.
            </p>

            {/* 17. Legislação aplicável */}
            <h2>17. Legislação Aplicável</h2>
            <p>
              Estes Termos de Uso são regidos pela legislação brasileira,
              incluindo:
            </p>
            <ul>
              <li>Código Civil Brasileiro</li>
              <li>Código de Defesa do Consumidor</li>
              <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
              <li>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</li>
            </ul>

            {/* 18. Contato */}
            <h2>18. Contato</h2>
            <p>Para dúvidas sobre estes Termos de Uso, entre em contato:</p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2">
                <li>
                  <strong>E-mail:</strong> novocode.tec@gmail.com
                </li>
                <li>
                  <strong>Telefone/WhatsApp:</strong> (47) 98881-5799
                </li>
                <li>
                  <strong>Endereço:</strong> Brusque, SC - Brasil
                </li>
                <li>
                  <strong>Site:</strong> www.novocode.com.br
                </li>
              </ul>
            </div>

            {/* 19. Disposições finais */}
            <h2>19. Disposições Finais</h2>
            <ul>
              <li>
                Se alguma cláusula for considerada inválida, as demais
                permanecem em vigor
              </li>
              <li>Estes termos constituem o acordo integral entre as partes</li>
              <li>
                Contratos específicos de projeto podem ter termos adicionais
              </li>
              <li>
                A tolerância com descumprimentos não constitui renúncia de
                direitos
              </li>
            </ul>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Estes Termos de Uso são válidos a partir de 11 de junho de 2025.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
