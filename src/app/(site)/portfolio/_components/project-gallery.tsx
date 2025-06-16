"use client";

import React, { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectGalleryProps {
  gallery: string[];
  title: string;
}

export function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = React.useCallback(() => {
    setSelectedImage(null);
  }, []);

  const nextImage = React.useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % gallery.length);
    }
  }, [selectedImage, gallery.length]);

  const prevImage = React.useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? gallery.length - 1 : selectedImage - 1
      );
    }
  }, [selectedImage, gallery.length]); // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    },
    [selectedImage, nextImage, prevImage, closeLightbox]
  );

  // Add keyboard listeners
  React.useEffect(() => {
    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, handleKeyDown]);

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-blue-600" />
        Galeria do Projeto
      </h3>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            {" "}
            <OptimizedImage
              src={image}
              alt={`${title} - Imagem ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>
          {/* Navigation Buttons */}
          {gallery.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20 z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-16 text-white hover:bg-white/20 z-10"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}{" "}
          {/* Image */}
          <div className="relative max-w-7xl max-h-[90vh] mx-4">
            <OptimizedImage
              src={gallery[selectedImage]}
              alt={`${title} - Imagem ${selectedImage + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedImage + 1} de {gallery.length}
          </div>
          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeLightbox} />
        </div>
      )}
    </div>
  );
}
