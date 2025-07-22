import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b shadow-sm bg-white">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="MYTC Market Logo" width={40} height={40} />
        <span className="text-xl font-bold">MYTC Market</span>
      </Link>

      <nav className="flex space-x-4">
        <Link href="/shop" className="hover:underline">Shop</Link>
        <Link href="/flip-my-card" className="hover:underline">Flip My Card</Link>
        <Link href="/chat" className="hover:underline">Chat</Link>
      </nav>
    </header>
  );
}