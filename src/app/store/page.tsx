import Image from "next/image";
import Link from "next/link";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { SAMPLE_PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Store — G.Sam Art Gallery",
  description:
    "Postcards and greeting cards. Originals translated into paper. Every art has a story.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function StorePage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const filter = category === "greeting-cards" ? "greeting-cards" : category === "postcards" ? "postcards" : null;
  const products = filter ? SAMPLE_PRODUCTS.filter((p) => p.category === filter) : SAMPLE_PRODUCTS;

  return (
    <>
      <div className="h-20" />

      {/* HERO row — script kicker + Store mega-headline + stream wide image */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 pt-12 md:pt-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <p className="font-script text-2xl md:text-3xl text-ink/80 max-w-md">
            Experience the joy of writing a letter for your loved one,
          </p>
          <DisplaySans as="h1" className="text-[clamp(4rem,16vw,14rem)]">
            Store
          </DisplaySans>
        </div>

        <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden bg-ink">
          <Image
            src="/canva-extracts/store-stream-postcards.jpg"
            alt="A stream and two postcards"
            fill
            sizes="(min-width: 1024px) 1366px, 100vw"
            priority
            className="object-cover"
          />
          <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 text-paper text-right">
            <p className="font-script text-3xl md:text-5xl">Every art has</p>
            <p className="font-script text-4xl md:text-6xl">a Story.</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted underline-offset-4">
          <Link href="#collection" className="underline">View Gsam collection</Link>
        </p>
      </section>

      {/* CATEGORY TABS */}
      <nav id="collection" className="mx-auto max-w-[1366px] px-6 md:px-10 mt-16 md:mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-rule pb-4 uppercase tracking-[0.18em] text-xs">
        <CategoryTab href="/store" active={!filter}>All</CategoryTab>
        <CategoryTab href="/store?category=postcards" active={filter === "postcards"}>Postcards</CategoryTab>
        <CategoryTab href="/store?category=greeting-cards" active={filter === "greeting-cards"}>Greeting cards</CategoryTab>
        <Link href="/people" className="ml-auto opacity-70 hover:opacity-100">People&apos;s store →</Link>
      </nav>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-12 md:py-16">
        <ul className="grid gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/store/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 font-script text-2xl md:text-3xl text-ink/85 leading-tight">{p.title}</p>
                <p className="mt-1 font-sans font-semibold text-sm">
                  Postcard · {p.size} · ₹{p.price_inr}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* SPOTLIGHT */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-16 md:py-24">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <DisplaySans as="h2" className="text-[clamp(3rem,10vw,8rem)]">Spotlight</DisplaySans>
          <span className="pb-4">
            <MusicStaffScript size="md">Experience the joy of writing a letter for your loved one,</MusicStaffScript>
          </span>
        </div>
        <div className="mt-10 relative aspect-[16/6] w-full">
          <Image
            src="/canva-extracts/spotlight-postcards.jpg"
            alt="Three postcard designs in a row"
            fill
            sizes="(min-width: 1024px) 1366px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/85">
          Writing a letter, posting it and waiting for the person to receive it. The joy of the
          person receiving the letter is the value we are adding to the modern world. At Gsam
          art gallery, <strong className="font-semibold">every art has a story.</strong>
        </p>
      </section>

      <AirmailStripe />

      {/* PEOPLE'S STORE TEASER */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 grid gap-12 md:grid-cols-[1fr_1.4fr] items-center">
        <div className="relative aspect-[3/4] w-full max-w-md">
          <Image
            src="/canva-extracts/peoples-store.jpg"
            alt="Mr. Krishnamoorthy"
            fill
            sizes="(min-width: 768px) 36vw, 80vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-script text-2xl md:text-3xl text-ink/80">People&apos;s</p>
          <DisplaySans as="h2" className="text-[clamp(3rem,10vw,8rem)] -mt-1">Store</DisplaySans>
          <p className="mt-6 max-w-prose text-base md:text-lg leading-relaxed text-ink/85">
            We share <strong className="font-semibold">their stories to you.</strong> We share{" "}
            <strong className="font-semibold">Our profits with them.</strong>
          </p>
          <Link
            href="/people"
            className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border-b border-ink pb-1 hover:opacity-70"
          >
            View people&apos;s collection →
          </Link>
        </div>
      </section>

      <AirmailStripe />

      {/* SEND A LETTER CTA */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 grid gap-12 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <p className="font-script text-2xl md:text-3xl text-ink/80">
            send us your message, we will write and
          </p>
          <DisplaySans as="h2" className="text-[clamp(3rem,11vw,9rem)] -mt-1">we post it for you.</DisplaySans>
          <Link
            href="/letters"
            className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border-b border-ink pb-1 hover:opacity-70"
          >
            Send now →
          </Link>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
          <Image
            src="/canva-extracts/we-post-it-for-you.jpg"
            alt="A postcard with a temple sketch"
            fill
            sizes="(min-width: 768px) 30vw, 80vw"
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

function CategoryTab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "py-2 border-b-2 border-ink -mb-[17px]"
          : "py-2 opacity-60 hover:opacity-100"
      }
    >
      {children}
    </Link>
  );
}
