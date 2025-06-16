import { getSiteConfig } from "@/actions/site-config";
import { SiteHeaderClient } from "./header-client";

export async function SiteHeader() {
  // Tentar buscar configurações, mas não falhar se não conseguir
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch (error) {
    console.log("⚠️ Usando configurações padrão no header - erro ao buscar do banco:", error);
  }

  const companyName = siteConfig?.companyName || "NOVOCODE";
  const logo = siteConfig?.logo;

  return <SiteHeaderClient companyName={companyName} logo={logo} />;
}
