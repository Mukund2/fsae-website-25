export interface MerchItem {
  slug: string;
  name: string;
  price: number;
  category: "apparel" | "accessories" | "headwear";
  image: string | null;
  description: string;
  sizes?: string[];
}

export const merch: MerchItem[] = [
  {
    slug: "team-tee",
    name: "Team Tee",
    price: 25,
    category: "apparel",
    image: null,
    description: "Classic cotton tee with Spartan Racing logo",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "racing-hoodie",
    name: "Racing Hoodie",
    price: 50,
    category: "apparel",
    image: null,
    description: "Heavyweight hoodie with embroidered crest",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "pit-crew-jacket",
    name: "Pit Crew Jacket",
    price: 65,
    category: "apparel",
    image: null,
    description: "Lightweight quarter-zip with reflective details",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "spartan-cap",
    name: "Spartan Cap",
    price: 20,
    category: "headwear",
    image: null,
    description: "Structured snapback with embroidered logo",
  },
  {
    slug: "beanie",
    name: "Racing Beanie",
    price: 18,
    category: "headwear",
    image: null,
    description: "Knit beanie with woven Spartan Racing patch",
  },
  {
    slug: "sticker-pack",
    name: "Sticker Pack",
    price: 8,
    category: "accessories",
    image: null,
    description: "Set of 5 die-cut vinyl stickers",
  },
  {
    slug: "water-bottle",
    name: "Water Bottle",
    price: 15,
    category: "accessories",
    image: null,
    description: "32 oz insulated bottle with laser-etched logo",
  },
  {
    slug: "lanyard",
    name: "Team Lanyard",
    price: 6,
    category: "accessories",
    image: null,
    description: "Woven lanyard with detachable buckle",
  },
];

export const CATEGORIES = ["apparel", "headwear", "accessories"] as const;
