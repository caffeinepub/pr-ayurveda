import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { staticProducts } from "@/data/staticData";
import {
  useAddToCart,
  useCart,
  usePlaceOrder,
  useRemoveFromCart,
} from "@/hooks/useQueries";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { data: cart } = useCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const placeOrder = usePlaceOrder();

  const getProductName = (productId: bigint) => {
    const p = staticProducts.find((sp) => sp.id === productId);
    return p?.name || `उत्पाद #${productId}`;
  };

  const getProductPrice = (productId: bigint) => {
    const p = staticProducts.find((sp) => sp.id === productId);
    return Number(p?.price || 0);
  };

  const handleCheckout = async () => {
    try {
      await placeOrder.mutateAsync();
      toast.success("🎉 आपका ऑर्डर सफलतापूर्वक दे दिया गया!");
      onClose();
    } catch {
      toast.error("ऑर्डर देने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  const items = cart?.items || [];
  const total = cart?.totalPrice
    ? Number(cart.totalPrice)
    : items.reduce(
        (sum, item) =>
          sum + getProductPrice(item.productId) * Number(item.quantity),
        0,
      );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
            data-ocid="cart.sheet"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-green" />
                <h2 className="font-hindi-serif font-bold text-xl text-brand-green">
                  आपका कार्ट
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full"
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16" data-ocid="cart.empty_state">
                  <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4" />
                  <p className="font-hindi text-muted-foreground text-lg">
                    आपका कार्ट खाली है
                  </p>
                  <p className="font-hindi text-muted-foreground text-sm mt-2">
                    उत्पाद जोड़ें और खरीदारी करें
                  </p>
                  <Button
                    onClick={onClose}
                    className="mt-6 bg-brand-green text-white font-hindi"
                    data-ocid="cart.secondary_button"
                  >
                    उत्पाद देखें
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <div
                      key={item.productId.toString()}
                      className="flex items-center gap-4 bg-card rounded-lg p-4"
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-hindi font-semibold text-brand-green text-sm truncate">
                          {getProductName(item.productId)}
                        </p>
                        <p className="font-hindi-serif font-bold text-brand-gold mt-1">
                          ₹{getProductPrice(item.productId)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            addToCart.mutate({
                              productId: item.productId,
                              quantity: BigInt(-1),
                            })
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-hindi font-medium w-6 text-center">
                          {Number(item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addToCart.mutate({
                              productId: item.productId,
                              quantity: BigInt(1),
                            })
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart.mutate(item.productId)}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                        data-ocid={`cart.item.${i + 1}.delete_button`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-hindi text-muted-foreground">
                    उप-योग
                  </span>
                  <span className="font-hindi-serif font-bold text-xl text-brand-green">
                    ₹{total}
                  </span>
                </div>
                <p className="font-hindi text-xs text-muted-foreground mb-4">
                  🚚 निःशुल्क डिलीवरी ₹999 से अधिक पर
                </p>
                <Separator className="mb-4" />
                <Button
                  className="w-full bg-brand-gold hover:bg-brand-gold-light text-white font-hindi font-semibold py-6 text-base"
                  onClick={handleCheckout}
                  disabled={placeOrder.isPending}
                  data-ocid="cart.confirm_button"
                >
                  {placeOrder.isPending
                    ? "ऑर्डर दिया जा रहा है..."
                    : `ऑर्डर करें · ₹${total}`}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
