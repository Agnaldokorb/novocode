'use client';

import { useState, useEffect } from 'react';
import { SiteHeaderClient } from "./header-client";

interface SiteConfig {
  companyName?: string;
  logo?: string;
}

export function SiteHeader() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSiteConfig(data.data);
        }
      })
      .catch(error => {
        console.log("⚠️ Usando configurações padrão no header - erro ao buscar:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const companyName = siteConfig?.companyName || "NOVOCODE";
  const logo = siteConfig?.logo;

  return <SiteHeaderClient companyName={companyName} logo={logo} />;
}
