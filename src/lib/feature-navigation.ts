export type FeatureItem = {
  label: string;
  slug: string;
};

type FeatureGroup = {
  title: string;
  items: readonly FeatureItem[];
};

export const featureGroups = [
  {
    title: "CRM e Vendas",
    items: [
      { label: "CRM", slug: "crm" },
      { label: "Pagamentos", slug: "pagamentos" },
      { label: "Disparo de Campanhas", slug: "disparo-de-campanhas" },
      { label: "Carteirização", slug: "carteirizacao" },
    ],
  },
  {
    title: "Atendimento",
    items: [
      { label: "Atendimento", slug: "atendimento" },
      { label: "Grupos na API Oficial", slug: "grupos-na-api-oficial" },
      { label: "Mensagens Agendadas", slug: "mensagens-agendadas" },
      { label: "Chat Interno", slug: "chat-interno" },
      { label: "Distribuição Automática", slug: "distribuicao-automatica" },
    ],
  },
  {
    title: "Automações & IA",
    items: [
      { label: "Agentes de IA", slug: "agentes-de-ia" },
      { label: "Chatbot", slug: "chatbot" },
      { label: "Sequências", slug: "sequencias" },
      { label: "Automações", slug: "automacoes" },
    ],
  },
] as const satisfies readonly FeatureGroup[];

export const features: readonly FeatureItem[] = featureGroups.flatMap(
  (group): readonly FeatureItem[] => group.items,
);

export function getFeatureBySlug(slug: string) {
  return features.find((feature) => feature.slug === slug);
}

export function getFeatureHref(slug: string) {
  return `/funcionalidades/${slug}`;
}
