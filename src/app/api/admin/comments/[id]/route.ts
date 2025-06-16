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
    const { id: commentId } = await params;

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    // Verificar se o comentário existe
    const comment = await prisma.blogComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comentário não encontrado" },
        { status: 404 }
      );
    }

    // Atualizar status do comentário
    const updatedComment = await prisma.blogComment.update({
      where: { id: commentId },
      data: {
        isApproved: action === "approve",
      },
    });

    return NextResponse.json({
      message:
        action === "approve" ? "Comentário aprovado" : "Comentário rejeitado",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);

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

    const { id: commentId } = await params;

    // Verificar se o comentário existe
    const comment = await prisma.blogComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Comentário não encontrado" },
        { status: 404 }
      );
    }

    // Excluir comentário
    await prisma.blogComment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({
      message: "Comentário excluído com sucesso",
    });
  } catch (error) {
    console.error("Erro ao excluir comentário:", error);

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
