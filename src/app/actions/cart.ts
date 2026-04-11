"use server";

import {
  addToCart as fwAdd,
  createCart as fwCreate,
  getCart as fwGet,
  removeFromCart as fwRemove,
  updateCartQuantity as fwUpdate,
  buildCheckoutUrl,
  type Cart,
} from "@/lib/fourthwall";

/**
 * Server actions that proxy to the Fourthwall Storefront API.
 * Keeps the storefront token server-side.
 *
 * All actions return the updated Cart (or null on failure) so the client
 * can sync its local state in one round-trip.
 */

export async function createCartAction(
  initialVariantId?: string,
  quantity = 1
): Promise<Cart | null> {
  const items = initialVariantId
    ? [{ variantId: initialVariantId, quantity }]
    : [];
  return fwCreate(items);
}

export async function getCartAction(cartId: string): Promise<Cart | null> {
  return fwGet(cartId);
}

export async function addToCartAction(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart | null> {
  return fwAdd(cartId, variantId, quantity);
}

export async function updateCartQuantityAction(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart | null> {
  return fwUpdate(cartId, variantId, quantity);
}

export async function removeFromCartAction(
  cartId: string,
  variantId: string
): Promise<Cart | null> {
  return fwRemove(cartId, variantId);
}

export async function getCheckoutUrlAction(
  cartId: string,
  currency?: string
): Promise<string> {
  return buildCheckoutUrl(cartId, currency);
}
