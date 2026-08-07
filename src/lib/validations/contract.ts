import { z } from "zod";

export const contractSchema = z.object({
  clientId: z.string().uuid(),
  companyId: z.preprocess((value) => (value === "" ? undefined : value), z.string().uuid().optional()),
  documentId: z.preprocess((value) => (value === "" ? undefined : value), z.string().uuid().optional()),
  title: z.string().trim().min(2).max(180),
  description: z.preprocess((value) => (value === "" ? undefined : value), z.string().trim().max(1000).optional()),
  startDate: z.coerce.date(),
  endDate: z.preprocess((value) => (value === "" ? undefined : value), z.coerce.date().optional()),
  status: z.enum(["ACTIVE", "EXPIRED", "CANCELLED", "PENDING"]),
}).refine((data) => !data.endDate || data.endDate >= data.startDate, {
  message: "O vencimento não pode ser anterior ao início.",
  path: ["endDate"],
});

export const contractUpdateSchema = contractSchema.extend({ id: z.string().uuid() });
