import "server-only";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { SAMPLE_PRODUCTS, type Paper, type Product } from "@/lib/products";

type ProductRow = {
  slug: string;
  title: string;
  category: Product["category"];
  size: string;
  description: string;
  image_url: string;
  price_inr: number;
  papers: Paper[];
};

function rowToProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    size: row.size,
    description: row.description,
    image: row.image_url,
    price_inr: row.price_inr,
    papers: row.papers,
  };
}

export async function listProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return SAMPLE_PRODUCTS;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug,title,category,size,description,image_url,price_inr,papers")
    .eq("active", true)
    .order("created_at", { ascending: true });
  if (error || !data || data.length === 0) return SAMPLE_PRODUCTS;
  return (data as ProductRow[]).map(rowToProduct);
}

export async function findProduct(slug: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug,title,category,size,description,image_url,price_inr,papers")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error || !data) {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  }
  return rowToProduct(data as ProductRow);
}
