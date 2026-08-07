import type { UserRole } from "@/generated/prisma/enums";

const APP_ORIGIN = "https://app.invalid";

export function getPostLoginRedirect(value: FormDataEntryValue | null, role: UserRole) {
  const fallback = role === "ADMIN" ? "/admin" : "/portal";

  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  try {
    const url = new URL(value, APP_ORIGIN);
    const allowedPrefix = role === "ADMIN" ? "/admin" : "/portal";

    if (url.origin !== APP_ORIGIN) return fallback;
    if (url.pathname !== allowedPrefix && !url.pathname.startsWith(`${allowedPrefix}/`)) {
      return fallback;
    }

    return `${url.pathname}${url.search}`;
  } catch {
    return fallback;
  }
}
