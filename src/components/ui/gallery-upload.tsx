"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2, Plus } from "lucide-react";
import {
  uploadFile,
  deleteFile,
  extractFilePathFromUrl,
  type UploadOptions,
  type UploadResult,
} from "@/lib/storage";
import { toast } from "sonner";

interface GalleryUploadProps {
  value?: string[]; // Array de URLs das imagens
  onChange: (urls: string[]) => void;
  uploadConfig: UploadOptions;
  label?: string;
  placeholder?: string;
  className?: string;
  maxImages?: number;
}

export function GalleryUpload({
  value = [],
  onChange,
  uploadConfig,
  label,

  className = "",
  maxImages = 10,
}: GalleryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Verificar limite de imagens
    if (value.length + files.length > maxImages) {
      toast.error(`Máximo de ${maxImages} imagens permitidas`);
      return;
    }

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadingIndex(value.length + i);

        const result: UploadResult = await uploadFile(file, uploadConfig);

        if (result.success && result.url) {
          newUrls.push(result.url);
        } else {
          toast.error(`Erro ao enviar ${file.name}: ${result.error}`);
        }
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls]);
        toast.success(`${newUrls.length} imagem(ns) enviada(s) com sucesso!`);
      }
    } catch (error) {
      toast.error("Erro inesperado ao enviar imagens");
      console.error("Erro no upload:", error);
    } finally {
      setIsUploading(false);
      setUploadingIndex(null);
      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async (index: number) => {
    const urlToRemove = value[index];
    if (!urlToRemove) return;

    try {
      // Deletar do storage
      const filePath = extractFilePathFromUrl(urlToRemove);
      if (filePath) {
        await deleteFile(filePath, uploadConfig.bucket);
      }

      // Remover da lista
      const newUrls = value.filter((_, i) => i !== index);
      onChange(newUrls);
      toast.success("Imagem removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover imagem");
      console.error("Erro ao remover:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newUrls = [...value];
    const [movedItem] = newUrls.splice(fromIndex, 1);
    newUrls.splice(toIndex, 0, movedItem);
    onChange(newUrls);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      {/* Grid de Imagens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
          >
            <Image
              src={url}
              alt={`Imagem ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              onError={() => {
                toast.error(`Erro ao carregar imagem ${index + 1}`);
                const newUrls = value.filter((_, i) => i !== index);
                onChange(newUrls);
              }}
            />

            {/* Overlay com ações */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              {/* Botão de mover para esquerda */}
              {index > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => moveImage(index, index - 1)}
                  className="h-8 w-8 p-0"
                >
                  ←
                </Button>
              )}

              {/* Botão de remover */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(index)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Botão de mover para direita */}
              {index < value.length - 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => moveImage(index, index + 1)}
                  className="h-8 w-8 p-0"
                >
                  →
                </Button>
              )}
            </div>

            {/* Indicador de posição */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </div>
          </div>
        ))}

        {/* Slot de Loading durante upload */}
        {isUploading && uploadingIndex !== null && (
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-gray-500" />
              <div className="text-xs text-gray-500">Enviando...</div>
            </div>
          </div>
        )}

        {/* Botão de Adicionar */}
        {value.length < maxImages && (
          <div
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={triggerFileInput}
          >
            <div className="text-center">
              <div className="mx-auto h-8 w-8 text-gray-400 mb-2">
                {isUploading ? (
                  <Loader2 className="h-full w-full animate-spin" />
                ) : (
                  <Plus className="h-full w-full" />
                )}
              </div>
              <div className="text-xs text-gray-500">
                {isUploading ? "Enviando..." : "Adicionar"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="text-xs text-gray-500 space-y-1">
        <div>
          {value.length} de {maxImages} imagens
        </div>
        <div>Tamanho máximo: {uploadConfig.maxSizeInMB || 5}MB por imagem</div>
        <div>
          Formatos:{" "}
          {uploadConfig.allowedTypes
            ?.map((type) => type.split("/")[1])
            .join(", ") || "JPG, PNG, WebP"}
        </div>
      </div>

      {/* Input de arquivo (hidden) */}
      <Input
        ref={fileInputRef}
        type="file"
        accept={uploadConfig.allowedTypes?.join(",") || "image/*"}
        onChange={handleFileSelect}
        multiple
        className="hidden"
      />
    </div>
  );
}
