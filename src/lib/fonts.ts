import { Fraunces, Noto_Sans_Thai } from "next/font/google";
import localFont from "next/font/local";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-thai",
  display: "swap",
});

export const themysion = localFont({
  src: "../../font_name/themysion/Themysion-2OjKo.ttf",
  variable: "--font-script-hero",
  display: "swap",
});

export const marelle = localFont({
  src: "../../font_name/marielle-font/MarelleLIGNES2-Regular.otf",
  variable: "--font-script",
  display: "swap",
});

export const awSiamEnglish = localFont({
  src: "../../font_name/aw-siam-english-not-thai/AW_Siam.ttf",
  variable: "--font-thai-display",
  display: "swap",
});

export const futura = localFont({
  src: [
    { path: "../../font_name/futura-pt/FuturaCyrillicBook.ttf", weight: "400", style: "normal" },
    { path: "../../font_name/futura-pt/FuturaCyrillicMedium.ttf", weight: "500", style: "normal" },
    { path: "../../font_name/futura-pt/FuturaCyrillicDemi.ttf", weight: "600", style: "normal" },
    { path: "../../font_name/futura-pt/FuturaCyrillicBold.ttf", weight: "700", style: "normal" },
    { path: "../../font_name/futura-pt/FuturaCyrillicHeavy.ttf", weight: "800", style: "normal" },
    { path: "../../font_name/futura-pt/FuturaCyrillicExtraBold.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-futura",
  display: "swap",
});

export const fontVariables = [
  themysion.variable,
  marelle.variable,
  awSiamEnglish.variable,
  futura.variable,
  fraunces.variable,
  notoSansThai.variable,
].join(" ");
