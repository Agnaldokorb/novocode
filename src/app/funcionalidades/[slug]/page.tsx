import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import CampaignsFeaturePage from "@/components/features/campaigns-feature-page";
import AutomationSuiteFeaturePage, {
  isAutomationFeatureVariant,
} from "@/components/features/automation-suite-feature-page";
import CustomerPortfolioFeaturePage from "@/components/features/customer-portfolio-feature-page";
import CrmFeaturePage from "@/components/features/crm-feature-page";
import GroupsFeaturePage from "@/components/features/groups-feature-page";
import InternalChatFeaturePage from "@/components/features/internal-chat-feature-page";
import PaymentsFeaturePage from "@/components/features/payments-feature-page";
import ScheduledMessagesFeaturePage from "@/components/features/scheduled-messages-feature-page";
import ServiceFeaturePage from "@/components/features/service-feature-page";
import Header from "@/components/header";
import WhatsWidget from "@/components/WhatsWidget";
import { features, getFeatureBySlug } from "@/lib/feature-navigation";

type FeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return features.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) return {};

  return {
    title: `${feature.label} | NovoCode`,
    description: `Conheça a funcionalidade ${feature.label} da plataforma NovoCode.`,
  };
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) notFound();

  if (feature.slug === "crm") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <CrmFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "pagamentos") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <PaymentsFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "disparo-de-campanhas") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <CampaignsFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "carteirizacao") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <CustomerPortfolioFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "atendimento") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <ServiceFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "grupos-na-api-oficial") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <GroupsFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "mensagens-agendadas") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <ScheduledMessagesFeaturePage />
        <Footer />
      </>
    );
  }

  if (feature.slug === "chat-interno") {
    return (
      <>
        <WhatsWidget />
        <Header />
        <InternalChatFeaturePage />
        <Footer />
      </>
    );
  }

  if (isAutomationFeatureVariant(feature.slug)) {
    return (
      <>
        <WhatsWidget />
        <Header />
        <AutomationSuiteFeaturePage variant={feature.slug} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <WhatsWidget />
      <Header />
      <main className="relative isolate flex min-h-[62svh] items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fern-500/15 blur-3xl"
          aria-hidden="true"
        />
        <h1 className="text-balance text-4xl font-black tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
          {feature.label}
        </h1>
      </main>
      <Footer />
    </>
  );
}
