"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { PublicationStatus } from "@prisma/client";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  order?: number | null;
  status: PublicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFAQInput {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  status?: PublicationStatus;
}

export interface UpdateFAQInput extends Partial<CreateFAQInput> {
  id: string;
}

// Criar FAQ
export async function createFAQ(data: CreateFAQInput) {
  try {
    await requireAdmin();

    const faq = await prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category || null,
        order: data.order || null,
        status: data.status || PublicationStatus.PUBLISHED,
      },
    });

    revalidatePath("/admin/faq");
    return { success: true, data: faq };
  } catch (error) {
    console.error("Erro ao criar FAQ:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Atualizar FAQ
export async function updateFAQ(data: UpdateFAQInput) {
  try {
    await requireAdmin();

    const { id, ...updateData } = data;
    const faq = await prisma.fAQ.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/faq");
    return { success: true, data: faq };
  } catch (error) {
    console.error("Erro ao atualizar FAQ:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Excluir FAQ
export async function deleteFAQ(id: string) {
  try {
    await requireAdmin();

    await prisma.fAQ.delete({
      where: { id },
    });

    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir FAQ:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Buscar todos os FAQs (admin)
export async function getFAQs() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return faqs;
  } catch (error) {
    console.error("Erro ao buscar FAQs:", error);
    return [];
  }
}

// Buscar FAQ por ID
export async function getFAQById(id: string) {
  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });

    return faq;
  } catch (error) {
    console.error("Erro ao buscar FAQ:", error);
    return null;
  }
}

// Buscar FAQs publicados (público)
export async function getPublishedFAQs() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: {
        status: PublicationStatus.PUBLISHED,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return faqs;
  } catch (error) {
    console.error("Erro ao buscar FAQs publicados:", error);
    return [];
  }
}

// Buscar categorias de FAQ
export async function getFAQCategories() {
  try {
    const categories = await prisma.fAQ.findMany({
      where: {
        category: {
          not: null,
        },
      },
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    return categories
      .map((item) => item.category)
      .filter((category): category is string => category !== null);
  } catch (error) {
    console.error("Erro ao buscar categorias de FAQ:", error);
    return [];
  }
}

// Alterar status do FAQ
export async function toggleFAQStatus(id: string, status: PublicationStatus) {
  try {
    await requireAdmin();

    const faq = await prisma.fAQ.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/faq");
    return { success: true, data: faq };
  } catch (error) {
    console.error("Erro ao alterar status do FAQ:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
