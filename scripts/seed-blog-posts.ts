import { PrismaClient } from "@prisma/client";
import { PublicationStatus } from "@prisma/client";

const prisma = new PrismaClient();

const samplePosts = [
  {
    title: "Como o Next.js 15 Revoluciona o Desenvolvimento Web",
    slug: "nextjs-15-revoluciona-desenvolvimento-web",
    excerpt:
      "Descubra as principais novidades do Next.js 15 e como elas podem transformar seus projetos web. Exploramos as novas funcionalidades, melhorias de performance e recursos que tornam o desenvolvimento mais eficiente.",
    content: `# Como o Next.js 15 Revoluciona o Desenvolvimento Web

O Next.js 15 chegou com mudanças significativas que prometem revolucionar a forma como desenvolvemos aplicações web. Neste artigo, vamos explorar as principais novidades e como elas impactam o desenvolvimento moderno.

## Principais Novidades

### 1. React 19 Support
O Next.js 15 oferece suporte completo ao React 19, incluindo:
- Server Components melhorados
- Concurrent features
- Nova API de hooks

### 2. Turbopack Estável
O Turbopack finalmente chegou à versão estável, oferecendo:
- Build times 700% mais rápidos
- Hot Module Replacement instantâneo
- Melhor experiência de desenvolvimento

### 3. App Router Aprimorado
Melhorias significativas no App Router:
- Roteamento mais intuitivo
- Melhor cache management
- Streaming otimizado

## Performance

As melhorias de performance são impressionantes:
- 40% redução no tempo de build
- 25% menos uso de memória
- Carregamento de páginas 60% mais rápido

## Conclusão

O Next.js 15 representa um marco importante no desenvolvimento web, oferecendo ferramentas mais poderosas e uma experiência de desenvolvimento superior.`,
    category: "Tecnologia",
    tags: ["Next.js", "React", "Desenvolvimento Web", "Performance"],
    status: PublicationStatus.PUBLISHED,
    featured: true,
    metaTitle:
      "Next.js 15: Revolucionando o Desenvolvimento Web - NOVOCODE Blog",
    metaDescription:
      "Descubra as principais novidades do Next.js 15 e como elas revolucionam o desenvolvimento web. Performance, Turbopack e muito mais.",
    keywords: [
      "Next.js 15",
      "React 19",
      "Turbopack",
      "desenvolvimento web",
      "performance",
    ],
    readingTime: 5,
  },
  {
    title: "TypeScript vs JavaScript: Qual Escolher em 2025?",
    slug: "typescript-vs-javascript-2025",
    excerpt:
      "Uma análise completa das vantagens e desvantagens do TypeScript em relação ao JavaScript puro. Entenda quando usar cada um e por que o TypeScript está dominando o mercado.",
    content: `# TypeScript vs JavaScript: Qual Escolher em 2025?

A decisão entre TypeScript e JavaScript continua sendo um dos debates mais relevantes no desenvolvimento web. Vamos analisar os prós e contras de cada abordagem.

## JavaScript: A Base de Tudo

### Vantagens
- Simplicidade e facilidade de aprendizado
- Flexibilidade máxima
- Sem compilação necessária
- Ecossistema maduro

### Desvantagens
- Propenso a erros em runtime
- Dificuldade em projetos grandes
- Menos suporte de IDEs
- Refatoração complexa

## TypeScript: A Evolução

### Vantagens
- Type safety
- Melhor experiência de desenvolvimento
- Refatoração segura
- Excelente suporte de IDEs
- Catch de erros em build time

### Desvantagens
- Curva de aprendizado
- Configuração adicional
- Tempo de build
- Complexidade extra

## Quando Usar Cada Um?

### Use JavaScript quando:
- Projetos pequenos e simples
- Prototipagem rápida
- Equipe iniciante
- Projetos com deadline apertado

### Use TypeScript quando:
- Projetos médios a grandes
- Equipe experiente
- Manutenção de longo prazo
- Aplicações críticas

## Conclusão

Em 2025, o TypeScript se tornou o padrão para desenvolvimento profissional, oferecendo benefícios que superam os custos iniciais.`,
    category: "Desenvolvimento Web",
    tags: ["TypeScript", "JavaScript", "Comparação", "Desenvolvimento"],
    status: PublicationStatus.PUBLISHED,
    featured: true,
    metaTitle: "TypeScript vs JavaScript 2025: Guia Completo - NOVOCODE",
    metaDescription:
      "Análise completa entre TypeScript e JavaScript. Descubra qual escolher para seus projetos em 2025.",
    keywords: [
      "TypeScript",
      "JavaScript",
      "comparação",
      "desenvolvimento web",
      "2025",
    ],
    readingTime: 8,
  },
  {
    title: "Prisma ORM: O Futuro dos Bancos de Dados em Node.js",
    slug: "prisma-orm-futuro-bancos-dados-nodejs",
    excerpt:
      "Explore como o Prisma está transformando a forma como trabalhamos com bancos de dados em aplicações Node.js. Descubra suas vantagens, recursos e por que você deveria considerá-lo.",
    content: `# Prisma ORM: O Futuro dos Bancos de Dados em Node.js

O Prisma emergiu como uma das ferramentas mais inovadoras para trabalhar com bancos de dados em aplicações Node.js. Vamos explorar por que ele está conquistando desenvolvedores ao redor do mundo.

## O que é o Prisma?

O Prisma é um ORM moderno que oferece:
- Type-safe database access
- Auto-generated queries
- Schema declarativo
- Migrações automáticas

## Principais Vantagens

### 1. Type Safety
\`\`\`typescript
const user = await prisma.user.findUnique({
  where: { id: 1 }
})
// user é automaticamente tipado!
\`\`\`

### 2. Developer Experience
- IntelliSense completo
- Auto-completion
- Error catching em tempo de desenvolvimento

### 3. Performance
- Query optimization automática
- Connection pooling
- Lazy loading inteligente

## Comparação com Outros ORMs

| Feature | Prisma | TypeORM | Sequelize |
|---------|--------|---------|-----------|
| Type Safety | ✅ | ⚠️ | ❌ |
| Auto-generation | ✅ | ❌ | ❌ |
| Migration | ✅ | ✅ | ✅ |
| Performance | ✅ | ⚠️ | ⚠️ |

## Casos de Uso Ideais

- Aplicações TypeScript
- APIs RESTful
- GraphQL servers
- Aplicações full-stack

## Conclusão

O Prisma representa o futuro dos ORMs em Node.js, oferecendo uma experiência de desenvolvimento superior e performance otimizada.`,
    category: "Desenvolvimento Web",
    tags: ["Prisma", "ORM", "Node.js", "Database", "TypeScript"],
    status: PublicationStatus.PUBLISHED,
    featured: false,
    metaTitle: "Prisma ORM: O Futuro dos Bancos de Dados Node.js - NOVOCODE",
    metaDescription:
      "Descubra como o Prisma está revolucionando o trabalho com bancos de dados em Node.js. Vantagens, recursos e guia completo.",
    keywords: ["Prisma", "ORM", "Node.js", "banco de dados", "TypeScript"],
    readingTime: 6,
  },
  {
    title: "10 Dicas Para Melhorar a Performance de Aplicações React",
    slug: "10-dicas-performance-aplicacoes-react",
    excerpt:
      "Aprenda técnicas avançadas para otimizar a performance de suas aplicações React. Desde lazy loading até memoização, descubra como criar apps mais rápidas e eficientes.",
    content: `# 10 Dicas Para Melhorar a Performance de Aplicações React

A performance é crucial para o sucesso de qualquer aplicação React. Aqui estão 10 técnicas comprovadas para otimizar suas aplicações.

## 1. Use React.memo Para Componentes Puros

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* renderização complexa */}</div>
})
\`\`\`

## 2. Implemente Lazy Loading

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./MyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

## 3. Use useMemo Para Cálculos Caros

\`\`\`jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])
\`\`\`

## 4. Optimize Re-renders com useCallback

\`\`\`jsx
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
\`\`\`

## 5. Virtualize Listas Longas

Use bibliotecas como react-window para listas com muitos itens.

## 6. Code Splitting por Rotas

\`\`\`jsx
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
\`\`\`

## 7. Otimize Bundle Size

- Tree shaking
- Dynamic imports
- Bundle analysis

## 8. Use Profiler Para Identificar Gargalos

\`\`\`jsx
<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
\`\`\`

## 9. Minimize Re-renders Desnecessários

- Evite criar objetos inline
- Use refs para valores mutáveis
- Otimize context providers

## 10. Implemente Error Boundaries

\`\`\`jsx
class ErrorBoundary extends React.Component {
  // implementação
}
\`\`\`

## Conclusão

Implementar essas técnicas pode resultar em melhorias significativas de performance, proporcionando uma melhor experiência do usuário.`,
    category: "Desenvolvimento Web",
    tags: ["React", "Performance", "Otimização", "JavaScript"],
    status: PublicationStatus.PUBLISHED,
    featured: false,
    metaTitle: "10 Dicas de Performance React - NOVOCODE Blog",
    metaDescription:
      "Aprenda 10 técnicas avançadas para otimizar a performance de aplicações React. Memoização, lazy loading e muito mais.",
    keywords: [
      "React",
      "performance",
      "otimização",
      "memoização",
      "lazy loading",
    ],
    readingTime: 7,
  },
  {
    title:
      "Introdução ao Design System: Como Criar Consistência em Produtos Digitais",
    slug: "introducao-design-system-consistencia-produtos-digitais",
    excerpt:
      "Entenda o que são Design Systems e como eles podem transformar o desenvolvimento de produtos digitais. Aprenda a criar e implementar seu próprio sistema de design.",
    content: `# Introdução ao Design System: Como Criar Consistência em Produtos Digitais

Os Design Systems se tornaram fundamentais no desenvolvimento de produtos digitais modernos. Vamos explorar o que são e como implementá-los efetivamente.

## O que é um Design System?

Um Design System é uma coleção de componentes reutilizáveis, guias de estilo e padrões que garantem consistência visual e funcional em produtos digitais.

## Componentes de um Design System

### 1. Tokens de Design
- Cores
- Tipografia
- Espaçamentos
- Sombras
- Bordas

### 2. Componentes UI
- Botões
- Inputs
- Cards
- Modais
- Navegação

### 3. Padrões
- Layout grids
- Padrões de navegação
- Microinterações
- Estados de erro

## Benefícios

### Para Desenvolvedores
- Reutilização de código
- Desenvolvimento mais rápido
- Menos bugs
- Melhor manutenibilidade

### Para Designers
- Consistência visual
- Prototipagem rápida
- Foco na experiência
- Colaboração eficiente

### Para o Negócio
- Time to market reduzido
- Menor custo de manutenção
- Experiência consistente
- Escalabilidade

## Ferramentas Populares

### Para Design
- Figma
- Sketch
- Adobe XD

### Para Desenvolvimento
- Storybook
- Styled Components
- Tailwind CSS
- Chakra UI

## Como Implementar

### 1. Auditoria
Analise componentes existentes e identifique padrões.

### 2. Definição
Estabeleça tokens e componentes base.

### 3. Desenvolvimento
Implemente componentes reutilizáveis.

### 4. Documentação
Crie guias e exemplos de uso.

### 5. Adoção
Treine equipes e promova o uso.

## Melhores Práticas

- Comece pequeno
- Documente tudo
- Mantenha versionamento
- Colete feedback
- Itere constantemente

## Conclusão

Um Design System bem implementado é um investimento que paga dividendos a longo prazo, melhorando produtividade e qualidade dos produtos.`,
    category: "Design",
    tags: ["Design System", "UI/UX", "Consistência", "Componentes"],
    status: PublicationStatus.DRAFT,
    featured: false,
    metaTitle: "Design System: Guia Completo - NOVOCODE Blog",
    metaDescription:
      "Entenda o que são Design Systems e como criar consistência em produtos digitais. Guia completo com implementação e melhores práticas.",
    keywords: [
      "design system",
      "UI/UX",
      "componentes",
      "consistência",
      "tokens",
    ],
    readingTime: 9,
  },
];

async function seedBlogPosts() {
  console.log("🌱 Populando posts do blog...");

  try {
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

    for (const postData of samplePosts) {
      // Verificar se o post já existe
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: postData.slug },
      });

      if (existingPost) {
        console.log(`⏭️  Já existe: ${postData.title}`);
        existingCount++;
        continue;
      }

      // Definir data de publicação para posts publicados
      const publishedAt =
        postData.status === PublicationStatus.PUBLISHED ? new Date() : null;

      // Criar post
      const post = await prisma.blogPost.create({
        data: {
          ...postData,
          publishedAt,
          createdBy: adminUser.id,
        },
      });

      console.log(`✅ Criado: ${post.title} (${postData.category})`);
      createdCount++;
    }

    console.log("\n🎉 Concluído!");
    console.log(`✅ ${createdCount} posts criados`);
    console.log(`⏭️  ${existingCount} posts já existiam`);
    console.log(`📊 Total: ${createdCount + existingCount} posts`);
  } catch (error) {
    console.error("❌ Erro ao popular posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBlogPosts();
