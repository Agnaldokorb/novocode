import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, content, rating, clientPosition, clientCompany } =
      await request.json();

    // Validações
    if (!token || !content || !rating) {
      return NextResponse.json(
        { error: "Token, conteúdo e avaliação são obrigatórios" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Avaliação deve ser entre 1 e 5" },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: "Depoimento deve ter no máximo 1000 caracteres" },
        { status: 400 }
      );
    }

    // Buscar o depoimento pelo token
    const testimonial = await prisma.testimonial.findUnique({
      where: { requestToken: token },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Token inválido ou depoimento não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se já foi enviado
    if (testimonial.status === "SUBMITTED") {
      return NextResponse.json(
        { error: "Este depoimento já foi enviado" },
        { status: 400 }
      );
    }

    // Atualizar o depoimento
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: testimonial.id },
      data: {
        content: content.trim(),
        rating: parseInt(rating),
        clientPosition: clientPosition?.trim() || null,
        clientCompany: clientCompany?.trim() || null,
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Depoimento enviado com sucesso",
      testimonial: {
        id: updatedTestimonial.id,
        status: updatedTestimonial.status,
      },
    });
  } catch (error) {
    console.error("Erro ao enviar depoimento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
