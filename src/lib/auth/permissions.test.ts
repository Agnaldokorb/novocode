import { describe, expect, it } from "vitest";
import { canAccessAdmin, canAccessClient } from "./permissions";

const clientA = { role: "CLIENT" as const, clientId: "client-a", active: true, client: { active: true } };
const clientB = { role: "CLIENT" as const, clientId: "client-b", active: true, client: { active: true } };
const admin = { role: "ADMIN" as const, clientId: null, active: true, client: null };

describe("autorização horizontal de documentos", () => {
  it("permite Cliente A acessar documento A", () => expect(canAccessClient(clientA, "client-a")).toBe(true));
  it("nega Cliente A acessar documento B", () => expect(canAccessClient(clientA, "client-b")).toBe(false));
  it("permite Cliente B acessar documento B", () => expect(canAccessClient(clientB, "client-b")).toBe(true));
  it("nega Cliente B acessar documento A", () => expect(canAccessClient(clientB, "client-a")).toBe(false));
  it("permite administrador acessar ambos", () => {
    expect(canAccessClient(admin, "client-a")).toBe(true);
    expect(canAccessClient(admin, "client-b")).toBe(true);
  });
  it("nega usuário e cliente inativos", () => {
    expect(canAccessClient({ ...clientA, active: false }, "client-a")).toBe(false);
    expect(canAccessClient({ ...clientA, client: { active: false } }, "client-a")).toBe(false);
  });
});

describe("autorização administrativa", () => {
  it("permite ADMIN ativo", () => expect(canAccessAdmin(admin)).toBe(true));
  it("nega CLIENT", () => expect(canAccessAdmin(clientA)).toBe(false));
});
