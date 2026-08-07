"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2, FileText, Gauge, LogOut, Menu, ReceiptText, ScrollText,
  Settings, UserRound, UsersRound, X,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

type NavItem = { href: string; label: string; icon: typeof Gauge };

const adminItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/clientes", label: "Clientes", icon: UsersRound },
  { href: "/admin/empresas", label: "Empresas", icon: Building2 },
  { href: "/admin/documentos", label: "Documentos", icon: FileText },
  { href: "/admin/boletos", label: "Boletos", icon: ReceiptText },
  { href: "/admin/notas-fiscais", label: "Notas fiscais", icon: FileText },
  { href: "/admin/contratos", label: "Contratos", icon: ScrollText },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

const portalItems: NavItem[] = [
  { href: "/portal", label: "Dashboard", icon: Gauge },
  { href: "/portal/empresas", label: "Empresas", icon: Building2 },
  { href: "/portal/boletos", label: "Boletos", icon: ReceiptText },
  { href: "/portal/notas-fiscais", label: "Notas fiscais", icon: FileText },
  { href: "/portal/contratos", label: "Contratos", icon: ScrollText },
  { href: "/portal/documentos", label: "Documentos", icon: FileText },
  { href: "/portal/minha-conta", label: "Minha conta", icon: UserRound },
];

export function AppShell({ children, userName, mode }: { children: ReactNode; userName: string; mode: "admin" | "portal" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = mode === "admin" ? adminItems : portalItems;

  return (
    <div className="min-h-svh bg-surface-muted/50 lg:grid lg:grid-cols-[270px_1fr]">
      {open && <button aria-label="Fechar menu" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-pine-teal-400 bg-pine-teal-500 text-white transition-transform lg:sticky lg:top-0 lg:h-svh ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-18 items-center justify-between border-b border-white/10 px-5">
          <Link href={mode === "admin" ? "/admin" : "/portal"} className="text-lg font-black tracking-tight">NovoCode <span className="text-dry-sage-500">Portal</span></Link>
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X className="size-5" /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== `/${mode}` && pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-white text-pine-teal-500" : "text-dust-grey-700 hover:bg-white/10 hover:text-white"}`}>
                <Icon className="size-4.5" />{item.label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction} className="border-t border-white/10 p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-dust-grey-700 hover:bg-white/10 hover:text-white"><LogOut className="size-4.5" />Sair</button>
        </form>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <button className="rounded-xl border border-border p-2.5 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu className="size-5" /></button>
          <div className="ml-auto text-right"><p className="text-sm font-bold text-foreground">{userName}</p><p className="text-xs text-muted-foreground">{mode === "admin" ? "Administrador" : "Cliente"}</p></div>
        </header>
        <main className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
