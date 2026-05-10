import puppeteer from "puppeteer";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const OUT = resolve(process.cwd(), "/tmp/gsam-screens");
await mkdir(OUT, { recursive: true });
await mkdir(resolve(OUT, "thumbs"), { recursive: true });

const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/store", name: "store" },
  { path: "/store/brihadeeshwarar-temple", name: "product" },
  { path: "/travel", name: "travel" },
  { path: "/people", name: "people" },
  { path: "/career", name: "career" },
  { path: "/contact", name: "contact" },
  { path: "/letters", name: "letters" },
];

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });

for (const p of PAGES) {
  await page.goto(`http://localhost:3000${p.path}`, { waitUntil: "networkidle2", timeout: 30000 });
  // wait a tick for fonts/images
  await new Promise((r) => setTimeout(r, 800));
  const fullPath = resolve(OUT, `${p.name}.png`);
  await page.screenshot({ path: fullPath, fullPage: true });

  // also produce a max-1200-tall thumbnail strip for fast visual review
  const meta = await sharp(fullPath).metadata();
  const ratio = 800 / meta.width;
  const targetH = Math.round(meta.height * ratio);
  await sharp(fullPath)
    .resize({ width: 800, height: targetH, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT, "thumbs", `${p.name}.png`));
  console.log(`✓ ${p.path} (${meta.width}×${meta.height})`);
}

await browser.close();
console.log("Done.");
