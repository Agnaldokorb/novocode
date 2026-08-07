import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PricingShowcase from "@/components/pricing/pricing-showcase";
import WhatsWidget from "@/components/WhatsWidget";

export const metadata: Metadata = {
  title: "Planos e preços | NovoCode",
  description:
    "Compare os planos da NovoCode e escolha os recursos ideais para sua operação de atendimento, CRM e automação.",
};

export default function PricingPage() {
  return (
    <>
      <WhatsWidget />
      <Header />
      <main>
        <PricingShowcase />
      </main>
      <Footer />
    </>
  );
}
