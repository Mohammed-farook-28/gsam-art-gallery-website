// Walks the cart → checkout flow and screenshots each step.
import puppeteer from "puppeteer";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const OUT = "/tmp/gsam-screens";
await mkdir(resolve(OUT, "thumbs"), { recursive: true });

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });

async function shoot(name) {
  const fp = resolve(OUT, `${name}.png`);
  await page.screenshot({ path: fp, fullPage: true });
  const meta = await sharp(fp).metadata();
  await sharp(fp)
    .resize({ width: 800, height: Math.round(meta.height * (800 / meta.width)), fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT, "thumbs", `${name}.png`));
  console.log(`✓ ${name}  (${meta.width}×${meta.height})`);
}

// 1. Empty cart page
await page.goto("http://localhost:3000/cart", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 600));
await shoot("cart-empty");

// 2. Visit a product, add to cart
await page.goto("http://localhost:3000/store/brihadeeshwarar-temple", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 600));
// Click Add to cart
const buttons = await page.$$("button");
for (const b of buttons) {
  const t = await page.evaluate((el) => el.textContent?.trim().toLowerCase(), b);
  if (t === "add to cart") {
    await b.click();
    break;
  }
}
await new Promise((r) => setTimeout(r, 400));
await shoot("product-added");

// 3. Visit cart with 1 item
await page.goto("http://localhost:3000/cart", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));
await shoot("cart-with-item");

// 4. Visit checkout
await page.goto("http://localhost:3000/checkout", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));
await shoot("checkout");

await browser.close();
console.log("Done.");
