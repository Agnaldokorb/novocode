"use client";

export function ConfirmAction({ action, label, confirmMessage }: { action: () => Promise<void>; label: string; confirmMessage: string }) {
  return <form action={action} onSubmit={(event) => { if (!window.confirm(confirmMessage)) event.preventDefault(); }} className="inline"><button className="font-bold text-red-700">{label}</button></form>;
}
