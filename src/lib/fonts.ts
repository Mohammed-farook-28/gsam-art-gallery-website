import { Inter, Fraunces, Allura, Pinyon_Script, Charm, Noto_Sans_Thai } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-hero",
  display: "swap",
});

export const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const charm = Charm({
  subsets: ["latin", "thai"],
  weight: ["400", "700"],
  variable: "--font-thai-display",
  display: "swap",
});

export const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-thai",
  display: "swap",
});

export const fontVariables = [
  inter.variable,
  fraunces.variable,
  allura.variable,
  pinyon.variable,
  charm.variable,
  notoSansThai.variable,
].join(" ");
