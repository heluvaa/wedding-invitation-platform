import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const accent = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Undangkan Aja — Platform Undangan Digital",
  description: "Buat undangan pernikahan digital yang elegan dalam hitungan menit. Pilih tema, isi data, bagikan ke tamu via WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${accent.variable} ${body.variable} h-full antialiased light`}
      style={{ colorScheme: 'light' }}
    >
      <body className="font-body min-h-full flex flex-col bg-[#FDF9F3] text-stone-800">{children}</body>
    </html>
  );
}
