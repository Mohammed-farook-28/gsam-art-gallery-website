import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface TeaserItem {
  href: string;
  kicker: string;
  title: string;
  tagline: string;
  image: string;
  titleClassName?: string;
}

interface TeaserGridProps {
  items: TeaserItem[];
}

export function TeaserGrid({ items }: TeaserGridProps) {
  return (
    <ul className="grid gap-3 md:gap-5 grid-cols-3 w-full">
      {items.map((item, index) => {
        const isWide = index === 1 || index === 3;
        return (
          <li
            key={item.href}
            className={isWide ? "col-span-2" : "col-span-1"}
          >
            <Link href={item.href} className="group block">
              <div
                className={cn(
                  "relative overflow-hidden bg-rule/10",
                  isWide ? "aspect-[2/1]" : "aspect-square"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={isWide ? "(min-width: 768px) 60vw, 90vw" : "(min-width: 768px) 30vw, 45vw"}
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.22em] text-muted truncate">
                {item.kicker}
              </p>
              <p
                className={cn(
                  "mt-1 font-sans font-black text-xl leading-tight line-clamp-2",
                  item.titleClassName
                )}
              >
                {item.title}
              </p>
              <p className="mt-1 font-script text-base leading-tight text-ink/65 line-clamp-2">
                {item.tagline}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
