import Image from "next/image";
import Link from "next/link";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { listProducts } from "@/lib/products-server";
import { VideoBg } from "@/components/video-bg";

export const metadata = {
  title: "Store — G.Sam Art Gallery",
  description:
    "Postcards and greeting cards. Originals translated into paper. Every art has a story.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function StorePage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const filter = category === "greeting-cards" ? "greeting-cards" : category === "postcards" ? "postcards" : null;
  const allProducts = await listProducts();
  const products = filter ? allProducts.filter((p) => p.category === filter) : allProducts;

  return (
    <>
      <div className="h-20" />

      {/* HERO — full-width video, postcards 70% inside / 30% outside bottom */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 pt-6 md:pt-10">

        {/* Top row: music-staff left | Store right */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="max-w-sm flex flex-col items-start -space-y-2">
            <MusicStaffScript size="sm" className="text-ink/80">
              Experience the joy of writing a letter
            </MusicStaffScript>
            <MusicStaffScript size="sm" className="text-ink/80">
              for your loved one,
            </MusicStaffScript>
          </div>
          <DisplaySans as="h1" className="text-[clamp(2.5rem,8vw,6.5rem)] leading-none">
            Store
          </DisplaySans>
        </div>

        {/* Full-width video — outer wrapper is NOT overflow-hidden so postcards can escape */}
        <div className="relative mt-4" style={{ paddingBottom: "clamp(55px,9vw,110px)" }}>

          {/* Video strip — inner div clips the video */}
          <div className="relative w-full bg-ink" style={{ aspectRatio: "22/7" }}>
            <div className="absolute inset-0 overflow-hidden">
              <VideoBg
                src="/videos/store-stream.mp4"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* "Every art has a Story." — white text, right side of video */}
            <div className="absolute right-8 md:right-14 inset-y-0 flex flex-col justify-center text-right z-10">
              <p
                className="font-sans font-black text-paper leading-[1.05]"
                style={{ fontSize: "clamp(1.2rem,2.6vw,2.6rem)" }}
              >
                Every<br />art has<br />a<br />Story.
              </p>
            </div>
          </div>

          {/* Postcards: anchored at video bottom, translateY(30%) pushes 30% below */}
          <div
            className="absolute bottom-0 left-6 md:left-10 flex items-start gap-1 z-20"
            style={{ transform: "translateY(0%)" }}
          >
            {/* Postcard 1 — leaning left ~25° */}
            <div
              style={{
                position: "relative",
                width:  "clamp(105px,14vw,195px)",
                height: "clamp(140px,18vw,255px)",
                transform: "rotate(-25deg)",
                transformOrigin: "bottom center",
                filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.65))",
              }}
            >
              <Image
                src="/canva-extracts/store-postcard-1.png"
                alt="Gsam postcard art"
                fill
                sizes="195px"
                className="object-contain"
                priority
              />
            </div>

            {/* Postcard 2 — leaning right ~20°, overlapping slightly */}
            <div
              style={{
                position: "relative",
                width:  "clamp(105px,14vw,195px)",
                height: "clamp(120px,16vw,225px)",
                transform: "rotate(20deg)",
                transformOrigin: "bottom center",
                filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.65))",
                marginLeft: "clamp(-24px,-2vw,-10px)",
              }}
            >
              <Image
                src="/canva-extracts/store-postcard-2.png"
                alt="Gsam postcard back"
                fill
                sizes="195px"
                className="object-contain"
              />
            </div>
          </div>

        </div>

        <p className="mt-2 text-sm text-muted">
          <Link href="#collection" className="underline underline-offset-4">View Gsam collection</Link>
        </p>
      </section>

      {/* CATEGORY TABS */}
      <nav id="collection" className="mx-auto max-w-[1366px] px-6 md:px-10 mt-16 md:mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-rule pb-4 uppercase tracking-[0.18em] text-xs">
        <CategoryTab href="/store" active={!filter}>All</CategoryTab>
        <CategoryTab href="/store?category=postcards" active={filter === "postcards"}>Postcards</CategoryTab>
        <CategoryTab href="/store?category=greeting-cards" active={filter === "greeting-cards"}>Greeting cards</CategoryTab>
        <Link href="/people" scroll={false} className="ml-auto opacity-70 hover:opacity-100">People&apos;s store →</Link>
      </nav>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-12 md:py-16">
        <ul className="grid gap-10 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/store/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-paper border border-rule/40">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.03] p-3"
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
        <div className="mt-10 relative w-full">
          <Image
            src="/canva-extracts/Screenshot 2026-05-19 123944.png"
            alt="Three postcard designs in a row"
            width={0}
            height={0}
            sizes="(min-width: 1024px) 1366px, 100vw"
            className="w-full h-auto"
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
            src="/canva-extracts/Screenshot 2026-05-19 125014.png"
            alt="Mr. Krishnamoorthy"
            fill
            sizes="(min-width: 768px) 36vw, 80vw"
            className="object-contain"
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
            src="/canva-extracts/postcard-set-01.jpg"
            alt="Postcard set design"
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
      scroll={false}
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
