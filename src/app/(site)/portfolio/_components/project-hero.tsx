"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  Github,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PortfolioPublic } from "@/types";

interface ProjectHeroProps {
  project: PortfolioPublic;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const formatDate = (date: Date | string | null) => {
    if (!date) return "Data não informada";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            Concluído
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            Em Andamento
          </Badge>
        );
      case "PLANNING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Planejamento
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:bg-white/10 p-0"
          >
            <Link href="/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Portfólio
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Project Info */}
          <div>
            {/* Status & Featured */}
            <div className="flex items-center gap-3 mb-6">
              {getStatusBadge(project.status)}
              {project.featured && (
                <Badge className="bg-yellow-500 text-yellow-900 border-yellow-400">
                  Projeto em Destaque
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Project Meta */}
            <div className="space-y-3 mb-8">
              {project.clientName && (
                <div className="flex items-center gap-3 text-blue-200">
                  <User className="w-5 h-5" />
                  <span>Cliente: {project.clientName}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-blue-200">
                <Calendar className="w-5 h-5" />
                <span>
                  {project.startDate && project.endDate
                    ? `${formatDate(project.startDate)} - ${formatDate(
                        project.endDate
                      )}`
                    : formatDate(project.endDate || project.startDate)}
                </span>
              </div>

              {project.duration && (
                <div className="flex items-center gap-3 text-blue-200">
                  <Clock className="w-5 h-5" />
                  <span>Duração: {project.duration}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                >
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Ver Projeto
                  </Link>
                </Button>
              )}

              {project.repositoryUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  <Link
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Código Fonte
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Project Image */}
          <div className="relative">
            {" "}
            {project.thumbnail ? (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium opacity-90">
                    Visualização do Projeto
                  </p>
                </div>
              </div>
            )}
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
