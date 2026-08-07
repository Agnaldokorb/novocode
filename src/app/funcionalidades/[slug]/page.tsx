import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
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
