// Extract individual photo regions from the flattened Canva page exports.
// Coordinates are picked from the 2732x5578 page1, 2732xN page2-5 exports.
// Output to public/canva-extracts so they can be referenced from pages.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "public/canva-extracts");
await mkdir(OUT_DIR, { recursive: true });

const REF = (n) => resolve(process.cwd(), `assets/canva-reference/page${n}.png`);

/** Extract a region. coords are {top, left, width, height} in source pixels. */
async function crop(sourcePage, region, outName, opts = {}) {
  const out = resolve(OUT_DIR, outName);
  let pipeline = sharp(REF(sourcePage)).extract(region);
  if (opts.resize) pipeline = pipeline.resize(opts.resize);
  if (opts.format === "png") {
    await pipeline.png({ compressionLevel: 9 }).toFile(out);
  } else {
    await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  }
  console.log("→", outName);
}

// PAGE 1 (2732 × 5578)
//   Top hero (forest + G.Sam + ART GALLERY + nav): full-width, top 1280px
await crop(1, { top: 0, left: 0, width: 2732, height: 1280 }, "hero-forest.jpg");

//   "Why?" circle photo (mirrored tree on water): roughly centered top-right
//   in the intro section around y=1450..2050, x=2000..2600
await crop(1, { top: 1430, left: 1980, width: 640, height: 640 }, "why-circle.jpg");

//   Bottom ART GALLERY temple panel: from ~y=4500 to bottom
await crop(1, { top: 4500, left: 0, width: 2732, height: 1078 }, "temple-art-gallery.jpg");

// PAGE 2 (Store) — full export for reference; specific crops:
const page2 = sharp(REF(2));
const meta2 = await page2.metadata();
console.log("page2 dims:", meta2.width, meta2.height);

//   "Every art has a Story" stream/postcard wide image (top hero of Store):
//   Crop the top ~1100px which contains the wide stream photo + postcards.
await crop(2, { top: 240, left: 0, width: 2732, height: 1100 }, "store-stream-postcards.jpg");

//   Spotlight 3-postcard strip (~y 1450..2200)
await crop(2, { top: 1450, left: 0, width: 2732, height: 800 }, "spotlight-postcards.jpg");

//   People's Store row (Mr. Krishnamoorthy portrait + postcard letter)
await crop(2, { top: 2600, left: 0, width: 2732, height: 1100 }, "peoples-store.jpg");

//   "we post it for you" strip with postcard + sun
await crop(2, { top: 4100, left: 0, width: 2732, height: 1100 }, "we-post-it-for-you.jpg");

// PAGE 3 (People + Career) (2732 × ~4608)
const page3 = sharp(REF(3));
const meta3 = await page3.metadata();
console.log("page3 dims:", meta3.width, meta3.height);

//   "everyone is an artist" 3-image strip
await crop(3, { top: 380, left: 0, width: 2732, height: 1100 }, "everyone-is-an-artist.jpg");

//   "your story → postcards" with sketch postcard
await crop(3, { top: 1700, left: 0, width: 2732, height: 1100 }, "your-story-postcards.jpg");

//   Career mandala (blue circular pattern)
await crop(3, { top: 3300, left: 0, width: 2732, height: 1300 }, "career-mandala.jpg");

// PAGE 4 (Travel)
const page4 = sharp(REF(4));
const meta4 = await page4.metadata();
console.log("page4 dims:", meta4.width, meta4.height);

//   Travel + Art Experience hero (mountains)
await crop(4, { top: 0, left: 0, width: 2732, height: 1300 }, "travel-mountains-hero.jpg");

//   Thailand sunset + ไทยแลนด์ script
await crop(4, { top: 1500, left: 0, width: 2732, height: 1300 }, "thailand-sunset.jpg");

//   sawadee khap + temple
await crop(4, { top: 3200, left: 0, width: 2732, height: 1400 }, "sawadee-khap.jpg");

// PAGE 5 (Product detail) (2732 × ~3072)
const page5 = sharp(REF(5));
const meta5 = await page5.metadata();
console.log("page5 dims:", meta5.width, meta5.height);

//   Brihadeeshwarar postcard product image (the cream-paper card with temple+sun)
await crop(5, { top: 200, left: 200, width: 1000, height: 1400 }, "product-brihadeeshwarar.jpg");

console.log("Done.");
