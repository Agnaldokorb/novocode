import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/session";
import { AppShell } from "@/components/shell/app-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();
  return <AppShell mode="admin" userName={user.name}>{children}</AppShell>;
}
