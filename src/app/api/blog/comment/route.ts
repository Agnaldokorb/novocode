import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { postId, name, content, rating } = await req.json();
    if (
      !postId ||
      !name ||
      typeof name !== "string" ||
      name.trim().length < 2
    ) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Nota inválida" }, { status: 400 });
    }
    
    const comment = await prisma.blogComment.create({
      data: {
        postId,
        name: name.trim(),
        content: content || "",
        rating,
        isApproved: false, // Moderação manual obrigatória
      },
    });
    
    return NextResponse.json({ 
      ok: true, 
      message: "Comentário enviado para moderação",
      comment: {
        id: comment.id,
        name: comment.name,
        content: comment.content,
        rating: comment.rating,
        createdAt: comment.createdAt
      }
    });
  } catch (error) {
    console.error("Erro ao salvar comentário:", error);
    return NextResponse.json(
      { error: "Erro ao salvar comentário" },
      { status: 500 }
    );
  }
}
 