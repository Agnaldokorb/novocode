import "server-only";

import { cache } from "react";
import { forbidden, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { canAccessAdmin } from "@/lib/auth/permissions";

export const getCurrentUser = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return null;

  return prisma.user.findUnique({
    where: { supabaseUserId: data.user.id },
    include: { client: true },
  });
});

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (!user.active || (user.role === "CLIENT" && !user.client?.active)) {
    redirect("/login?error=inactive");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (!canAccessAdmin(user)) forbidden();
  return user;
}

export async function requirePortalUser() {
  const user = await requireAuth();
  if (user.role === "ADMIN") redirect("/admin");
  if (!user.clientId) forbidden();
  return user;
}
