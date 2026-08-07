"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions/auth";
import { initialActionState } from "@/lib/actions/state";

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialActionState);
  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="grid gap-2 text-sm font-semibold">
        E-mail
        <input name="email" type="email" autoComplete="email" required className="min-h-12 rounded-xl border border-border bg-background px-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Senha
        <input name="password" type="password" autoComplete="current-password" required className="min-h-12 rounded-xl border border-border bg-background px-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </label>
      {state.message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{state.message}</p>}
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="min-h-12 w-full rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-accent disabled:opacity-60">{pending ? "Entrando..." : "Entrar"}</button>;
}
