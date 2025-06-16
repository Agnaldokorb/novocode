import { getSiteConfig } from "@/actions/site-config";

// Server Component para buscar as cores e gerar CSS
export async function DynamicStylesNew() {
  // Tentar buscar configurações, mas não falhar se não conseguir
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch (error) {
    console.log("⚠️ Usando cores padrão - erro ao buscar configurações do banco:", error);
  }

  const primaryColor = siteConfig?.primaryColor || "#3b82f6";
  const secondaryColor = siteConfig?.secondaryColor || "#8b5cf6";

  // Função para converter hex para hsl
  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(
      l * 100
    )}%`;
  };

  const primaryHsl = hexToHsl(primaryColor);
  const secondaryHsl = hexToHsl(secondaryColor);

  const cssVariables = `
    :root {
      --primary-custom: ${primaryHsl};
      --secondary-custom: ${secondaryHsl};
      --primary-hex: ${primaryColor};
      --secondary-hex: ${secondaryColor};
    }
    
    .bg-primary-custom { background-color: hsl(var(--primary-custom)); }
    .text-primary-custom { color: hsl(var(--primary-custom)); }
    .border-primary-custom { border-color: hsl(var(--primary-custom)); }
    .bg-secondary-custom { background-color: hsl(var(--secondary-custom)); }
    .text-secondary-custom { color: hsl(var(--secondary-custom)); }
    .border-secondary-custom { border-color: hsl(var(--secondary-custom)); }
    
    /* Gradientes personalizados */
    .gradient-primary {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
    }
    
    .gradient-primary-text {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `.trim();

  return (
    <style
      id="dynamic-site-colors"
      dangerouslySetInnerHTML={{
        __html: cssVariables,
      }}
    />
  );
}
