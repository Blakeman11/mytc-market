import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MYTC Market",
  description: "Buy and flip cards with collectors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}