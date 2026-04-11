"use client";

import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const { cart, openDrawer } = useCart();
  const pathname = usePathname();
  const count = cart?.itemCount ?? 0;

  // Only show the cart button in the merch section, or anywhere if the
  // user already has items in their cart.
  const onMerch = pathname?.startsWith("/merch") ?? false;
  if (!onMerch && count === 0) return null;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center text-foreground/70 hover:text-foreground",
        className
      )}
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-gold px-1 font-mono text-[9px] font-bold text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
