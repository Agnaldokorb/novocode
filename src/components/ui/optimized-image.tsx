"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Code } from "lucide-react";

interface OptimizedImageProps extends ImageProps {
  src: string;
  fallbackIcon?: boolean;
}

/**
 * Wrapper para next/image que automaticamente detecta imagens do Supabase
 * e aplica unoptimized=true quando necessário para evitar erros de hostname não configurado
 */
export function OptimizedImage({ 
  src, 
  alt, 
  fallbackIcon = false,
  onError,
  ...props 
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  
  // Detecta se é uma imagem do Supabase Storage
  const isSupabaseImage = src.includes("supabase.co");

  const handleError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(error);
  };

  if (hasError && fallbackIcon) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Code className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt} 
      unoptimized={isSupabaseImage} 
      onError={handleError}
      {...props} 
    />
  );
}
