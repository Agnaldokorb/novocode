import type { UserRole } from "@/generated/prisma/enums";

export type AuthorizationIdentity = {
  role: UserRole;
  clientId: string | null;
  active: boolean;
  client?: { active: boolean } | null;
};

export function canAccessClient(
  identity: AuthorizationIdentity,
  resourceClientId: string,
) {
  if (!identity.active || identity.client?.active === false) return false;
  return identity.role === "ADMIN" || identity.clientId === resourceClientId;
}

export function canAccessAdmin(identity: AuthorizationIdentity) {
  return identity.active && identity.role === "ADMIN";
}
