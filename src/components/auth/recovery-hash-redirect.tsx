"use client";

import { useEffect } from "react";
import { getRecoverySessionFromHash } from "@/lib/auth/recovery";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function RecoveryHashRedirect() {
  useEffect(() => {
    if (!window.location.hash) return;

    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    if (hashParams.get("type") !== "recovery") return;

    const recoverySession = getRecoverySessionFromHash(window.location.hash);

    // Remove credentials from the address bar before making any request.
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);

    if (!recoverySession) {
      window.location.replace("/login?recoveryError=1");
      return;
    }

    void createSupabaseBrowserClient()
      .auth.setSession({
        access_token: recoverySession.accessToken,
        refresh_token: recoverySession.refreshToken,
      })
      .then(({ error }) => {
        window.location.replace(error ? "/login?recoveryError=1" : "/redefinir-senha");
      })
      .catch(() => {
        window.location.replace("/login?recoveryError=1");
      });
  }, []);

  return null;
}
