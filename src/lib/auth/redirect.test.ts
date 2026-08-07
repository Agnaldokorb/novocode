import { describe, expect, it } from "vitest";
import { getPostLoginRedirect } from "./redirect";

describe("redirecionamento ap\u00f3s login", () => {
  it("preserva uma rota protegida compat\u00edvel com o papel", () => {
    expect(getPostLoginRedirect("/admin/clientes?page=2", "ADMIN")).toBe(
      "/admin/clientes?page=2",
    );
    expect(getPostLoginRedirect("/portal/documentos?tipo=BOLETO", "CLIENT")).toBe(
      "/portal/documentos?tipo=BOLETO",
    );
  });

  it("usa a p\u00e1gina inicial do papel para rotas incompat\u00edveis", () => {
    expect(getPostLoginRedirect("/admin", "CLIENT")).toBe("/portal");
    expect(getPostLoginRedirect("/portal", "ADMIN")).toBe("/admin");
  });

  it("bloqueia redirecionamentos externos", () => {
    expect(getPostLoginRedirect("https://example.com", "ADMIN")).toBe("/admin");
    expect(getPostLoginRedirect("//example.com", "CLIENT")).toBe("/portal");
    expect(getPostLoginRedirect("/\\\\example.com", "CLIENT")).toBe("/portal");
  });
});
