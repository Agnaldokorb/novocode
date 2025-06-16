import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { sendTestimonialReminderEmail } from "@/lib/email-testimonial";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar se é admin
    await requireAdmin();

    const { id: testimonialId } = await params;

    // Buscar o depoimento
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Depoimento não encontrado" },
        { status: 404 }
      );
    }

    if (testimonial.status !== "PENDING") {
      return NextResponse.json(
        { error: "Apenas depoimentos pendentes podem receber lembretes" },
        { status: 400 }
      );
    }

    // Enviar email de lembrete
    await sendTestimonialReminderEmail({
      clientName: testimonial.clientName,
      clientEmail: testimonial.clientEmail,
      token: testimonial.requestToken,
    });

    // Atualizar contador de lembretes
    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        reminderSentAt: new Date(),
        reminderCount: testimonial.reminderCount + 1,
      },
    });

    return NextResponse.json({
      message: "Lembrete enviado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao enviar lembrete:", error);

    // Se for erro de autenticação/autorização
    if (
      error instanceof Error &&
      (error.message.includes("não autenticado") ||
        error.message.includes("Acesso negado"))
    ) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
