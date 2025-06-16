import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Verificar se é admin
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";

    // Construir filtros
    const where: Record<string, unknown> = {};

    if (status === "pending") {
      where.status = "PENDING";
    } else if (status === "submitted") {
      where.status = "SUBMITTED";
    } else if (status === "approved") {
      where.status = "APPROVED";
    } else if (status === "published") {
      where.publicationStatus = "PUBLISHED";
    }

    if (search) {
      where.OR = [
        { clientName: { contains: search, mode: "insensitive" } },
        { clientEmail: { contains: search, mode: "insensitive" } },
        { clientCompany: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    // Buscar testimonials com paginação
    const [testimonials, totalCount] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.testimonial.count({ where }),
    ]);

    // Buscar estatísticas
    const [
      totalStats,
      pendingStats,
      submittedStats,
      approvedStats,
      publishedStats,
    ] = await Promise.all([
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { status: "PENDING" } }),
      prisma.testimonial.count({ where: { status: "SUBMITTED" } }),
      prisma.testimonial.count({ where: { status: "APPROVED" } }),
      prisma.testimonial.count({ where: { publicationStatus: "PUBLISHED" } }),
    ]);

    const stats = {
      total: totalStats,
      pending: pendingStats,
      submitted: submittedStats,
      approved: approvedStats,
      published: publishedStats,
    };

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      testimonials,
      stats,
      totalPages,
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);

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
