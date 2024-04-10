import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./NavBar/Navbar";
import SessionProvider from "./SessionProvider";
import Footer from "./footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce WebApp generated to make your wallet sing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="p-4 max-w-7xl m-auto min-w-[20rem]">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
