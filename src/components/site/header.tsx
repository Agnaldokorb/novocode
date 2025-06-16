import { getSiteConfig } from "@/actions/site-config";
import { SiteHeaderClient } from "./header-client";

export async function SiteHeader() {
  const siteConfig = await getSiteConfig();

  const companyName = siteConfig?.companyName || "NOVOCODE";
  const logo = siteConfig?.logo;

  return <SiteHeaderClient companyName={companyName} logo={logo} />;
}
