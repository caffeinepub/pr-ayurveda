import { useCallback, useEffect, useState } from "react";
import { staticProducts } from "../data/staticData";

export interface LocalCartItem {
  productId: bigint;
  quantity: number;
}

const CART_KEY = "pr_ayurveda_cart";

function loadCart(): LocalCartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { productId: string; quantity: number }[];
    return parsed.map((item) => ({
      productId: BigInt(item.productId),
      quantity: item.quantity,
    }));
  } catch {
    return [];
  }
}

function saveCart(items: LocalCartItem[]) {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(
      items.map((i) => ({
        productId: i.productId.toString(),
        quantity: i.quantity,
      })),
    ),
  );
}

export function useLocalCart() {
  const [items, setItems] = useState<LocalCartItem[]>(() => loadCart());

  // Sync to localStorage whenever items change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback((productId: bigint, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getProductPrice = (productId: bigint) =>
    Number(staticProducts.find((p) => p.id === productId)?.price ?? 0);

  const total = items.reduce(
    (sum, item) => sum + getProductPrice(item.productId) * item.quantity,
    0,
  );

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    total,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
