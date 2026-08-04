import Header from "@/components/header";
import Footer from "@/components/footer";
import Top from "@/components/landing/top";
import Solutions from "@/components/landing/solutions";

export default function Home() {
  return (
    <>
      <Header />
        <Top />
        <Solutions />
      <Footer />
    </>
  );
}