import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const navLinks = [
  { label: "होम", href: "#home" },
  { label: "उत्पाद", href: "#products" },
  { label: "लाभ", href: "#benefits" },
  { label: "समीक्षाएं", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "संपर्क करें", href: "#contact" },
];

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-cream-DEFAULT shadow-card"
          : "bg-brand-cream-DEFAULT"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <span className="text-brand-cream-DEFAULT text-xs font-bold">
                PR
              </span>
            </div>
            <div>
              <div className="font-playfair font-bold text-brand-green text-lg leading-tight tracking-wider">
                PR AYURVEDA
              </div>
              <div className="text-xs text-muted-foreground font-hindi tracking-wide">
                शुद्ध आयुर्वेद
              </div>
            </div>
          </div>

          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.panel"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-hindi text-sm font-medium text-foreground hover:text-brand-green transition-colors uppercase tracking-wide"
                data-ocid={`nav.${link.href.replace("#", "")}.link`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 hover:text-brand-green transition-colors hidden sm:block"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 hover:text-brand-green transition-colors hidden sm:block"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="relative p-2 hover:text-brand-green transition-colors"
              onClick={onCartOpen}
              data-ocid="cart.open_modal_button"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden bg-brand-cream-DEFAULT border-t border-border pb-4"
          data-ocid="nav.mobile.panel"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-6 py-3 font-hindi text-sm font-medium hover:bg-secondary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="px-6 pt-3">
            <Button
              className="w-full bg-brand-green hover:bg-brand-green-light text-white font-hindi"
              onClick={() => scrollTo("#contact")}
              data-ocid="nav.consult.primary_button"
            >
              निःशुल्क परामर्श
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
