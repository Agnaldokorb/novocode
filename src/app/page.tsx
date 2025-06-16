import { SiteHeader } from "@/components/site/header";
import { HeroSection } from "@/components/site/hero-section";
import { ServicesSection } from "@/components/site/services-section";
import { TechnologiesSection } from "@/components/site/technologies-section";
import PortfolioSection from "@/components/site/portfolio-section";
import TestimonialsSection from "@/components/site/testimonials-section";
import BlogSection from "@/components/site/blog-section";
import ContactSection from "@/components/site/contact-section";
import Footer from "@/components/site/footer";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Technologies Section */}
        <TechnologiesSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
