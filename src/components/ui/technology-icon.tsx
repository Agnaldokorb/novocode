"use client";

import Image from "next/image";
import { Code2 } from "lucide-react";
import { useState } from "react";

interface TechnologyIconProps {
  tech: {
    name: string;
    icon?: string | null;
    color?: string | null;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
  fallbackColor?: "white" | "gray";
}

// Função para verificar se é uma URL válida
function isValidUrl(url: string): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    const isHttp = url.startsWith("http") || url.startsWith("https");

    // Lista de domínios permitidos
    const allowedDomains = [
      "supabase.co",
      "cdn.jsdelivr.net",
      "raw.githubusercontent.com",
      "devicons.github.io",
      "unpkg.com",
      "cdnjs.cloudflare.com",
    ];

    const isAllowedDomain = allowedDomains.some((domain) =>
      urlObj.hostname.includes(domain)
    );

    return isHttp && isAllowedDomain;
  } catch {
    return false;
  }
}

export function TechnologyIcon({
  tech,
  size = "md",
  className = "",
  fallbackColor = "gray",
}: TechnologyIconProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  };

  // Se tem ícone, é uma URL válida e não houve erro ao carregar
  if (tech.icon && isValidUrl(tech.icon) && !imageError) {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center ${className}`}
      >
        <Image
          src={tech.icon}
          alt={`Ícone do ${tech.name}`}
          width={dimensions[size].width}
          height={dimensions[size].height}
          className="object-contain"
          unoptimized
          onError={() => {
            console.warn(
              `Erro ao carregar imagem para ${tech.name}: ${tech.icon}`
            );
            setImageError(true);
          }}
        />
      </div>
    );
  }

  // Fallback para ícone genérico
  const iconColor = fallbackColor === "white" ? "text-white" : "text-gray-600";
  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center ${className}`}
    >
      <Code2 className={`${sizeClasses[size]} ${iconColor}`} />
    </div>
  );
}
