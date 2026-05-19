// Product types + sample data. Pure module — safe to import from client
// components. Server-only fetchers live in `products-server.ts`.

export type Paper = "deluxe-300gsm" | "textured-200gsm";

export type Product = {
  slug: string;
  title: string;
  category: "postcards" | "greeting-cards";
  size: string;
  description: string;
  image: string;
  price_inr: number;
  papers: Paper[];
};

export const SAMPLE_PRODUCTS: Product[] = [
  {
    slug: "brihadeeshwarar-temple",
    title: "Brihadeeshwarar Temple",
    category: "postcards",
    size: "A6",
    description:
      "To empower lives of every human, capture the beauty of life. To be human, to feel deeply, to experience life. To create a way for people to let out their emotions, creating empathy at a global scale.",
    image: "/canva-extracts/product-brihadeeshwarar-hq.png",
    price_inr: 199,
    papers: ["deluxe-300gsm", "textured-200gsm"],
  },
  {
    slug: "still-pond",
    title: "Still Pond",
    category: "postcards",
    size: "A6",
    description:
      "A quiet morning by the water — for the friend who needs to be reminded to slow down.",
    image: "/canva-extracts/product-still-pond-hq.png",
    price_inr: 199,
    papers: ["deluxe-300gsm", "textured-200gsm"],
  },
  {
    slug: "spotlight-set",
    title: "Spotlight set of 3",
    category: "greeting-cards",
    size: "A6",
    description:
      "Three originals, hand-translated into greeting cards. Pick a favourite or send all three.",
    image: "/canva-extracts/product-spotlight-hq.png",
    price_inr: 499,
    papers: ["deluxe-300gsm", "textured-200gsm"],
  },
];

export const PAPER_LABELS: Record<Paper, string> = {
  "deluxe-300gsm": "Deluxe paper · 300gsm",
  "textured-200gsm": "Textured paper · 200gsm",
};
