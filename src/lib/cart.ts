import type { Paper } from "@/lib/products";

export type CartItem = {
  slug: string;
  title: string;
  image: string;
  price_inr: number;
  quantity: number;
  paper: Paper;
};

export type Cart = CartItem[];

/** Storage key for localStorage. Bump when shape changes incompatibly. */
export const CART_STORAGE_KEY = "gsam-cart-v1";

/** Flat-rate shipping within India in rupees. */
export const SHIPPING_INR = 50;

export function lineTotal(item: CartItem): number {
  return item.price_inr * item.quantity;
}

export function cartSubtotal(cart: Cart): number {
  return cart.reduce((sum, i) => sum + lineTotal(i), 0);
}

export function cartItemCount(cart: Cart): number {
  return cart.reduce((sum, i) => sum + i.quantity, 0);
}

/** Match items by slug + paper — same product, different paper = separate line. */
export function sameLine(a: Pick<CartItem, "slug" | "paper">, b: Pick<CartItem, "slug" | "paper">): boolean {
  return a.slug === b.slug && a.paper === b.paper;
}
