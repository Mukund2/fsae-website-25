"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addToCartAction,
  createCartAction,
  getCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/app/actions/cart";
import type { Cart } from "@/lib/fourthwall";

const CART_ID_KEY = "fw_cart_id";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hydrate existing cart from localStorage on mount
  useEffect(() => {
    const storedId =
      typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null;
    if (!storedId) return;

    let cancelled = false;
    setLoading(true);
    getCartAction(storedId)
      .then((c) => {
        if (cancelled) return;
        if (c) {
          setCart(c);
        } else {
          // Cart expired/invalid — clear stale id
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const persistCartId = useCallback((id: string | null) => {
    if (typeof window === "undefined") return;
    if (id) localStorage.setItem(CART_ID_KEY, id);
    else localStorage.removeItem(CART_ID_KEY);
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true);
      try {
        let updated: Cart | null;
        if (!cart) {
          updated = await createCartAction(variantId, quantity);
        } else {
          updated = await addToCartAction(cart.id, variantId, quantity);
          // Rare: cart was invalidated server-side. Recover by creating a new one.
          if (!updated) {
            updated = await createCartAction(variantId, quantity);
          }
        }
        if (updated) {
          setCart(updated);
          persistCartId(updated.id);
          setDrawerOpen(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [cart, persistCartId]
  );

  const updateItem = useCallback(
    async (variantId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await updateCartQuantityAction(
          cart.id,
          variantId,
          quantity
        );
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (variantId: string) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await removeFromCartAction(cart.id, variantId);
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        drawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
