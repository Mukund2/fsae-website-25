"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { getCheckoutUrlAction } from "@/app/actions/cart";
import { cn } from "@/lib/utils";

function formatPrice(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export function CartDrawer() {
  const { cart, loading, drawerOpen, closeDrawer, updateItem, removeItem } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  const handleCheckout = async () => {
    if (!cart || cart.lines.length === 0) return;
    setCheckingOut(true);
    try {
      const url = await getCheckoutUrlAction(cart.id, cart.currency);
      window.location.href = url;
    } catch {
      setCheckingOut(false);
    }
  };

  const itemCount = cart?.itemCount ?? 0;
  const hasItems = itemCount > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!drawerOpen}
        onClick={closeDrawer}
        className={cn(
          "fixed inset-0 z-[70] bg-black/40 transition-opacity",
          drawerOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!drawerOpen}
        className={cn(
          "fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-border bg-white transition-transform",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold">
              Your Bag
            </p>
            <h2 className="font-display text-2xl uppercase tracking-tight">
              {itemCount > 0 ? `${itemCount} item${itemCount === 1 ? "" : "s"}` : "Empty"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center text-foreground/60 hover:text-foreground"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {!hasItems ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                Nothing here yet
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                Add something from the merch page and it&apos;ll show up here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart?.lines.map((line) => (
                <li
                  key={line.variantId}
                  className="flex gap-4 px-6 py-5"
                >
                  {/* Image */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-border bg-surface">
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.productName}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-sm uppercase tracking-tight leading-tight">
                      {line.productName}
                    </p>
                    {(line.size || line.color) && (
                      <p className="mt-1 font-display text-[10px] uppercase tracking-[0.15em] text-foreground/40">
                        {[line.color, line.size].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    <p className="mt-1 font-display text-sm text-gold">
                      {formatPrice(line.unitPrice, line.currency)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(line.variantId, Math.max(0, line.quantity - 1))
                          }
                          disabled={loading}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-40"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center font-display text-xs">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(line.variantId, line.quantity + 1)
                          }
                          disabled={loading}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-40"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.variantId)}
                        disabled={loading}
                        aria-label="Remove item"
                        className="flex h-8 w-8 items-center justify-center text-foreground/40 hover:text-red-600 disabled:opacity-40"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {hasItems && cart && (
          <div className="border-t border-border bg-surface px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                Subtotal
              </span>
              <span className="font-display text-2xl">
                {formatPrice(cart.subtotal, cart.currency)}
              </span>
            </div>
            <p className="mt-1 font-display text-[10px] uppercase tracking-[0.15em] text-foreground/30">
              Shipping + taxes at checkout
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut || loading}
              className={cn(
                "mt-5 flex w-full items-center justify-center gap-2 bg-gold px-6 py-4 font-display text-lg uppercase tracking-wider text-background",
                checkingOut || loading
                  ? "opacity-60"
                  : "hover:bg-gold/90"
              )}
            >
              {checkingOut ? "Redirecting…" : "Checkout"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
