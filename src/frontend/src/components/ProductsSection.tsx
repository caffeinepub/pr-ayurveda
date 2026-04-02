import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminProducts } from "@/hooks/useAdminProducts";
import type { useLocalCart } from "@/hooks/useLocalCart";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductDetailModal from "./ProductDetailModal";

type Product = ReturnType<typeof getAdminProducts>[0];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "fill-brand-gold text-brand-gold" : "text-muted"
          }`}
        />
      ))}
    </div>
  );
}

const productBadges = [
  { label: "🔥 बेस्टसेलर", className: "bg-red-500 text-white" },
  { label: "⭐ टॉप रेटेड", className: "bg-amber-500 text-white" },
  { label: "🌿 नया स्टॉक", className: "bg-green-600 text-white" },
  { label: "💯 सबसे लोकप्रिय", className: "bg-blue-600 text-white" },
  { label: "🎯 विशेष ऑफर", className: "bg-purple-600 text-white" },
  { label: "✅ डॉक्टर अनुशंसित", className: "bg-teal-600 text-white" },
  { label: "🌟 प्रीमियम", className: "bg-orange-600 text-white" },
  { label: "💊 आयुर्वेदिक", className: "bg-emerald-600 text-white" },
];

interface ProductsSectionProps {
  searchQuery?: string;
  cart: ReturnType<typeof useLocalCart>;
  onBuyNow: (productId: bigint) => void;
}

export default function ProductsSection({
  searchQuery = "",
  cart,
  onBuyNow,
}: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const allProducts = getAdminProducts();

  const products = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allProducts;

  const handleAddToCart = (
    e: React.MouseEvent,
    productId: bigint,
    name: string,
  ) => {
    e.stopPropagation();
    cart.addToCart(productId, 1);
    toast.success(`${name} कार्ट में जोड़ दिया गया!`);
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-gold font-hindi text-sm font-semibold uppercase tracking-widest mb-2">
            हमारे उत्पाद
          </p>
          <h2 className="font-hindi-serif text-3xl md:text-4xl font-bold text-brand-green">
            श्रेष्ठ आयुर्वेदिक उत्पाद
          </h2>
          <p className="text-muted-foreground font-hindi mt-3 max-w-xl mx-auto">
            शुद्ध जड़ी-बूटियों से बने, विशेषज्ञ वैद्यों द्वारा अनुमोदित उत्पाद
          </p>
          {searchQuery && (
            <p className="text-brand-green font-hindi mt-2 text-sm">
              &quot;{searchQuery}&quot; के लिए {products.length} परिणाम मिले
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16" data-ocid="products.empty_state">
            <p className="font-hindi text-lg text-muted-foreground">
              &quot;{searchQuery}&quot; के लिए कोई उत्पाद नहीं मिला
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => {
              const badge = productBadges[i % productBadges.length];
              return (
                <div
                  key={product.id.toString()}
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all group hover:-translate-y-1 duration-200"
                  data-ocid={`products.item.${i + 1}`}
                >
                  {/* Clickable image + title area */}
                  <button
                    type="button"
                    className="w-full text-left focus:outline-none"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x400/1e40af/ffffff?text=UrmiWellness";
                        }}
                      />
                      <Badge
                        className={`absolute top-3 left-3 font-hindi text-xs font-bold ${badge.className}`}
                      >
                        {badge.label}
                      </Badge>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                        <span className="bg-white/90 text-brand-green font-hindi text-xs font-bold px-3 py-1 rounded-full shadow">
                          👆 विवरण देखें
                        </span>
                      </div>
                    </div>
                    <div className="px-4 pt-4 pb-1">
                      <h3 className="font-hindi-serif font-bold text-brand-green text-lg mb-1">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground font-hindi text-xs mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-muted-foreground font-hindi">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </button>
                  {/* Non-clickable bottom area with price + add to cart */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xl text-brand-green font-hindi-serif">
                        ₹{Number(product.price)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green-light text-white font-hindi text-xs px-3"
                        onClick={(e) =>
                          handleAddToCart(e, product.id, product.name)
                        }
                        data-ocid={`products.item.${i + 1}`}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        कार्ट में जोड़ें
                      </Button>
                    </div>
                    <p className="text-red-500 font-hindi text-xs font-semibold">
                      ⚠️ सीमित स्टॉक
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        cart={cart}
        onBuyNow={onBuyNow}
      />
    </section>
  );
}
