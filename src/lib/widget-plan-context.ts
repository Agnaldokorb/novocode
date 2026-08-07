export function buildWidgetPlanContextUrl(
  iframeSrc: string,
  planName: string,
  currentPageUrl: string,
) {
  const message = planName.startsWith("Ajuda")
    ? "Olá! Gostaria de ajuda para escolher o plano ideal da NovoCode."
    : `Olá! Tenho interesse no plano ${planName} da NovoCode.`;
  const iframeUrl = new URL(iframeSrc);
  const pageUrl = new URL(currentPageUrl);

  pageUrl.searchParams.set("plano", planName);
  iframeUrl.searchParams.set("contactMessage", message);
  iframeUrl.searchParams.set("pageTitle", `Interesse no plano ${planName}`);
  iframeUrl.searchParams.set("pageUrl", pageUrl.toString());

  return iframeUrl.toString();
}
