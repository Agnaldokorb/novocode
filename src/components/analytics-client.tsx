'use client';

import { useEffect, useState } from 'react';
import Script from "next/script";

interface SiteConfig {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export function GoogleAnalytics() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.data);
        }
      })
      .catch(error => {
        console.log("⚠️ Analytics desabilitado - erro ao buscar configurações:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !config?.googleAnalyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.googleAnalyticsId}');
        `}
      </Script>
    </>
  );
}

export function FacebookPixel() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.data);
        }
      })
      .catch(error => {
        console.log("⚠️ Facebook Pixel desabilitado - erro ao buscar configurações:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !config?.facebookPixelId) {
    return null;
  }

  return (
    <Script
      id="facebook-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${config.facebookPixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
