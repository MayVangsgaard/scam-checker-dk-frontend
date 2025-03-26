import "./layout.css";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ UPDATED TAB TITLE AND META DESCRIPTION
export const metadata = {
  title: "Svindeltjek.dk | Tjek for scam",
  description: "Indsæt tekst fra en besked eller email og få hurtigt en vurdering af, om det måske er svindel – gratis og anonymt.",
  icons: {
    icon: "/favicon.svg", // ✅ dette refererer til public/favicon.svg
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">{/* ✅ Changed language to Danish */}<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body></html>
  );
}
