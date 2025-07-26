"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between border-b shadow-sm bg-white relative z-50">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="MYTC Market Logo" width={40} height={40} />
        <span className="text-lg font-bold">MYTC Market</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium">
        <Link href="/shop" className="hover:underline">Shop</Link>
        <Link href="/flip-my-card" className="hover:underline">Flip My Card</Link>
        <Link href="/chat" className="hover:underline">Chat</Link>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md flex flex-col text-sm py-2 px-4 space-y-2 md:hidden">
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/flip-my-card" onClick={() => setMenuOpen(false)}>Flip My Card</Link>
          <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
        </div>
      )}
    </header>
  );
}