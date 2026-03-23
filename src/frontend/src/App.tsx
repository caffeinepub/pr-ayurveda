import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import AnnouncementBar from "./components/AnnouncementBar";
import BenefitsSection from "./components/BenefitsSection";
import CartSidebar from "./components/CartSidebar";
import ConsultationForm from "./components/ConsultationForm";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ProductsSection from "./components/ProductsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import { useCart } from "./hooks/useQueries";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [hash, setHash] = useState(window.location.hash);
  const { data: cart } = useCart();
  const cartCount =
    cart?.items?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (hash === "#admin") {
    return (
      <>
        <AdminDashboard />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-hindi">
      <AnnouncementBar />
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <HeroSection
          onShopClick={scrollToProducts}
          onConsultClick={scrollToContact}
        />
        <WhyChooseUs />
        <ProductsSection />
        <BenefitsSection />
        <HowItWorks />
        <TestimonialsSection />
        <FAQSection />
        <ConsultationForm />
      </main>
      <Footer />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toaster position="top-right" richColors />
    </div>
  );
}
