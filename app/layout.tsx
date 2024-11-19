import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import NavBar from "./_components/NavBar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hunter Helper",
  description: "An assistant tool for Monster Hunter World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/f3426e52f3.js"
          crossOrigin="anonymous"
        />
        <body>
          <NavBar />
          <main
            id="overallContainer"
            className="antialiased justify-items-center justify-center px-48"
          >
            {children}
          </main>
        </body>
      </head>
    </html>
  );
}
