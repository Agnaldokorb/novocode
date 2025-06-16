import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar se é admin
    await requireAdmin();

    const { action } = await request.json();
    const { id: testimonialId } = await params;

    if (!action || !["approve", "reject", "publish"].includes(action)) {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    // Verificar se o depoimento existe
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Depoimento não encontrado" },
        { status: 404 }
      );
    }

    let updateData: Record<string, string> = {};

    switch (action) {
      case "approve":
        updateData = { status: "APPROVED" };
        break;
      case "reject":
        updateData = { status: "REJECTED" };
        break;
      case "publish":
        if (testimonial.status !== "APPROVED") {
          return NextResponse.json(
            { error: "Apenas depoimentos aprovados podem ser publicados" },
            { status: 400 }
          );
        }
        updateData = { publicationStatus: "PUBLISHED" };
        break;
    }

    // Atualizar depoimento
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: updateData,
    });

    const messages = {
      approve: "Depoimento aprovado",
      reject: "Depoimento rejeitado",
      publish: "Depoimento publicado",
    };

    return NextResponse.json({
      message: messages[action as keyof typeof messages],
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error("Erro ao atualizar depoimento:", error);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar se é admin
    await requireAdmin();

    const { id: testimonialId } = await params;

    // Verificar se o depoimento existe
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Depoimento não encontrado" },
        { status: 404 }
      );
    }

    // Excluir depoimento
    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    return NextResponse.json({
      message: "Depoimento excluído com sucesso",
    });
  } catch (error) {
    console.error("Erro ao excluir depoimento:", error);

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
