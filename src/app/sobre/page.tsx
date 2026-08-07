import type { Metadata } from "next";
import AboutShowcase from "@/components/about/about-showcase";
import Footer from "@/components/footer";
import Header from "@/components/header";
import WhatsWidget from "@/components/WhatsWidget";

export const metadata: Metadata = {
  title: "Sobre nós | NovoCode",
  description:
    "Conheça a NovoCode, nossa missão e os valores que orientam nossas soluções de atendimento, automação e relacionamento com clientes.",
};

export default function AboutPage() {
  return (
    <>
      <WhatsWidget />
      <Header />
      <main>
        <AboutShowcase />
      </main>
      <Footer />
    </>
  );
}
