import { describe, expect, it } from "vitest";
import { buildWidgetPlanContextUrl } from "./widget-plan-context";

describe("buildWidgetPlanContextUrl", () => {
  it("inclui o plano selecionado na mensagem e na URL de origem", () => {
    const result = new URL(
      buildWidgetPlanContextUrl(
        "https://cdn.wts.chat/widget.html?companyId=company",
        "Plus+",
        "https://novocode.tec.br/precos",
      ),
    );

    expect(result.searchParams.get("contactMessage")).toBe(
      "Olá! Tenho interesse no plano Plus+ da NovoCode.",
    );
    expect(result.searchParams.get("pageTitle")).toBe("Interesse no plano Plus+");
    expect(new URL(result.searchParams.get("pageUrl")!).searchParams.get("plano")).toBe("Plus+");
  });

  it("usa uma mensagem de consultoria no CTA geral", () => {
    const result = new URL(
      buildWidgetPlanContextUrl(
        "https://cdn.wts.chat/widget.html",
        "Ajuda para escolher um plano",
        "https://novocode.tec.br/precos",
      ),
    );

    expect(result.searchParams.get("contactMessage")).toBe(
      "Olá! Gostaria de ajuda para escolher o plano ideal da NovoCode.",
    );
  });
});
