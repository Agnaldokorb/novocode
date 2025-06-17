import { SiteHeader } from "@/components/site/header-static";
import { SiteFooter } from "@/components/site/footer";
import { GoogleAnalytics, FacebookPixel } from "@/components/analytics-client";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleAnalytics />
      <FacebookPixel />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
