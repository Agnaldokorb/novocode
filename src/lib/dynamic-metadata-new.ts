import type { Metadata } from "next";
import { getSiteConfig } from "@/actions/site-config";

/**
 * Gera metadata dinâmico baseado nas configurações do site
 */
export async function generateDynamicMetadata(
  overrides: Partial<{
    title: string;
    description: string;
    keywords: string[];
    images: string[];
    url: string;
  }> = {}
): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  // Valores padrão caso não existam configurações
  const defaultTitle = "NOVOCODE - Desenvolvimento de Software e Consultoria";
  const defaultDescription =
    "Especialistas em desenvolvimento de sistemas web, mobile e consultoria em tecnologia. Transformamos suas ideias em soluções digitais inovadoras.";
  const defaultKeywords = [
    "desenvolvimento",
    "software",
    "consultoria",
    "web",
    "mobile",
    "tecnologia",
  ];

  // Usar configurações do banco ou valores padrão
  const baseTitle = siteConfig?.defaultMetaTitle || defaultTitle;
  const baseDescription =
    siteConfig?.defaultMetaDescription || defaultDescription;
  const baseKeywords = siteConfig?.defaultKeywords?.length
    ? siteConfig.defaultKeywords
    : defaultKeywords;
  const companyName = siteConfig?.companyName || "NOVOCODE";

  // Combinar com overrides
  const finalTitle = overrides.title
    ? `${overrides.title} | ${companyName}`
    : baseTitle;
  const finalDescription = overrides.description || baseDescription;
  const finalKeywords = overrides.keywords
    ? [...overrides.keywords, ...baseKeywords]
    : baseKeywords;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type: "website",
      locale: "pt_BR",
      siteName: companyName,
      images: overrides.images || [],
      url: overrides.url,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: overrides.images || [],
    },
    // Configurar favicon dinâmico
    icons: siteConfig?.favicon
      ? {
          icon: siteConfig.favicon,
          shortcut: siteConfig.favicon,
          apple: siteConfig.favicon,
        }
      : undefined,
    // Outros metadados
    robots: {
      index: !siteConfig?.maintenanceMode,
      follow: !siteConfig?.maintenanceMode,
    },
    ...(siteConfig?.googleAnalyticsId && {
      other: {
        "google-site-verification": siteConfig.googleAnalyticsId,
      },
    }),
  };
}
