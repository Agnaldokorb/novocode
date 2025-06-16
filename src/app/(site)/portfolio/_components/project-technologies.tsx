"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { Code } from "lucide-react";
import type { TechnologySimple } from "@/types";

interface ProjectTechnologiesProps {
  technologies: TechnologySimple[];
}

export function ProjectTechnologies({
  technologies,
}: ProjectTechnologiesProps) {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Code className="w-6 h-6 text-blue-600" />
        Tecnologias Utilizadas
      </h3>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <div key={tech.id} className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="px-3 py-2 text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: tech.color ? `${tech.color}20` : undefined,
                    borderColor: tech.color || undefined,
                    color: tech.color || undefined,
                  }}
                >
                  <TechnologyIcon tech={tech} size="sm" className="w-4 h-4" />
                  {tech.name}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Details */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">
          Por que escolhemos essas tecnologias?
        </h4>
        <p className="text-gray-700">
          Cada tecnologia foi cuidadosamente selecionada com base nos requisitos
          específicos do projeto, garantindo performance, escalabilidade e
          facilidade de manutenção. Nossa expertise nessas ferramentas nos
          permite entregar soluções robustas e modernas.
        </p>
      </div>
    </div>
  );
}
