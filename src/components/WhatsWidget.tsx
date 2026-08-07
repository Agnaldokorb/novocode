"use client";

import Script from "next/script";

declare global {
  interface Window {
    hWidget?: {
      handleUtm: () => void;
      init: () => void;
    };
  }
}

function initializeWidgetAfterWindowLoad() {
  const initialize = () => {
    if (document.getElementById("h-widget-iframe")) return;

    window.hWidget?.handleUtm();
    window.hWidget?.init();
  };

  if (document.readyState === "complete") {
    initialize();
    return;
  }

  window.addEventListener("load", initialize, { once: true });
}

export default function WhatsWidget() {
  return (
    <Script
      id="whats-widget-script"
      src="https://cdn.wts.chat/scripts/widget/v2/h-widget-min.js"
      strategy="afterInteractive"
      data-companyid="36d5996d-6dd5-4823-b4d5-7a62dc052199"
      data-widgetid="42499f3b-0a3c-486a-87d3-fd45766438b7"
      onLoad={initializeWidgetAfterWindowLoad}
    />
  );
}
