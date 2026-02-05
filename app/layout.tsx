import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: 'swap'
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Business Growth Audit | Biznesingiz qayerda pul yo'qotayotganini biling",
  description: "2 daqiqalik professional auditdan o'ting va biznesingizdagi 'teshik'larni toping. Biz sizga 1x-2x o'sish rejasini taqdim etamiz.",
  keywords: ["biznes audit", "marketing", "sales", "growth", "o'sish", "reklama"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen">
        <main className="max-w-5xl mx-auto px-4 py-6 md:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
