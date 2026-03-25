import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
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
import PromoBannersDisplay from "./components/PromoBannersDisplay";
import SocialPromoSection from "./components/SocialPromoSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TrustBadges from "./components/TrustBadges";
import WelcomePopup from "./components/WelcomePopup";
import WhatsAppButton from "./components/WhatsAppButton";
import WhyChooseUs from "./components/WhyChooseUs";
import { useLocalCart } from "./hooks/useLocalCart";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartInitialStep, setCartInitialStep] = useState<
    "cart" | "address" | "payment"
  >("cart");
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useLocalCart();

  if (adminOpen) {
    return (
      <>
        <AdminDashboard onExit={() => setAdminOpen(false)} />
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

  const handleBuyNow = (_productId: bigint) => {
    setCartInitialStep("address");
    setCartOpen(true);
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
        <TrustBadges />
        <WhyChooseUs />
        <PromoBannersDisplay />
        <ProductsSection
          searchQuery={searchQuery}
          cart={cart}
          onBuyNow={handleBuyNow}
        />
        <BenefitsSection />
        <AboutSection />
        <HowItWorks />
        <TestimonialsSection />
        <FAQSection />
        <ConsultationForm />
      </main>
      <SocialPromoSection />
      <Footer onAdminOpen={() => setAdminOpen(true)} />
      <CartSidebar
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
          setCartInitialStep("cart");
        }}
        cart={cart}
        initialStep={cartInitialStep}
      />
      <MyOrders open={ordersOpen} onClose={() => setOrdersOpen(false)} />
      <WelcomePopup />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}
