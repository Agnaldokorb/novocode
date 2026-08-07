"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { featureGroups, getFeatureHref } from "@/lib/feature-navigation";
import darkLogo from "../../../public/logo-fundo-escuro.png";
import lightLogo from "../../../public/logo-fundo-branco.png";

const navigation = [
  { href: "/precos", label: "Preços" },
  {
    href: "https://flwchat.readme.io/",
    label: "Documentação",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { href: "/sobre", label: "Sobre" },
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
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);

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
        setMobileFeaturesOpen(false);
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

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileFeaturesOpen(false);
  };

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
          <DesktopFeaturesMenu />
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.rel}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
            </Link>
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
            <button
              type="button"
              onClick={() => setMobileFeaturesOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-expanded={mobileFeaturesOpen}
              aria-controls="mobile-features-menu"
            >
              Funcionalidades
              <ChevronDown
                className={`size-4 transition-transform ${mobileFeaturesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {mobileFeaturesOpen ? (
              <div
                id="mobile-features-menu"
                className="mb-2 grid gap-5 rounded-2xl border border-border bg-surface/70 p-4"
              >
                {featureGroups.map((group) => (
                  <div key={group.title}>
                    <p className="border-b border-border pb-2 text-sm font-black text-foreground">
                      {group.title}
                    </p>
                    <div className="mt-2 grid gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={getFeatureHref(item.slug)}
                          onClick={closeMenu}
                          className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.target}
                rel={item.rel}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                {item.label}
              </Link>
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
              className="rounded-full bg-primary px-4 py-2.5 font-semibold text-primary-foreground"
            >
              Acessar portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopFeaturesMenu() {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-haspopup="true"
        aria-controls="desktop-features-menu"
      >
        Funcionalidades
        <ChevronDown
          className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden="true"
        />
      </button>

      <div className="invisible absolute left-1/2 top-full z-50 w-[min(760px,calc(100vw-3rem))] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div
          id="desktop-features-menu"
          className="grid grid-cols-3 gap-5 rounded-2xl border border-border bg-background/98 p-5 shadow-2xl shadow-pine-teal-100/15 backdrop-blur-xl dark:shadow-black/30"
        >
          {featureGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <p className="border-b border-border px-2 pb-3 text-sm font-black text-foreground">
                {group.title}
              </p>
              <div className="mt-2 grid gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={getFeatureHref(item.slug)}
                    className="rounded-xl px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
