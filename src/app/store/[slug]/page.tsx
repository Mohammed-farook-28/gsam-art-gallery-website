import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SAMPLE_PRODUCTS } from "@/lib/products";
import { findProduct, listProducts } from "@/lib/products-server";
import { ProductPurchase } from "./product-purchase";

export function generateStaticParams() {
  // Static params come from the seed list at build time. Products added later
  // in Supabase still resolve dynamically through findProduct() at request time.
  return SAMPLE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) return { title: "Postcard — G.Sam Art Gallery" };
  return {
    title: `${product.title} — G.Sam Art Gallery`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) notFound();

  const all = await listProducts();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];
  const prev = all[(idx - 1 + all.length) % all.length];

  return (
    <>
      <div className="h-20" />

      <section className="mx-auto max-w-[1366px] px-4 md:px-10 py-10 md:py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.22em] text-muted">
          <Link href="/store" className="hover:text-ink">Store</Link>
          <span className="mx-2">·</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* PRODUCT IMAGE — cream paper panel with arrows */}
          <div className="relative bg-cream p-6 md:p-12 aspect-[4/5] flex items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-[3/4]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 540px, 90vw"
                priority
                className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.12)]"
              />
            </div>

            <Link
              href={`/store/${prev.slug}`}
              aria-label={`Previous: ${prev.title}`}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-ink/30 bg-paper/80 flex items-center justify-center hover:bg-paper"
            >
              ‹
            </Link>
            <Link
              href={`/store/${next.slug}`}
              aria-label={`Next: ${next.title}`}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-ink/30 bg-paper/80 flex items-center justify-center hover:bg-paper"
            >
              ›
            </Link>
          </div>

          {/* PRODUCT INFO + PURCHASE */}
          <div>
            <h1 className="font-script text-5xl md:text-6xl leading-tight text-ink">
              {product.title}
            </h1>
            <div className="mt-2 h-3 music-staff opacity-60" aria-hidden />
            <div className="mt-8 flex items-baseline gap-3">
              <p className="font-sans font-bold uppercase tracking-[0.18em] text-base">
                Postcard
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">{product.size} size</p>
            </div>
            <p className="mt-6 text-base md:text-[1.05rem] leading-relaxed text-ink/85 max-w-prose">
              {product.description}
            </p>
            <p className="mt-6 text-2xl font-semibold">₹{product.price_inr}</p>

            <div className="mt-10">
              <ProductPurchase product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
