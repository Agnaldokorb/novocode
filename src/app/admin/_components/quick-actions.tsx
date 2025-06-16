import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Code, Settings } from "lucide-react";

const quickActions = [
  {
    title: "Novo Serviço",
    description: "Adicionar serviço",
    href: "/admin/services/new",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
  {
    title: "Novo Projeto",
    description: "Adicionar ao portfólio",
    href: "/admin/portfolio/new",
    icon: FileText,
    color: "bg-green-50 text-green-600 hover:bg-green-100",
  },
  {
    title: "Novo Post",
    description: "Escrever artigo",
    href: "/admin/blog/new",
    icon: FileText,
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  },
  {
    title: "Nova Tecnologia",
    description: "Adicionar tecnologia",
    href: "/admin/technologies/new",
    icon: Code,
    color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>
          Acesso rápido às funcionalidades principais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.href}
                asChild
                variant="ghost"
                className="w-full justify-start h-auto p-3"
              >
                <Link href={action.href}>
                  <div className={`p-2 rounded-md mr-3 ${action.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
