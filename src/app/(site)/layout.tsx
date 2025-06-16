import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { GoogleAnalytics, FacebookPixel } from "@/components/analytics";
import { MaintenanceWrapper } from "@/components/maintenance-wrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaintenanceWrapper>
      <GoogleAnalytics />
      <FacebookPixel />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </MaintenanceWrapper>
  );
}
