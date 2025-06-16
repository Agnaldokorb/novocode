import { PrismaClient } from "@prisma/client";
import { ServiceType, PublicationStatus } from "@prisma/client";

const prisma = new PrismaClient();

const sampleServices = [
  {
    title: "Desenvolvimento de Sites Profissionais",
    slug: "desenvolvimento-sites-profissionais",
    shortDescription:
      "Criamos sites modernos, responsivos e otimizados para SEO que ajudam sua empresa a se destacar online.",
    description: `## Desenvolvimento de Sites Profissionais

Criamos sites modernos e responsivos que ajudam sua empresa a ter uma presença digital forte e profissional.

### O que oferecemos:

- **Design Responsivo**: Sites que funcionam perfeitamente em todos os dispositivos
- **Otimização SEO**: Melhor posicionamento nos motores de busca
- **Performance**: Carregamento rápido e experiência fluida
- **CMS Personalizado**: Gerencie seu conteúdo facilmente
- **Integração**: Conecte com suas ferramentas existentes

### Tecnologias Utilizadas:

- Next.js para performance máxima
- React para interfaces interativas
- TypeScript para código mais seguro
- Tailwind CSS para design moderno
- Supabase para backend robusto`,
    type: ServiceType.WEB,
    status: PublicationStatus.PUBLISHED,
    featured: true,
    price: 2500.0,
    priceDescription: "A partir de",
    features: [
      "Design responsivo e moderno",
      "Otimização para SEO",
      "Painel administrativo",
      "Integração com redes sociais",
      "Formulários de contato",
      "Galeria de imagens",
      "Blog integrado",
      "Google Analytics",
    ],
    benefits: [
      "Maior visibilidade online",
      "Geração de leads qualificados",
      "Credibilidade profissional",
      "Facilidade de manutenção",
      "Melhor experiência do usuário",
    ],
    deliverables: [
      "Site completo e funcional",
      "Painel administrativo",
      "Documentação técnica",
      "Treinamento de uso",
      "3 meses de suporte gratuito",
    ],
    metaTitle: "Desenvolvimento de Sites Profissionais - NOVOCODE",
    metaDescription:
      "Criamos sites modernos, responsivos e otimizados para SEO. Aumente sua presença digital com a NOVOCODE.",
    keywords: [
      "site profissional",
      "desenvolvimento web",
      "design responsivo",
      "SEO",
      "Next.js",
    ],
  },
  {
    title: "Sistemas de Gestão Empresarial",
    slug: "sistemas-gestao-empresarial",
    shortDescription:
      "Desenvolvemos sistemas personalizados para otimizar processos e aumentar a produtividade da sua empresa.",
    description: `## Sistemas de Gestão Empresarial

Desenvolvemos sistemas personalizados que automatizam processos e aumentam a eficiência operacional da sua empresa.

### Características principais:

- **Gestão Completa**: Controle todos os processos em uma única plataforma
- **Relatórios Avançados**: Dashboards e relatórios em tempo real
- **Segurança**: Controle de acesso e backup automático
- **Escalabilidade**: Cresce junto com sua empresa
- **Integração**: Conecta com sistemas existentes

### Módulos disponíveis:

- Gestão financeira
- Controle de estoque
- Vendas e CRM
- Recursos humanos
- Relatórios gerenciais`,
    type: ServiceType.DEVELOPMENT,
    status: PublicationStatus.PUBLISHED,
    featured: true,
    price: 8000.0,
    priceDescription: "A partir de",
    features: [
      "Interface intuitiva",
      "Controle de usuários",
      "Backup automático",
      "Relatórios customizáveis",
      "API para integrações",
      "Suporte multiplataforma",
      "Notificações em tempo real",
      "Auditoria de dados",
    ],
    benefits: [
      "Redução de custos operacionais",
      "Maior controle dos processos",
      "Tomada de decisão baseada em dados",
      "Aumento da produtividade",
      "Eliminação de retrabalho",
    ],
    deliverables: [
      "Sistema completo",
      "Manual do usuário",
      "Treinamento da equipe",
      "Migração de dados",
      "6 meses de suporte",
    ],
    metaTitle: "Sistemas de Gestão Empresarial - NOVOCODE",
    metaDescription:
      "Sistemas personalizados para otimizar processos empresariais. Aumente a produtividade com a NOVOCODE.",
    keywords: [
      "sistema de gestão",
      "ERP",
      "automação",
      "processos empresariais",
      "software personalizado",
    ],
  },
  {
    title: "Aplicativos Mobile",
    slug: "aplicativos-mobile",
    shortDescription:
      "Desenvolvemos aplicativos nativos e híbridos para iOS e Android com foco na experiência do usuário.",
    description: `## Desenvolvimento de Aplicativos Mobile

Criamos aplicativos móveis que conectam sua empresa aos seus clientes de forma inovadora e eficiente.

### Plataformas suportadas:

- **iOS**: Apps nativos para iPhone e iPad
- **Android**: Apps para toda a família Android
- **Cross-platform**: Uma base de código para ambas as plataformas

### Funcionalidades avançadas:

- Push notifications
- Geolocalização
- Pagamentos integrados
- Chat em tempo real
- Offline capability
- Sincronização em nuvem`,
    type: ServiceType.MOBILE,
    status: PublicationStatus.PUBLISHED,
    featured: false,
    price: 5000.0,
    priceDescription: "A partir de",
    features: [
      "Design nativo para cada plataforma",
      "Integração com APIs",
      "Push notifications",
      "Modo offline",
      "Pagamentos integrados",
      "Analytics integrado",
      "Testes automatizados",
      "Deploy nas lojas",
    ],
    benefits: [
      "Proximidade com clientes",
      "Novos canais de vendas",
      "Melhoria na experiência",
      "Dados de comportamento",
      "Vantagem competitiva",
    ],
    deliverables: [
      "App para iOS e Android",
      "Código fonte",
      "Documentação técnica",
      "Publicação nas lojas",
      "4 meses de suporte",
    ],
    metaTitle: "Desenvolvimento de Aplicativos Mobile - NOVOCODE",
    metaDescription:
      "Apps nativos e híbridos para iOS e Android. Conecte-se aos seus clientes com a NOVOCODE.",
    keywords: ["app mobile", "iOS", "Android", "React Native", "aplicativo"],
  },
  {
    title: "APIs e Integrações",
    slug: "apis-integracoes",
    shortDescription:
      "Desenvolvemos APIs robustas e integrações para conectar seus sistemas e automatizar processos.",
    description: `## APIs e Integrações de Sistemas

Conectamos seus sistemas e automatizamos processos através de APIs robustas e integrações personalizadas.

### Tipos de integração:

- **APIs REST**: Serviços web modernos e escaláveis
- **GraphQL**: Consultas eficientes e flexíveis
- **Webhooks**: Notificações em tempo real
- **Microserviços**: Arquitetura modular e escalável

### Integrações comuns:

- Sistemas de pagamento
- ERPs e CRMs
- Marketplaces
- Redes sociais
- Serviços de entrega
- Ferramentas de marketing`,
    type: ServiceType.API,
    status: PublicationStatus.PUBLISHED,
    featured: false,
    price: 3000.0,
    priceDescription: "A partir de",
    features: [
      "APIs RESTful",
      "Documentação completa",
      "Autenticação segura",
      "Rate limiting",
      "Monitoramento",
      "Versionamento",
      "Testes automatizados",
      "Deploy automatizado",
    ],
    benefits: [
      "Automatização de processos",
      "Redução de erros manuais",
      "Integração de dados",
      "Escalabilidade",
      "Tempo real",
    ],
    deliverables: [
      "API documentada",
      "SDK de integração",
      "Testes de carga",
      "Monitoramento",
      "3 meses de suporte",
    ],
    metaTitle: "APIs e Integrações de Sistemas - NOVOCODE",
    metaDescription:
      "APIs robustas e integrações personalizadas. Conecte seus sistemas com a NOVOCODE.",
    keywords: [
      "API",
      "integração",
      "REST",
      "GraphQL",
      "microserviços",
      "automação",
    ],
  },
  {
    title: "Consultoria em Tecnologia",
    slug: "consultoria-tecnologia",
    shortDescription:
      "Ajudamos sua empresa a escolher as melhores tecnologias e definir estratégias digitais eficientes.",
    description: `## Consultoria em Tecnologia

Oferecemos consultoria especializada para ajudar sua empresa a tomar as melhores decisões tecnológicas e implementar soluções eficientes.

### Áreas de atuação:

- **Arquitetura de Software**: Definição de arquiteturas escaláveis
- **Escolha de Tecnologias**: Seleção das melhores ferramentas
- **Transformação Digital**: Modernização de processos
- **DevOps**: Automação e melhores práticas
- **Segurança**: Análise e implementação de segurança

### Metodologia:

1. Análise da situação atual
2. Identificação de oportunidades
3. Definição de estratégia
4. Plano de implementação
5. Acompanhamento dos resultados`,
    type: ServiceType.DEVELOPMENT,
    status: PublicationStatus.PUBLISHED,
    featured: false,
    price: 150.0,
    priceDescription: "Por hora",
    features: [
      "Análise técnica detalhada",
      "Documentação completa",
      "Recomendações práticas",
      "Roadmap tecnológico",
      "Treinamento da equipe",
      "Acompanhamento",
      "Relatórios periódicos",
      "Suporte contínuo",
    ],
    benefits: [
      "Decisões mais assertivas",
      "Redução de riscos",
      "Otimização de recursos",
      "Modernização eficiente",
      "Capacitação da equipe",
    ],
    deliverables: [
      "Relatório de análise",
      "Plano de ação",
      "Documentação técnica",
      "Treinamentos",
      "Acompanhamento mensal",
    ],
    metaTitle: "Consultoria em Tecnologia - NOVOCODE",
    metaDescription:
      "Consultoria especializada para decisões tecnológicas assertivas. Transforme sua empresa com a NOVOCODE.",
    keywords: [
      "consultoria",
      "tecnologia",
      "transformação digital",
      "arquitetura",
      "DevOps",
    ],
  },
];

async function seedServices() {
  console.log("🌱 Populando serviços...");

  try {
    // Buscar tecnologias existentes para associar aos serviços
    const technologies = await prisma.technology.findMany();

    if (technologies.length === 0) {
      console.log(
        "⚠️  Nenhuma tecnologia encontrada. Execute primeiro o script de tecnologias."
      );
      return;
    }

    // Buscar usuário admin
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminUser) {
      console.log(
        "⚠️  Usuário admin não encontrado. Execute primeiro o script de criação de usuário."
      );
      return;
    }

    let createdCount = 0;
    let existingCount = 0;

    for (const serviceData of sampleServices) {
      // Verificar se o serviço já existe
      const existingService = await prisma.service.findUnique({
        where: { slug: serviceData.slug },
      });

      if (existingService) {
        console.log(`⏭️  Já existe: ${serviceData.title}`);
        existingCount++;
        continue;
      }

      // Selecionar tecnologias relevantes baseadas no tipo de serviço
      let relevantTechIds: string[] = [];

      switch (serviceData.type) {
        case ServiceType.WEB:
          relevantTechIds = technologies
            .filter((t) =>
              ["React", "Next.js", "TypeScript", "Tailwind CSS"].includes(
                t.name
              )
            )
            .map((t) => t.id);
          break;
        case ServiceType.DEVELOPMENT:
          relevantTechIds = technologies
            .filter((t) =>
              [
                "React",
                "Node.js",
                "TypeScript",
                "PostgreSQL",
                "Prisma",
              ].includes(t.name)
            )
            .map((t) => t.id);
          break;
        case ServiceType.MOBILE:
          relevantTechIds = technologies
            .filter((t) => ["React", "TypeScript", "Node.js"].includes(t.name))
            .map((t) => t.id);
          break;
        case ServiceType.API:
          relevantTechIds = technologies
            .filter((t) =>
              ["Node.js", "TypeScript", "PostgreSQL", "Prisma"].includes(t.name)
            )
            .map((t) => t.id);
          break;
        default:
          relevantTechIds = technologies.slice(0, 3).map((t) => t.id);
      }

      // Criar serviço
      const service = await prisma.service.create({
        data: {
          ...serviceData,
          createdBy: adminUser.id,
          technologies: {
            connect: relevantTechIds.map((id) => ({ id })),
          },
        },
      });

      console.log(`✅ Criado: ${service.title} (${serviceData.type})`);
      createdCount++;
    }

    console.log("\n🎉 Concluído!");
    console.log(`✅ ${createdCount} serviços criados`);
    console.log(`⏭️  ${existingCount} serviços já existiam`);
    console.log(`📊 Total: ${createdCount + existingCount} serviços`);
  } catch (error) {
    console.error("❌ Erro ao popular serviços:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedServices();
