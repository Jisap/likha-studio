import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmothScroll";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LIKHA — Digital Studio",
  description:
    "We design and build websites, mobile apps, systems, and video content. From the Philippines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="antialiased">

        <Loader />
        <Cursor />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>

      </body>
    </html>
  );
}
