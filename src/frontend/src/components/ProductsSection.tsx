import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staticProducts } from "@/data/staticData";
import type { useLocalCart } from "@/hooks/useLocalCart";
import { useProducts } from "@/hooks/useQueries";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
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

interface ProductsSectionProps {
  searchQuery?: string;
  cart: ReturnType<typeof useLocalCart>;
}

export default function ProductsSection({
  searchQuery = "",
  cart,
}: ProductsSectionProps) {
  const [startIdx, setStartIdx] = useState(0);
  const { data: backendProducts } = useProducts();

  const allProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts.map((p, i) => ({
          ...p,
          image:
            staticProducts[i % staticProducts.length]?.image ||
            "/assets/generated/product-shilajit.dim_400x400.jpg",
          rating: 4,
          reviews: 500,
        }))
      : staticProducts;

  const products = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allProducts;

  const visibleCount = 4;
  const clampedStart = Math.min(
    startIdx,
    Math.max(0, products.length - visibleCount),
  );
  const visible = products.slice(clampedStart, clampedStart + visibleCount);

  const handlePrev = () => setStartIdx((p) => Math.max(0, p - 1));
  const handleNext = () =>
    setStartIdx((p) => Math.min(products.length - visibleCount, p + 1));

  const handleAddToCart = (productId: bigint, name: string) => {
    cart.addToCart(productId, 1);
    toast.success(`${name} कार्ट में जोड़ दिया गया!`);
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
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
        </motion.div>

        <div className="relative">
          {!searchQuery && (
            <div className="flex justify-end mb-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={clampedStart === 0}
                  className="w-10 h-10 rounded-full border-2 border-brand-green flex items-center justify-center hover:bg-brand-green hover:text-white transition-colors disabled:opacity-40"
                  data-ocid="products.pagination_prev"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={clampedStart >= products.length - visibleCount}
                  className="w-10 h-10 rounded-full border-2 border-brand-green flex items-center justify-center hover:bg-brand-green hover:text-white transition-colors disabled:opacity-40"
                  data-ocid="products.pagination_next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-hindi text-lg text-muted-foreground">
                "{searchQuery}" के लिए कोई उत्पाद नहीं मिला
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-ocid="products.list"
            >
              {(searchQuery ? products : visible).map((product, i) => (
                <motion.div
                  key={product.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
                  data-ocid={`products.item.${i + 1}`}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={(product as (typeof staticProducts)[0]).image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-brand-green text-white font-hindi text-xs">
                      आयुर्वेदिक
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
                      <StarRating
                        rating={(product as (typeof staticProducts)[0]).rating}
                      />
                      <span className="text-xs text-muted-foreground font-hindi">
                        ({(product as (typeof staticProducts)[0]).reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xl text-brand-green font-hindi-serif">
                        ₹{Number(product.price)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green-light text-white font-hindi text-xs px-3"
                        onClick={() =>
                          handleAddToCart(product.id, product.name)
                        }
                        data-ocid={`products.item.${i + 1}.button`}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        कार्ट में जोड़ें
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
