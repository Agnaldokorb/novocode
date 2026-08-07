"use client";

import Script from "next/script";
import { useEffect } from "react";
import { buildWidgetPlanContextUrl } from "@/lib/widget-plan-context";

declare global {
  interface Window {
    hWidget?: {
      handleUtm: () => void;
      init: () => void;
      show: (source: string) => void;
    };
  }
}

let pendingWidgetOpen = false;
let pendingPlanName: string | undefined;
const handledWidgetEvents = new WeakSet<Event>();

function setWidgetPlanContext(planName: string) {
  const iframe = document.getElementById("h-widget-iframe");

  if (!(iframe instanceof HTMLIFrameElement) || !iframe.src) return;

  const nextSrc = buildWidgetPlanContextUrl(
    iframe.src,
    planName,
    window.location.href,
  );

  if (iframe.src !== nextSrc) iframe.src = nextSrc;
}

function initializeWidget() {
  if (document.getElementById("h-widget-iframe")) return;

  window.hWidget?.handleUtm();
  window.hWidget?.init();
}

function flushPendingWidgetOpen() {
  if (!pendingWidgetOpen || !window.hWidget?.show) return;

  const planName = pendingPlanName;
  pendingWidgetOpen = false;
  pendingPlanName = undefined;
  initializeWidget();

  window.requestAnimationFrame(() => {
    if (planName) setWidgetPlanContext(planName);
    window.hWidget?.show("overlay");
  });
}

function initializeWidgetAfterWindowLoad() {
  const initialize = () => {
    initializeWidget();
    flushPendingWidgetOpen();
  };

  if (document.readyState === "complete") {
    initialize();
    return;
  }

  window.addEventListener("load", initialize, { once: true });
}

export default function WhatsWidget() {
  useEffect(() => {
    const handleWidgetTrigger = (event: MouseEvent) => {
      if (handledWidgetEvents.has(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>(".h-widget-trigger");
      if (!trigger) return;

      handledWidgetEvents.add(event);
      event.preventDefault();
      event.stopPropagation();

      pendingWidgetOpen = true;
      pendingPlanName = trigger.dataset.plan;
      flushPendingWidgetOpen();
    };

    document.addEventListener("click", handleWidgetTrigger, true);
    initializeWidgetAfterWindowLoad();

    return () => {
      document.removeEventListener("click", handleWidgetTrigger, true);
    };
  }, []);

  return (
    <Script
      id="whats-widget-script"
      src="https://cdn.wts.chat/scripts/widget/v2/h-widget-min.js"
      strategy="afterInteractive"
      data-companyid="36d5996d-6dd5-4823-b4d5-7a62dc052199"
      data-widgetid="42499f3b-0a3c-486a-87d3-fd45766438b7"
      onReady={initializeWidgetAfterWindowLoad}
    />
  );
}
