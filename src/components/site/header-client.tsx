"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface SiteHeaderClientProps {
  companyName: string;
  logo?: string | null;
}

export function SiteHeaderClient({ companyName, logo }: SiteHeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationItems = [
    { href: "/servicos", label: "Serviços" },
    { href: "/portfolio", label: "Portfólio" },
    { href: "/tecnologias", label: "Tecnologias" },
    { href: "/leads", label: "Leads" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
    { href: "/orcamento", label: "Orçamento" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-12 h-12">
            <OptimizedImage
              src={logo || "/novocode-logo.svg"}
              alt={`${companyName} Logo`}
              fill
              sizes="48px"
              className="object-contain object-center"
              fallbackIcon={true}
              onError={() => {
                console.log('⚠️ Erro ao carregar logo:', logo || "/novocode-logo.svg");
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-primary">{companyName}</span>
            <span className="text-xs text-muted-foreground">Desenvolvimento Web</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
          <Button asChild>
            <Link href="/orcamento">Começar Projeto</Link>
          </Button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/admin" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Button asChild className="w-full">
                <Link href="/orcamento">Começar Projeto</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
