import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends ImageProps {
  src: string;
}

/**
 * Wrapper para next/image que automaticamente detecta imagens do Supabase
 * e aplica unoptimized=true quando necessário para evitar erros de hostname não configurado
 */
export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  // Detecta se é uma imagem do Supabase Storage
  const isSupabaseImage = src.includes("supabase.co");

  return <Image src={src} alt={alt} unoptimized={isSupabaseImage} {...props} />;
}
