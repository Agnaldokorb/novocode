export function formatDate(value?: Date | null) {
  return value ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(value) : "—";
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function documentTypeLabel(type: string) {
  return { BOLETO: "Boleto", NOTA_FISCAL: "Nota fiscal", CONTRATO: "Contrato", OUTRO: "Outro" }[type] ?? type;
}

export function contractStatusLabel(status: string) {
  return { ACTIVE: "Ativo", EXPIRED: "Expirado", CANCELLED: "Cancelado", PENDING: "Pendente" }[status] ?? status;
}
