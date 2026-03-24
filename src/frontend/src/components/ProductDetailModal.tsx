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
import { CheckCircle, Leaf, ShoppingCart, Star, X, Zap } from "lucide-react";
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

export default function ProductDetailModal({
  product,
  onClose,
  cart,
  onBuyNow,
}: ProductDetailModalProps) {
  if (!product) return null;

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

  const benefitsList = product.benefits.split(",").map((b) => b.trim());
  const ingredientsList = product.ingredients
    .split(",")
    .map((ing) => ing.trim());

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      {/* Full-height scrollable dialog on mobile; max-w-3xl on desktop */}
      <DialogContent
        className="max-w-3xl w-full p-0 overflow-hidden rounded-xl flex flex-col
          h-[100dvh] sm:h-auto sm:max-h-[90vh]"
        data-ocid="product.dialog"
      >
        {/* Custom close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
          aria-label="बंद करें"
          data-ocid="product.close_button"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Scrollable body */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto">
          {/* Image — smaller on mobile */}
          <div className="md:w-2/5 bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4 md:p-6 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-48 md:max-h-[320px] max-w-[240px] md:max-w-[280px] object-contain rounded-lg shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/400x400/166534/ffffff?text=PR+Ayurveda";
              }}
            />
          </div>

          {/* Details */}
          <div className="md:w-3/5 p-4 md:p-6 flex flex-col gap-4 pb-2">
            <DialogHeader>
              <Badge className="w-fit bg-brand-green text-white font-hindi text-xs mb-1">
                🌿 PR Ayurveda
              </Badge>
              <DialogTitle className="font-hindi-serif text-xl md:text-2xl font-bold text-brand-green leading-snug">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size="lg" />
              <span className="text-sm font-hindi text-muted-foreground">
                {product.rating}.0 ({product.reviews.toLocaleString("hi-IN")}{" "}
                समीक्षाएं)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-bold text-brand-green font-hindi-serif">
                ₹{Number(product.price)}
              </span>
              <span className="text-base line-through text-muted-foreground font-hindi">
                ₹{Math.round(Number(product.price) * 1.4)}
              </span>
              <Badge className="bg-red-500 text-white font-hindi text-xs">
                30% छूट
              </Badge>
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
