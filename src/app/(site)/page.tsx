import { HeroSection } from "@/components/site/hero-section";
import { ServicesSection } from "@/components/site/services-section";
import { TechnologiesSection } from "@/components/site/technologies-section";
import PortfolioSection from "@/components/site/portfolio-section";
import TestimonialsSection from "@/components/site/testimonials-section";
import BlogSection from "@/components/site/blog-section";
import ContactSection from "@/components/site/contact-section";

export default async function Home() {
  return (
    <>
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
    </>
  );
}
