// Extract clean photo regions from the flattened Canva page exports.
// Goal: each crop excludes baked-in headlines so they don't visually
// duplicate the HTML text on the rendered site.
//
// EXCEPTION: certain hero images keep baked-in titles because the title is
// part of the hero billboard composition (e.g. "G.Sam ART GALLERY" forest
// hero, "Travel + Art Experience" mountains hero, "ไทยแลนด์" Thailand
// sunset). Those pages skip rendering duplicate HTML overlay text.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "public/canva-extracts");
await mkdir(OUT_DIR, { recursive: true });
const REF = (n) => resolve(process.cwd(), `assets/canva-reference/page${n}.png`);

async function crop(sourcePage, region, outName) {
  const out = resolve(OUT_DIR, outName);
  await sharp(REF(sourcePage))
    .extract(region)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log("→", outName);
}

// PAGE 1 — Home (2732 × 5578)
await crop(1, { top: 0, left: 0, width: 2732, height: 1280 }, "hero-forest.jpg");
await crop(1, { top: 1430, left: 2030, width: 540, height: 540 }, "why-circle.jpg");
await crop(1, { top: 4500, left: 0, width: 2732, height: 1078 }, "temple-art-gallery.jpg");

// PAGE 2 — Store (2732 × 6144)
//   Stream + 2 postcards (skips top "Store" + right-side "Every art has a Story")
await crop(2, { top: 410, left: 0, width: 1900, height: 990 }, "store-stream-postcards.jpg");
//   3-postcard Spotlight strip — pushed down past the headline
await crop(2, { top: 1980, left: 0, width: 2732, height: 600 }, "spotlight-postcards.jpg");
//   Mr. Krishnamoorthy portrait — tight crop just on his head/shoulders
await crop(2, { top: 3320, left: 360, width: 540, height: 540 }, "krishnamoorthy-portrait.jpg");
//   Sample postcard letter (envelope with "To" lines)
await crop(2, { top: 3380, left: 1100, width: 1100, height: 760 }, "postcard-letter-sample.jpg");
//   Postcard with yellow sun + Zenitsu letter sample. Crop just the back-of-postcard
//   view with stamp + letter text on left, the temple-with-sun postcard on right.
await crop(2, { top: 5000, left: 900, width: 1750, height: 800 }, "post-postcard-sun.jpg");

// PAGE 3 — People + Career (2732 × 4608)
//   Three-image artist strip — push past the subtitle line
await crop(3, { top: 460, left: 40, width: 2680, height: 780 }, "everyone-is-an-artist.jpg");
//   "your story" postcard mockup — skip airmail stripe at top, paragraph on left
await crop(3, { top: 2200, left: 1100, width: 1500, height: 580 }, "your-story-postcards.jpg");
//   Career mandala circle
await crop(3, { top: 3580, left: 950, width: 850, height: 850 }, "career-mandala.jpg");

// PAGE 4 — Travel (2732 × 4608)
//   Travel hero kept WITH baked-in "Travel + Art Experience" — design intent.
await crop(4, { top: 0, left: 0, width: 2732, height: 1280 }, "travel-mountains-hero.jpg");
//   Thailand sunset photo kept WITH baked-in "ไทยแลนด์" + "City Village Mountain" — design intent.
await crop(4, { top: 1500, left: 0, width: 2732, height: 1300 }, "thailand-sunset.jpg");
//   Sawadee + temple kept WITH baked-in Thai painted "sawadee khap" — design intent.
await crop(4, { top: 3300, left: 0, width: 2732, height: 1100 }, "sawadee-khap.jpg");

// PAGE 5 — Product detail (2732 × 3072)
await crop(5, { top: 200, left: 200, width: 1000, height: 1400 }, "product-brihadeeshwarar.jpg");

console.log("Done.");
