import { z } from "zod";

export const documentMetadataSchema = z.object({
  clientId: z.string().uuid(),
  companyId: z.preprocess((value) => (value === "" ? undefined : value), z.string().uuid().optional()),
  type: z.enum(["BOLETO", "NOTA_FISCAL", "CONTRATO", "OUTRO"]),
  title: z.string().trim().min(2).max(180),
  description: z.preprocess((value) => (value === "" ? undefined : value), z.string().trim().max(1000).optional()),
});

export const documentFilterSchema = z.object({
  type: z.enum(["BOLETO", "NOTA_FISCAL", "CONTRATO", "OUTRO"]).optional(),
  companyId: z.string().uuid().optional(),
  query: z.string().trim().max(100).optional(),
});
