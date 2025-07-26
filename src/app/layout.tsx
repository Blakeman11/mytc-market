// app/layout.tsx
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // adjust path if needed
import Header from "@/components/ui/header";
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
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}