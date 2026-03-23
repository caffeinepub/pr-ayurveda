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
import MyOrders from "./components/MyOrders";
import ProductsSection from "./components/ProductsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import { useLocalCart } from "./hooks/useLocalCart";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash);
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useLocalCart();

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
      <Header
        cartCount={cart.cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearchQuery}
        onOrdersOpen={() => setOrdersOpen(true)}
      />
      <main>
        <HeroSection
          onShopClick={scrollToProducts}
          onConsultClick={scrollToContact}
        />
        <WhyChooseUs />
        <ProductsSection searchQuery={searchQuery} cart={cart} />
        <BenefitsSection />
        <HowItWorks />
        <TestimonialsSection />
        <FAQSection />
        <ConsultationForm />
      </main>
      <Footer />
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
      />
      <MyOrders open={ordersOpen} onClose={() => setOrdersOpen(false)} />
      <Toaster position="top-right" richColors />
    </div>
  );
}
