import Header from "@/components/header";
import Footer from "@/components/footer";
import Top from "@/components/landing/top";
import Solutions from "@/components/landing/solutions";
import Automation from "@/components/landing/automation";
import WhatsWidget from "@/components/WhatsWidget";

export default function Home() {
  return (
    <>
      <WhatsWidget />
      <Header />
        <Top />
        <Solutions />
        <Automation />
      <Footer />
    </>
  );
}