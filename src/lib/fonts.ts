import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";

export const fontDisplay = Unbounded({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
export const fontBody = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
export const fontMono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });
