import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-6 py-12 max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="MYTC Market Logo"
          width={200}
          height={200}
          priority
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">Welcome to MYTC Market</h1>
      <p className="text-gray-600 mb-8">
        Buy singles, flip cards, and connect with collectors — all in one spot.
        Good cards and good people.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <Link href="/shop">
          <Button className="w-full sm:w-auto">Shop Singles</Button>
        </Link>
        <Link href="/flip-my-card">
          <Button variant="outline" className="w-full sm:w-auto">
            Flip My Card
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="ghost" className="w-full sm:w-auto">
            Join the Chat
          </Button>
        </Link>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <div className="inline-flex items-center justify-center gap-2">
          <span>🇺🇸</span>
          <span>Disabled Veteran Owned Business</span>
        </div>
      </footer>
    </main>
  );
}