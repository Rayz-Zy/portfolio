import type { Metadata } from "next";
import { Anybody, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Geist -> texte courant / UI (--font-sans)
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

// JetBrains Mono -> libellés "code" comme PORTFOLIO.INIT() (--font-mono)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Anybody -> gros titres italiques display (--font-display)
// Police variable : on garde normal + italic sans figer le poids.
const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Rayane Adjaoud — Front-End Developer",
  description: "Portfolio de Rayane Adjaoud, développeur front-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} ${jetbrainsMono.variable} ${anybody.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
