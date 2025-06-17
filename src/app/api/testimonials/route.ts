import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Buscar apenas testimonials publicados
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "APPROVED",
        publicationStatus: "PUBLISHED",
      },
      select: {
        id: true,
        clientName: true,
        clientPosition: true,
        clientCompany: true,
        content: true,
        rating: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10, // Limitar a 10 testimonials mais recentes
    });

    return NextResponse.json({ testimonials });  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
    
    // Em caso de erro de banco, retornar array vazio ao invés de erro 500
    console.log("🔄 Retornando lista vazia de depoimentos devido a erro de DB");
    return NextResponse.json({ 
      testimonials: [],
      fallback: true,
      message: "Banco de dados temporariamente indisponível" 
    });
  }
} 