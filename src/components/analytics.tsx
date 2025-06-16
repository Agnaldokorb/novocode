import { getSiteConfig } from "@/actions/site-config";
import Script from "next/script";

export async function GoogleAnalytics() {
  // Tentar buscar configurações, mas não falhar se não conseguir
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch (error) {
    console.log("⚠️ Analytics desabilitado - erro ao buscar configurações do banco:", error);
    return null;
  }

  if (!siteConfig?.googleAnalyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.googleAnalyticsId}');
        `}
      </Script>
    </>
  );
}

export async function FacebookPixel() {
  // Tentar buscar configurações, mas não falhar se não conseguir
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch (error) {
    console.log("⚠️ Facebook Pixel desabilitado - erro ao buscar configurações do banco:", error);
    return null;
  }

  if (!siteConfig?.facebookPixelId) {
    return null;
  }

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${siteConfig.facebookPixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
