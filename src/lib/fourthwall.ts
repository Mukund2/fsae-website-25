/**
 * Fourthwall Storefront API client.
 *
 * Docs: https://docs.fourthwall.com/storefront/
 * Base: https://storefront-api.fourthwall.com/v1
 *
 * The storefront token (ptkn_*) is public by design, but we only use it
 * server-side so we don't ship it in the client bundle.
 */

const API_BASE = "https://storefront-api.fourthwall.com/v1";
const DEFAULT_CURRENCY = "USD";

/* ----- Raw API types ----- */

interface FourthwallImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface FourthwallPrice {
  value: number;
  currency: string;
}

export interface FourthwallVariant {
  id: string;
  name: string;
  sku?: string;
  unitPrice: FourthwallPrice;
  compareAtPrice?: FourthwallPrice;
  attributes?: {
    description?: string;
    color?: { name: string; swatch?: string };
    size?: { name: string };
  };
  stock?: { type: "UNLIMITED" | "LIMITED" | "OUT_OF_STOCK"; inStock?: number };
  images?: FourthwallImage[];
}

interface FourthwallProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  state?: { type: string };
  access?: { type: string };
  images: FourthwallImage[];
  variants: FourthwallVariant[];
}

interface FourthwallListResponse<T> {
  results: T[];
  paging: {
    pageNumber: number;
    pageSize: number;
    elementsSize: number;
    elementsTotal: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

interface FourthwallCartItem {
  variant: FourthwallVariant;
  quantity: number;
}

export interface FourthwallCart {
  id: string;
  items: FourthwallCartItem[];
  metadata?: Record<string, string>;
}

/* ----- Public types used by the UI ----- */

export interface MerchVariant {
  id: string;
  name: string;
  size: string | null;
  color: { name: string; swatch?: string } | null;
  price: number;
  currency: string;
  compareAtPrice: number | null;
  inStock: boolean;
  stockCount: number | null;
}

export interface MerchProduct {
  id: string;
  slug: string;
  name: string;
  /** HTML description from Fourthwall admin (may contain <p>, <strong>, <em>, <ul>, etc.) */
  description: string;
  /** Plain-text description for card previews and metadata (tags stripped). */
  descriptionText: string;
  images: string[];
  image: string | null;
  price: number;
  currency: string;
  compareAtPrice: number | null;
  available: boolean;
  variants: MerchVariant[];
  sizes: string[];
  colors: { name: string; swatch?: string }[];
}

export interface CartLine {
  variantId: string;
  productName: string;
  variantName: string;
  size: string | null;
  color: string | null;
  image: string | null;
  unitPrice: number;
  currency: string;
  quantity: number;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  subtotal: number;
  currency: string;
  itemCount: number;
}

/* ----- Helpers ----- */

function getToken(): string | null {
  return process.env.FOURTHWALL_STOREFRONT_TOKEN || null;
}

export function getShopDomain(): string {
  return (
    process.env.FOURTHWALL_SHOP_DOMAIN ||
    "spartan-racing-formula-sae-shop.fourthwall.com"
  );
}

function buildUrl(path: string, params: Record<string, string> = {}): string {
  const token = getToken();
  if (!token) throw new Error("FOURTHWALL_STOREFRONT_TOKEN not set");
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("storefront_token", token);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  }
  return url.toString();
}

async function fourthwallGet<T>(
  path: string,
  params: Record<string, string> = {},
  opts: { revalidate?: number; cache?: RequestCache } = {}
): Promise<T | null> {
  try {
    const res = await fetch(buildUrl(path, params), {
      ...(opts.cache ? { cache: opts.cache } : {}),
      ...(opts.revalidate !== undefined
        ? { next: { revalidate: opts.revalidate } }
        : {}),
    });
    if (!res.ok) {
      console.error(`[fourthwall] GET ${path} → ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("[fourthwall] GET failed", err);
    return null;
  }
}

async function fourthwallPost<T>(
  path: string,
  body: unknown,
  params: Record<string, string> = {}
): Promise<T | null> {
  try {
    const res = await fetch(buildUrl(path, params), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        `[fourthwall] POST ${path} → ${res.status} ${res.statusText} ${text}`
      );
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("[fourthwall] POST failed", err);
    return null;
  }
}

/* ----- Mapping ----- */

function mapVariant(v: FourthwallVariant): MerchVariant {
  const stockType = v.stock?.type ?? "UNLIMITED";
  return {
    id: v.id,
    name: v.name,
    size: v.attributes?.size?.name ?? null,
    color: v.attributes?.color
      ? { name: v.attributes.color.name, swatch: v.attributes.color.swatch }
      : null,
    price: v.unitPrice.value,
    currency: v.unitPrice.currency,
    compareAtPrice: v.compareAtPrice?.value ?? null,
    inStock: stockType !== "OUT_OF_STOCK" && (v.stock?.inStock ?? 1) > 0,
    stockCount: stockType === "LIMITED" ? (v.stock?.inStock ?? 0) : null,
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function mapProduct(p: FourthwallProduct): MerchProduct {
  const variants = p.variants.map(mapVariant);
  const firstVariant = variants[0];
  const price = firstVariant?.price ?? 0;
  const currency = firstVariant?.currency ?? DEFAULT_CURRENCY;
  const compareAt = firstVariant?.compareAtPrice ?? null;

  // Unique sizes / colors preserved in variant order
  const sizes: string[] = [];
  const colorMap = new Map<string, { name: string; swatch?: string }>();
  for (const v of variants) {
    if (v.size && !sizes.includes(v.size)) sizes.push(v.size);
    if (v.color && !colorMap.has(v.color.name)) colorMap.set(v.color.name, v.color);
  }

  const images = p.images.map((i) => i.url);
  const image = images[0] ?? null;
  const available =
    p.state?.type === "AVAILABLE" && variants.some((v) => v.inStock);

  const description = p.description || "";
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description,
    descriptionText: stripHtml(description),
    images,
    image,
    price,
    currency,
    compareAtPrice: compareAt,
    available,
    variants,
    sizes,
    colors: Array.from(colorMap.values()),
  };
}

function mapCart(raw: FourthwallCart): Cart {
  const lines: CartLine[] = raw.items.map((item) => ({
    variantId: item.variant.id,
    productName: item.variant.name.split(" - ")[0] || item.variant.name,
    variantName: item.variant.name,
    size: item.variant.attributes?.size?.name ?? null,
    color: item.variant.attributes?.color?.name ?? null,
    image: item.variant.images?.[0]?.url ?? null,
    unitPrice: item.variant.unitPrice.value,
    currency: item.variant.unitPrice.currency,
    quantity: item.quantity,
  }));

  const currency = lines[0]?.currency ?? DEFAULT_CURRENCY;
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);

  return { id: raw.id, lines, subtotal, currency, itemCount };
}

/* ----- Public: products ----- */

export async function getMerchProducts(): Promise<MerchProduct[]> {
  const data = await fourthwallGet<FourthwallListResponse<FourthwallProduct>>(
    "/collections/all/products",
    { limit: "100" },
    { revalidate: 600 }
  );
  if (!data) return [];
  return data.results.map(mapProduct);
}

export async function getMerchProductBySlug(
  slug: string
): Promise<MerchProduct | null> {
  // The collection listing returns full product shapes so we filter from there.
  // This keeps us to a single cached request per revalidation window.
  const products = await getMerchProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

/* ----- Public: cart ----- */

export async function createCart(
  items: { variantId: string; quantity: number }[] = []
): Promise<Cart | null> {
  const raw = await fourthwallPost<FourthwallCart>("/carts", { items });
  return raw ? mapCart(raw) : null;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const raw = await fourthwallGet<FourthwallCart>(
    `/carts/${cartId}`,
    {},
    { cache: "no-store" }
  );
  return raw ? mapCart(raw) : null;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart | null> {
  const raw = await fourthwallPost<FourthwallCart>(`/carts/${cartId}/add`, {
    items: [{ variantId, quantity }],
  });
  return raw ? mapCart(raw) : null;
}

export async function updateCartQuantity(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart | null> {
  const raw = await fourthwallPost<FourthwallCart>(`/carts/${cartId}/change`, {
    items: [{ variantId, quantity }],
  });
  return raw ? mapCart(raw) : null;
}

export async function removeFromCart(
  cartId: string,
  variantId: string
): Promise<Cart | null> {
  const raw = await fourthwallPost<FourthwallCart>(`/carts/${cartId}/remove`, {
    items: [{ variantId, quantity: 0 }],
  });
  return raw ? mapCart(raw) : null;
}

/**
 * Build the Fourthwall-hosted checkout URL for a cart. This is where the
 * payment step happens — it cannot be embedded on our domain due to PCI.
 */
export function buildCheckoutUrl(
  cartId: string,
  currency: string = DEFAULT_CURRENCY
): string {
  const domain = getShopDomain();
  return `https://${domain}/checkout/?cartCurrency=${encodeURIComponent(
    currency
  )}&cartId=${encodeURIComponent(cartId)}`;
}
