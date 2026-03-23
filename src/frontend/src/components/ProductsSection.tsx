import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staticProducts } from "@/data/staticData";
import type { useLocalCart } from "@/hooks/useLocalCart";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

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
}

export default function ProductsSection({
  searchQuery = "",
  cart,
}: ProductsSectionProps) {
  const products = searchQuery.trim()
    ? staticProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : staticProducts;

  const handleAddToCart = (productId: bigint, name: string) => {
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
              "{searchQuery}" के लिए {products.length} परिणाम मिले
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-hindi text-lg text-muted-foreground">
              "{searchQuery}" के लिए कोई उत्पाद नहीं मिला
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => {
              const badge = productBadges[i % productBadges.length];
              return (
                <div
                  key={product.id.toString()}
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/400x400/166534/ffffff?text=PR+Ayurveda";
                      }}
                    />
                    <Badge
                      className={`absolute top-3 left-3 font-hindi text-xs font-bold ${badge.className}`}
                    >
                      {badge.label}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-hindi-serif font-bold text-brand-green text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground font-hindi text-xs mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-muted-foreground font-hindi">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xl text-brand-green font-hindi-serif">
                        ₹{Number(product.price)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green-light text-white font-hindi text-xs px-3"
                        onClick={() =>
                          handleAddToCart(product.id, product.name)
                        }
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
    </section>
  );
}
