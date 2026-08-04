"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const legalDocuments = {
  privacy: {
    title: "Política de Privacidade",
    url: "https://novocode.tec.br/terms/privacy-policy",
  },
  terms: {
    title: "Termos de Uso",
    url: "https://novocode.tec.br/terms/terms-of-use",
  },
};

export default function Footer() {
  const [activeDocument, setActiveDocument] = useState(null);
  const currentYear = new Date().getFullYear();

  return (
    <>
      {activeDocument && (
        <LegalModal
          title={legalDocuments[activeDocument].title}
          url={legalDocuments[activeDocument].url}
          onClose={() => setActiveDocument(null)}
        />
      )}

      <footer className="mt-auto overflow-hidden border-t border-pine-teal-400 bg-pine-teal-500 text-dust-grey-900 dark:border-pine-teal-300 dark:bg-pine-teal-200">
        <div className="h-1 bg-linear-to-r from-dry-sage-500 via-fern-600 to-dry-sage-500" />

        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-black tracking-tight text-pine-teal-100 shadow-sm"
                aria-hidden="true"
              >
                <Image
                  src="/nc-sem-fundo.png"
                  alt=""
                  width={35}
                  height={35}
                  className="size-9 object-contain"
                />
              </span>
              <div>
                <p className="text-lg font-bold leading-tight text-white">
                  NovoCode
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-dry-sage-600 dark:text-dry-sage-500">
                  Tecnologia e Sistemas
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-dust-grey-700 dark:text-dust-grey-600 sm:text-base">
              Soluções digitais modernas, seguras e elegantes para transformar
              ideias em experiências reais.
            </p>

            <p className="mt-5 inline-flex rounded-full border border-pine-teal-600/60 bg-pine-teal-100/20 px-3 py-1.5 text-xs font-medium text-dry-sage-700 dark:border-pine-teal-400 dark:bg-pine-teal-100/30 dark:text-dry-sage-600">
              CNPJ 61.224.046/0001-89
            </p>
          </div>

          <nav aria-label="Links legais" className="md:min-w-56">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-dry-sage-600 dark:text-dry-sage-500">
              Informações legais
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <LegalLink onClick={() => setActiveDocument("privacy")}>
                  Privacidade
                </LegalLink>
              </li>
              <li>
                <LegalLink onClick={() => setActiveDocument("terms")}>
                  Termos de uso
                </LegalLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-pine-teal-600/50 bg-pine-teal-100/15 dark:border-pine-teal-400 dark:bg-pine-teal-100/25">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-dust-grey-700 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-dust-grey-600">
            <p>© {currentYear} NovoCode. Todos os direitos reservados.</p>
            <p>Feito com tecnologia e propósito.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function LegalLink({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-6 rounded-xl border border-transparent px-3 py-2.5 text-left text-sm font-medium text-dust-grey-800 transition-colors hover:border-pine-teal-600/60 hover:bg-pine-teal-100/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dry-sage-500 dark:text-dust-grey-700 dark:hover:border-pine-teal-400 dark:hover:bg-pine-teal-100/30"
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-4 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}

function LegalModal({ title, url, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-pine-teal-100/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="flex h-[min(86svh,760px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:rounded-3xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              NovoCode
            </p>
            <h2 id="legal-modal-title" className="mt-1 text-base font-bold text-foreground sm:text-lg">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-xl leading-none text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`Fechar ${title}`}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <iframe
          src={url}
          title={title}
          className="min-h-0 flex-1 bg-white"
        />
      </section>
    </div>
  );
}
