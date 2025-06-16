"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import {
  uploadFile,
  deleteFile,
  extractFilePathFromUrl,
  type UploadOptions,
  type UploadResult,
} from "@/lib/storage";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string; // URL atual da imagem
  onChange: (url: string | null) => void;
  uploadConfig: UploadOptions;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  uploadConfig,
  label,
  placeholder = "Selecione uma imagem",
  className = "",
  required = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Criar preview local
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Fazer upload
      const result: UploadResult = await uploadFile(file, uploadConfig);

      if (result.success && result.url) {
        // Limpar preview local
        URL.revokeObjectURL(previewUrl);

        // Deletar imagem anterior se existir
        if (value) {
          const oldPath = extractFilePathFromUrl(value);
          if (oldPath) {
            await deleteFile(oldPath, uploadConfig.bucket);
          }
        }

        // Atualizar com nova URL
        setPreview(result.url);
        onChange(result.url);
        toast.success("Imagem enviada com sucesso!");
      } else {
        // Reverter preview em caso de erro
        setPreview(value || null);
        toast.error(result.error || "Erro ao enviar imagem");
      }
    } catch (error) {
      setPreview(value || null);
      toast.error("Erro inesperado ao enviar imagem");
      console.error("Erro no upload:", error);
    } finally {
      setIsUploading(false);
      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      // Deletar do storage
      const filePath = extractFilePathFromUrl(value);
      if (filePath) {
        await deleteFile(filePath, uploadConfig.bucket);
      }

      // Limpar state
      setPreview(null);
      onChange(null);
      toast.success("Imagem removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover imagem");
      console.error("Erro ao remover:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* Área de Preview/Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
        {preview ? (
          // Preview da Imagem
          <div className="relative group">
            <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                onError={() => {
                  setPreview(null);
                  onChange(null);
                  toast.error("Erro ao carregar imagem");
                }}
              />
            </div>

            {/* Overlay com ações */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Alterar
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
                Remover
              </Button>
            </div>
          </div>
        ) : (
          // Área de Upload
          <div
            className="text-center py-8 cursor-pointer"
            onClick={triggerFileInput}
          >
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <ImageIcon className="h-full w-full" />
            </div>
            <div className="text-sm text-gray-600 mb-2">{placeholder}</div>
            <div className="text-xs text-gray-500">
              Tamanho máximo: {uploadConfig.maxSizeInMB || 5}MB
            </div>
            <div className="text-xs text-gray-500">
              Formatos:{" "}
              {uploadConfig.allowedTypes
                ?.map((type) => type.split("/")[1])
                .join(", ") || "JPG, PNG, WebP"}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Imagem
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Input de arquivo (hidden) */}
      <Input
        ref={fileInputRef}
        type="file"
        accept={uploadConfig.allowedTypes?.join(",") || "image/*"}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
