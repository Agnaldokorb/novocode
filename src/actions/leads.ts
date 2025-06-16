"use server";

import { revalidatePath } from "next/cache";

interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectDescription: string;
  budget: string;
  timeline: string;
}
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { Prisma, LeadStatus } from "@prisma/client";
import type {
  CreateLeadInput,
  UpdateLeadInput,
  PaginationOptions,
} from "@/types";
import { sendTestimonialRequestEmail } from "@/lib/email-testimonial";
import { randomBytes } from "crypto";
import {
  createManualNotification,
  getManualEmailTemplate,
} from "@/lib/email-fallback";

// Tipo para lead com relacionamentos
export type LeadWithRelations = Prisma.LeadGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    phone: true;
    company: true;
    message: true;
    source: true;
    status: true;
    interestedServices: true;
    budget: true;
    timeline: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

// Filtros para busca de leads
export interface LeadFilters {
  status?: LeadStatus;
  source?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

// Action para criar lead
export async function createLeadAction(data: CreateLeadInput) {
  try {
    // Criar lead
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        source: data.source,
        interestedServices: data.interestedServices,
        budget: data.budget,
        timeline: data.timeline,
      },
    });

    revalidatePath("/admin/leads");

    return {
      success: true,
      data: {
        lead,
        message: "Lead criado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para atualizar lead
export async function updateLeadAction(data: UpdateLeadInput) {
  try {
    await requireAdmin();

    const { id, ...updateData } = data;

    // Verificar se lead existe
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    // Atualizar lead
    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/leads");

    return {
      success: true,
      data: {
        lead,
        message: "Lead atualizado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para deletar lead
export async function deleteLeadAction(id: string) {
  try {
    await requireAdmin();

    // Verificar se lead existe
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    // Deletar lead
    await prisma.lead.delete({
      where: { id },
    });

    revalidatePath("/admin/leads");

    return {
      success: true,
      data: {
        message: "Lead deletado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao deletar lead:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar leads com filtros e paginação
export async function getLeadsAction(
  filters: LeadFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 20, sortOrder: "desc" }
) {
  try {
    const { status, source, search, startDate, endDate } = filters;
    const {
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = pagination;

    // Construir where clause
    const where: Prisma.LeadWhereInput = {
      ...(status && { status }),
      ...(source && { source }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { company: { contains: search, mode: "insensitive" } },
          { message: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(startDate && {
        createdAt: {
          gte: new Date(startDate),
        },
      }),
      ...(endDate && {
        createdAt: {
          lte: new Date(endDate),
        },
      }),
    };

    // Contar total de registros
    const total = await prisma.lead.count({ where });

    // Buscar leads
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      data: {
        leads,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrev,
        },
      },
    };
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar lead por ID
export async function getLeadByIdAction(id: string) {
  try {
    await requireAdmin();

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    return {
      success: true,
      data: { lead },
    };
  } catch (error) {
    console.error("Erro ao buscar lead:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para atualizar status do lead
export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  try {
    await requireAdmin();

    // Verificar se lead existe
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    // Atualizar status
    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    // Se o status foi alterado para "WON" (ganho), criar solicitação de depoimento
    let emailSent = false;
    let fallbackMessage = "";

    if (status === "WON" && existingLead.status !== "WON") {
      console.log(
        `🎯 Status alterado para WON! Iniciando processo de depoimento para: ${lead.email}`
      );

      try {
        // Verificar se já foi enviado email para este lead
        if (!lead.testimonialEmailSentAt) {
          console.log("📧 Preparando envio de solicitação de depoimento...");

          // Gerar token único para o link de depoimento
          const requestToken = randomBytes(32).toString("hex");

          console.log(`🔑 Token gerado: ${requestToken.substring(0, 16)}...`);

          // Verificar configurações antes de tentar enviar
          console.log("🔍 Verificando configurações de email...");
          console.log(
            "BREVO_SMTP_USER:",
            process.env.BREVO_SMTP_USER ? "✅ Configurado" : "❌ Não encontrado"
          );
          console.log(
            "BREVO_SMTP_PASSWORD:",
            process.env.BREVO_SMTP_PASSWORD
              ? "✅ Configurado"
              : "❌ Não encontrado"
          );
          console.log(
            "BREVO_FROM_EMAIL:",
            process.env.BREVO_FROM_EMAIL || "❌ Não configurado"
          );
          console.log(
            "NEXT_PUBLIC_APP_URL:",
            process.env.NEXT_PUBLIC_APP_URL || "❌ Não configurado"
          );

          // Tentar enviar email de solicitação
          try {
            console.log(
              "📧 Tentando enviar email de solicitação de depoimento..."
            );

            await sendTestimonialRequestEmail({
              clientName: lead.name,
              clientEmail: lead.email,
              token: requestToken,
              serviceName:
                lead.interestedServices.length > 0
                  ? lead.interestedServices.join(", ")
                  : undefined,
            });

            // Salvar token e data de envio no lead
            await prisma.lead.update({
              where: { id },
              data: {
                testimonialToken: requestToken,
                testimonialEmailSentAt: new Date(),
              },
            });

            emailSent = true;
            console.log(
              `✅ Solicitação de depoimento enviada para ${lead.email}`
            );
          } catch (emailError) {
            console.error("❌ Erro ao enviar email SMTP:", emailError);
            console.error("📋 Detalhes do erro:", {
              message: emailError instanceof Error ? emailError.message : String(emailError),
              code: (emailError as { code?: string })?.code,
              stack: emailError instanceof Error ? emailError.stack?.split("\n").slice(0, 3).join("\n") : undefined,
            });

            // Usar sistema de fallback
            console.log("🔄 Usando sistema de fallback...");
            const fallbackResult = await createManualNotification({
              clientName: lead.name,
              clientEmail: lead.email,
              token: requestToken,
              serviceName:
                lead.interestedServices.length > 0
                  ? lead.interestedServices.join(", ")
                  : undefined,
            });

            if (fallbackResult.success) {
              fallbackMessage = fallbackResult.message;

              // Gerar template para envio manual
              const emailTemplate = getManualEmailTemplate({
                clientName: lead.name,
                clientEmail: lead.email,
                token: requestToken,
                serviceName:
                  lead.interestedServices.length > 0
                    ? lead.interestedServices.join(", ")
                    : undefined,
              });

              console.log("📧 Template de email para envio manual:");
              console.log("Assunto:", emailTemplate.subject);
              console.log("Para:", lead.email);
              console.log("Link direto:", fallbackResult.link);
            }
          }
        } else {
          console.log(
            `ℹ️ Email de depoimento já foi enviado para este lead em ${lead.testimonialEmailSentAt?.toLocaleString()}`
          );
        }
      } catch (testimonialError) {
        console.error(
          "❌ Erro ao criar solicitação de depoimento:",
          testimonialError
        );
        console.error("📋 Detalhes do erro:", {
          message: testimonialError instanceof Error ? testimonialError.message : String(testimonialError),
          stack: testimonialError instanceof Error ? testimonialError.stack?.split("\n").slice(0, 3).join("\n") : undefined,
        });
        // Não falhar a atualização do lead por causa do erro do testimonial
      }
    } else if (status === "WON" && existingLead.status === "WON") {
      console.log(
        "ℹ️ Lead já estava com status WON, não enviando email novamente"
      );
    }

    revalidatePath("/admin/leads");

    return {
      success: true,
      data: {
        lead,
        message:
          status === "WON" && existingLead.status !== "WON"
            ? emailSent
              ? "Status atualizado e solicitação de depoimento enviada!"
              : fallbackMessage ||
                "Status atualizado. Email de depoimento precisa ser enviado manualmente."
            : "Status atualizado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar estatísticas de leads
export async function getLeadsStatsAction() {
  try {
    await requireAdmin();

    const [total, byStatus, recent, conversion] = await Promise.all([
      // Total de leads
      prisma.lead.count(),

      // Leads por status
      prisma.lead.groupBy({
        by: ["status"],
        _count: {
          id: true,
        },
      }),

      // Leads recentes (últimos 30 dias)
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Taxa de conversão (leads ganhos / total)
      prisma.lead.count({
        where: {
          status: "WON",
        },
      }),
    ]);

    const conversionRate = total > 0 ? (conversion / total) * 100 : 0;

    return {
      success: true,
      data: {
        total,
        byStatus: byStatus.reduce((acc, item) => {
          acc[item.status] = item._count.id;
          return acc;
        }, {} as Record<LeadStatus, number>),
        recent,
        conversionRate: Math.round(conversionRate * 100) / 100,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

export async function submitLead(data: LeadFormData) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.projectDescription,
        budget: data.budget,
        timeline: data.timeline,
        source: "CONTACT_FORM",
        status: "NEW",
      },
    });

    console.log("Lead criado:", lead);
    return { success: true, lead };
  } catch (error: unknown) {
    console.error("Erro ao salvar lead:", error);
    return { success: false, error: "Erro interno do servidor" };
  }
}
