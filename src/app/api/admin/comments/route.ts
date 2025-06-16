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
      where.isApproved = false;
    } else if (status === "approved") {
      where.isApproved = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { post: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Buscar comentários com paginação
    const [comments, totalCount] = await Promise.all([
      prisma.blogComment.findMany({
        where,
        include: {
          post: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogComment.count({ where }),
    ]);

    // Buscar estatísticas
    const [totalStats, pendingStats, approvedStats] = await Promise.all([
      prisma.blogComment.count(),
      prisma.blogComment.count({ where: { isApproved: false } }),
      prisma.blogComment.count({ where: { isApproved: true } }),
    ]);

    const stats = {
      total: totalStats,
      pending: pendingStats,
      approved: approvedStats,
    };

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      comments,
      stats,
      totalPages,
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);

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
