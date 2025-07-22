import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MYTC Market",
  description: "Buy singles, flip cards, and connect with collectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">MYTC Market</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/shop" className="text-gray-700 hover:text-black">Shop</Link>
            <Link href="/flip-my-card" className="text-gray-700 hover:text-black">Flip My Card</Link>
            <Link href="/chat" className="text-gray-700 hover:text-black">Chat</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}