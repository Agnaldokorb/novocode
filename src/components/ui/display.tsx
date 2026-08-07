import type { ReactNode } from "react";
import Link from "next/link";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-border bg-background p-5 shadow-sm ${className}`}>{children}</section>;
}

export function StatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <Card>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-black text-foreground">{value}</p>
      {detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}
    </Card>
  );
}

export function StatusBadge({ active, label }: { active: boolean; label?: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${active ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"}`}>
      {label ?? (active ? "Ativo" : "Inativo")}
    </span>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/40 px-6 py-12 text-center">
      <p className="font-bold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-accent">{children}</Link>;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto rounded-2xl border border-border bg-background shadow-sm"><table className="w-full min-w-180 text-left text-sm">{children}</table></div>;
}

export const tableHeadClass = "border-b border-border bg-surface-muted text-xs uppercase tracking-wide text-muted-foreground";
export const tableRowClass = "border-b border-border/70 last:border-0 hover:bg-surface/50";
export const tableCellClass = "px-4 py-3.5";
