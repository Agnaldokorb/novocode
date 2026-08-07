"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import darkLogo from "../../../public/logo-fundo-escuro.png";
import lightLogo from "../../../public/logo-fundo-branco.png";

const navigation = [
  { href: "#functionality", label: "Funcionalidades" },
  { href: "#price", label: "Preços" },
  { href: "#documentation", label: "Documentação" },
  { href: "#about", label: "Sobre" },
];

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  const selectedTheme = document.documentElement.dataset.theme;

  if (selectedTheme === "light" || selectedTheme === "dark") {
    return selectedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="NovoCode — página inicial"
        >
          <Image
            src={lightLogo}
            alt="NovoCode"
            priority
            className="h-14 w-auto dark:hidden"
          />
          <Image
            src={darkLogo}
            alt="NovoCode"
            priority
            className="hidden h-10 w-auto dark:block"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle onClick={toggleTheme} />
          <Link
            href="/login"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Entrar
          </Link>
          <Link
            href="/login"
            className="h-widget-trigger rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Acessar portal
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? "translate-y-1.75 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1.75 h-0.5 w-5 rounded-full bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? "translate-y-1.75 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-4 shadow-lg lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Navegação móvel">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2 border-t border-border pt-4 sm:hidden">
            <ThemeToggle onClick={toggleTheme} showLabel />
            <Link
              href="/login"
              className="rounded-full border border-border px-4 py-2.5 text-center font-semibold text-foreground"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="h-widget-trigger rounded-full bg-primary px-4 py-2.5 font-semibold text-primary-foreground"
            >
              Acessar portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeToggle({
  onClick,
  showLabel = false,
}: {
  onClick: () => void;
  showLabel?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`items-center justify-center gap-2 rounded-lg border border-border text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        showLabel ? "flex px-4 py-2.5" : "inline-flex size-10"
      }`}
      aria-label="Alternar tema claro ou escuro"
      title="Alternar tema"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-5 dark:hidden"
        aria-hidden="true"
      >
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="hidden size-5 dark:block"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
      {showLabel && <span className="font-medium">Alternar tema</span>}
    </button>
  );
}
