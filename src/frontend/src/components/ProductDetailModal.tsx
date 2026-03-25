import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { staticProducts } from "@/data/staticData";
import type { useLocalCart } from "@/hooks/useLocalCart";
import {
  CheckCircle,
  Copy,
  Leaf,
  Share2,
  ShoppingCart,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Product = (typeof staticProducts)[0];

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  cart: ReturnType<typeof useLocalCart>;
  onBuyNow: (productId: bigint) => void;
}

function StarRating({
  rating,
  size = "md",
}: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "lg" ? "w-5 h-5" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= rating
              ? "fill-brand-gold text-brand-gold"
              : "text-muted fill-muted"
          }`}
        />
      ))}
    </div>
  );
}

const certBadges = [
  { label: "FSSAI", icon: "🏛️", title: "FSSAI प्रमाणित" },
  { label: "WHO-GMP", icon: "🌍", title: "WHO-GMP प्रमाणित" },
  { label: "Ayush", icon: "🏥", title: "Ayush मंत्रालय अनुमोदित" },
];

export default function ProductDetailModal({
  product,
  onClose,
  cart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  if (!product) return null;

  // eslint-disable-next-line
  const p = product as any;

  const handleAddToCart = () => {
    cart.addToCart(product.id, 1);
    toast.success(`${product.name} कार्ट में जोड़ दिया गया!`);
    onClose();
  };

  const handleBuyNow = () => {
    cart.addToCart(product.id, 1);
    onBuyNow(product.id);
    onClose();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `यह देखें: ${product.name} - PR Ayurveda ${window.location.href}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank",
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      toast.success("लिंक कॉपी हुआ!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast.error("लिंक कॉपी नहीं हो सका");
    }
  };

  const benefitsList = product.benefits.split(",").map((b) => b.trim());
  const ingredientsList = product.ingredients
    .split(",")
    .map((ing) => ing.trim());

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      {/* Full-height scrollable dialog on mobile; max-w-3xl on desktop */}
      <DialogContent
        className="max-w-3xl w-full p-0 overflow-hidden rounded-xl flex flex-col
        max-h-[95dvh] sm:max-h-[90vh]"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] bg-gradient-to-br from-green-50 to-amber-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
              aria-label="बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
            {p.badge && (
              <Badge className="absolute top-3 left-3 bg-brand-gold text-white border-0 font-hindi text-xs">
                {p.badge}
              </Badge>
            )}
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {/* Title + rating */}
            <div>
              <h2 className="font-hindi-serif font-bold text-xl sm:text-2xl text-brand-green leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <StarRating rating={product.rating} size="md" />
                <span className="font-hindi text-sm text-muted-foreground">
                  {product.rating}/5 ({product.reviews} समीक्षाएं)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-hindi-serif font-bold text-2xl sm:text-3xl text-brand-gold">
                ₹{product.price}
              </span>
              {p.originalPrice && (
                <>
                  <span className="font-hindi text-muted-foreground line-through text-lg">
                    ₹{p.originalPrice}
                  </span>
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-hindi text-xs">
                    {Math.round(
                      (1 - Number(product.price) / Number(p.originalPrice)) *
                        100,
                    )}
                    % छूट
                  </Badge>
                </>
              )}
            </div>

            {/* Certification badges below price */}
            <div className="flex flex-wrap gap-2">
              {certBadges.map((cert) => (
                <div
                  key={cert.label}
                  title={cert.title}
                  className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{cert.icon}</span>
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="font-hindi text-xs font-bold text-green-700">
                    {cert.label}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <span className="text-sm">✅</span>
                <span className="font-hindi text-xs font-bold text-amber-700">
                  ISO 9001:2015
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-hindi text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Benefits */}
            <div>
              <h4 className="font-hindi-serif font-bold text-brand-green text-sm mb-2">
                ✨ मुख्य फायदे
              </h4>
              <div className="flex flex-wrap gap-2">
                {benefitsList.map((benefit) => (
                  <span
                    key={benefit}
                    className="inline-flex items-center gap-1 bg-green-50 text-brand-green border border-green-200 rounded-full px-3 py-1 text-xs font-hindi"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="font-hindi-serif font-bold text-brand-green text-sm mb-2">
                🌱 सामग्री
              </h4>
              <div className="flex flex-wrap gap-2">
                {ingredientsList.map((ing) => (
                  <span
                    key={ing}
                    className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-3 py-1 text-xs font-hindi"
                  >
                    <Leaf className="w-3 h-3" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-hindi">
              <span className="flex items-center gap-1">✅ 100% प्राकृतिक</span>
              <span className="flex items-center gap-1">🔒 गोपनीय डिलीवरी</span>
              <span className="flex items-center gap-1">↩️ 7 दिन वापसी</span>
              <span className="flex items-center gap-1">
                🚚 3-5 दिन डिलीवरी
              </span>
            </div>

            {/* Social sharing */}
            <div className="border-t border-border pt-4">
              <p className="font-hindi text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" />
                दोस्तों के साथ शेयर करें
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleFacebookShare}
                  data-ocid="product.facebook_button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-hindi font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#1877F2" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    role="img"
                    aria-labelledby="fb-detail-icon"
                  >
                    <title id="fb-detail-icon">Facebook</title>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  data-ocid="product.secondary_button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-hindi font-semibold text-white transition-colors hover:opacity-90"
                  style={{ background: "#25D366" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    aria-label="WhatsApp"
                    role="img"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  data-ocid="product.toggle"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-hindi font-semibold border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {linkCopied ? "कॉपी हुआ!" : "लिंक कॉपी"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA bar — always visible at bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex flex-col gap-2 z-10 shrink-0">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-hindi font-bold text-base min-h-[48px]"
            onClick={handleBuyNow}
            data-ocid="product.primary_button"
          >
            <Zap className="w-5 h-5 mr-2" />
            अभी खरीदें
          </Button>
          <Button
            className="w-full bg-brand-green hover:bg-brand-green-light text-white font-hindi font-semibold text-sm min-h-[44px]"
            onClick={handleAddToCart}
            data-ocid="product.secondary_button"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            कार्ट में जोड़ें
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
