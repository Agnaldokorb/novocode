import type { ReactNode } from "react";
import { requirePortalUser } from "@/lib/auth/session";
import { AppShell } from "@/components/shell/app-shell";

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const user = await requirePortalUser();
  return <AppShell mode="portal" userName={user.name}>{children}</AppShell>;
}
