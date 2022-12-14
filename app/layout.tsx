export const revalidate = 3600;

import "./globals.css";
import { Inter } from "@next/font/google";
import { Navbar } from "./Components/Navbar";
import { Providers } from "./providers";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Suspense } from "react";
import { Footer } from "./Components/Footer";
import { Container } from "./Components/Container";

config.autoAddCss = false;

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-100 dark:bg-gray-800">
        <Providers>
          <Navbar />
          <Container>{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
