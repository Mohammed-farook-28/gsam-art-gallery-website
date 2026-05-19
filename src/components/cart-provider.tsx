"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  CART_STORAGE_KEY,
  cartItemCount,
  cartSubtotal,
  sameLine,
  type Cart,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  cart: Cart;
  ready: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (slug: string, paper: CartItem["paper"], quantity: number) => void;
  removeItem: (slug: string, paper: CartItem["paper"]) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>([]);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage on first client render only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  // Persist any change after hydration.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      if (e instanceof Error && e.name === "QuotaExceededError") {
        console.warn("[cart] localStorage quota exceeded — cart won't persist this session");
      }
    }
  }, [cart, ready]);

  const addItem = useCallback((item: CartItem) => {
    setCart((current) => {
      const idx = current.findIndex((c) => sameLine(c, item));
      if (idx === -1) return [...current, item];
      const next = current.slice();
      next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
      return next;
    });
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>(
    (slug, paper, quantity) => {
      setCart((current) =>
        current
          .map((c) =>
            sameLine(c, { slug, paper }) ? { ...c, quantity: Math.max(0, quantity) } : c,
          )
          .filter((c) => c.quantity > 0),
      );
    },
    [],
  );

  const removeItem = useCallback<CartContextValue["removeItem"]>((slug, paper) => {
    setCart((current) => current.filter((c) => !sameLine(c, { slug, paper })));
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      ready,
      itemCount: cartItemCount(cart),
      subtotal: cartSubtotal(cart),
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [cart, ready, addItem, updateQuantity, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
