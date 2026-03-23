import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">PR</span>
              </div>
              <div>
                <div className="font-playfair font-bold text-xl tracking-wider">
                  PR AYURVEDA
                </div>
                <div className="text-white/70 text-xs font-hindi">
                  शुद्ध आयुर्वेद, संपूर्ण स्वास्थ्य
                </div>
              </div>
            </div>
            <p className="font-hindi text-white/70 text-sm leading-relaxed mb-4 max-w-xs">
              हम पुरुषों के स्वास्थ्य के लिए 100% प्राकृतिक आयुर्वेदिक उत्पाद बनाते हैं।
            </p>
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
              <div className="font-hindi text-white/80 text-sm leading-relaxed">
                ओखला फेज 3, दिल्ली
                <br />
                <span className="text-white/50 text-xs">
                  Okhla Phase 3, New Delhi
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a
                href="tel:+919217127566"
                className="font-hindi text-white/80 text-sm hover:text-brand-gold transition-colors"
              >
                +91 92171 27566
              </a>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-brand-gold rounded-full flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-hindi-serif font-bold text-brand-gold mb-4">
              त्वरित लिंक
            </h4>
            <ul className="space-y-2">
              {[
                { label: "होम", href: "#home" },
                { label: "उत्पाद", href: "#products" },
                { label: "लाभ", href: "#benefits" },
                { label: "समीक्षाएं", href: "#testimonials" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="font-hindi text-white/70 hover:text-brand-gold text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-hindi-serif font-bold text-brand-gold mb-4">
              श्रेणियाँ
            </h4>
            <ul className="space-y-2">
              {[
                "यौन स्वास्थ्य",
                "शक्ति वर्धक",
                "तनाव मुक्ति",
                "हार्मोन बैलेंस",
                "स्टैमिना बूस्टर",
              ].map((cat) => (
                <li key={cat}>
                  <span className="font-hindi text-white/70 text-sm">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-hindi-serif font-bold text-brand-gold mb-4">
              न्यूज़लेटर
            </h4>
            <p className="font-hindi text-white/70 text-sm mb-4">
              नए उत्पादों और ऑफर की जानकारी पाएं
            </p>
            <div className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="आपका ईमेल"
                type="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-hindi text-sm"
                data-ocid="footer.newsletter.input"
              />
              <Button
                size="sm"
                className="bg-brand-gold hover:bg-brand-gold-light text-white font-hindi"
                data-ocid="footer.newsletter.submit_button"
              >
                भेजें
              </Button>
            </div>
            <div className="mt-6">
              <h4 className="font-hindi-serif font-bold text-brand-gold mb-3">
                सहायता
              </h4>
              <ul className="space-y-1">
                {["FAQ", "रिटर्न पॉलिसी", "प्राइवेसी पॉलिसी", "संपर्क करें"].map(
                  (item) => (
                    <li key={item}>
                      <span className="font-hindi text-white/70 text-sm">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-hindi text-white/60 text-sm text-center">
            © {year} PR Ayurveda. सर्वाधिकार सुरक्षित।
          </p>
          <p className="text-white/50 text-sm text-center">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
