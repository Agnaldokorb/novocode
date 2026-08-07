import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { canAccessClient } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";
import { createDocumentSignedUrl } from "@/services/documents/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireAuth();
  const { id } = await params;
  const document = await prisma.document.findUnique({ where: { id } });

  if (!document) {
    return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  if (!canAccessClient(user, document.clientId)) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  try {
    const url = await createDocumentSignedUrl(document.filePath, document.fileName);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("document download", error);
    return NextResponse.json(
      { error: "Não foi possível iniciar o download." },
      { status: 500 },
    );
  }
}
