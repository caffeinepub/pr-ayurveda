import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Package, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onSearch: (query: string) => void;
  onOrdersOpen: () => void;
}

const navLinks = [
  { label: "होम", href: "#home" },
  { label: "उत्पाद", href: "#products" },
  { label: "श्रेणियां", href: "#categories" },
  { label: "समीक्षाएं", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "संपर्क", href: "#contact" },
];

const categoryLinks = [
  "दवाइयां",
  "विटामिन",
  "हेल्थ फूड",
  "लैब टेस्ट",
  "डॉक्टर परामर्श",
  "आयुर्वेदिक",
];

export default function Header({
  cartCount,
  onCartOpen,
  onSearch,
  onOrdersOpen,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
    if (val)
      document
        .querySelector("#products")
        ?.scrollIntoView({ behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-card" : ""
      } bg-white`}
    >
      {/* Main header row */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-brand-blue rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">UW</span>
              </div>
              <div>
                <div className="font-jakarta font-extrabold text-brand-blue text-lg leading-tight tracking-tight">
                  UrmiWellness
                </div>
                <div className="text-xs text-muted-foreground font-hindi">
                  स्वास्थ्य का विश्वस्त साथी
                </div>
              </div>
            </div>

            {/* Search bar - desktop */}
            {searchOpen ? (
              <div className="flex-1 mx-4 flex items-center gap-2">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="दवाइयां, विटामिन खोजें..."
                    className="pl-9 pr-8 font-hindi border-brand-blue focus-visible:ring-brand-blue"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        onSearch("");
                        inputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-sm font-hindi text-muted-foreground hover:text-foreground whitespace-nowrap"
                >
                  बंद करें
                </button>
              </div>
            ) : (
              <nav
                className="hidden md:flex items-center gap-5"
                data-ocid="nav.panel"
              >
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="font-hindi text-sm font-medium text-foreground hover:text-brand-blue transition-colors"
                    data-ocid={`nav.${link.href.replace("#", "")}.link`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="p-2 hover:text-brand-blue transition-colors hidden sm:block"
                onClick={() => setSearchOpen((v) => !v)}
                data-ocid="search.toggle_button"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-blue/40 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm font-hindi text-brand-blue"
                onClick={onOrdersOpen}
                data-ocid="orders.open_button"
              >
                <Package className="w-4 h-4" />
                मेरे ऑर्डर
              </button>
              <button
                type="button"
                className="relative p-2 hover:text-brand-blue transition-colors"
                onClick={onCartOpen}
                data-ocid="cart.open_modal_button"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
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
      </div>

      {/* Category nav bar - desktop */}
      <div className="hidden md:block bg-brand-blue border-b border-brand-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 h-10">
            {categoryLinks.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => scrollTo("#categories")}
                className="font-hindi text-xs font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-white border-t border-border pb-4"
          data-ocid="nav.mobile.panel"
        >
          <div className="px-4 pt-3 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="दवाइयां खोजें..."
                className="pl-9 font-hindi border-brand-blue focus-visible:ring-brand-blue"
              />
            </div>
          </div>
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
          <div className="px-6 pt-2 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOrdersOpen();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 border border-brand-blue rounded-md text-brand-blue font-hindi text-sm hover:bg-brand-blue/5"
            >
              <Package className="w-4 h-4" /> मेरे ऑर्डर देखें
            </button>
            <Button
              className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-hindi"
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
