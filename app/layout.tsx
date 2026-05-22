import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Casa di Mare — Location en Corse, Palombaggia",
  description:
    "Deux maisons de charme avec piscine privée et vue imprenable sur la plage de Palombaggia, dans le sud de la Corse.",
  openGraph: {
    title: "Casa di Mare — Palombaggia, Corse",
    description: "Location saisonnière privée avec piscine et vue mer à Palombaggia.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full antialiased">
        {/* Fond fixe persistant — visible derrière tout le contenu */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -2,
            backgroundImage: 'url(/images/exterieur/IMG_4290.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            background: 'rgba(18,14,10,0.42)',
          }}
        />
        {children}
      </body>
    </html>
  );
}
