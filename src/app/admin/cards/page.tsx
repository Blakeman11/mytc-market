// src/app/admin/cards/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function AdminCardsPage() {
  const cards = await prisma.yourCard.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Your Cards</h1>
        <div className="flex gap-3">
          <Link href="/admin/cards/new">
            <Button>➕ Add Card</Button>
          </Link>
          <Link href="/admin/cards/bulk-upload">
            <Button variant="outline">📤 Bulk Upload</Button>
          </Link>
        </div>
      </div>

      {cards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <ul className="space-y-4">
          {cards.map((card) => (
            <li key={card.id} className="border rounded p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {card.imageUrl && (
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    width={60}
                    height={80}
                    className="rounded border object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold">{card.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {card.playerName} — {card.year}
                  </div>
                  <div className="text-sm font-medium">${card.price.toFixed(2)}</div>
                </div>
              </div>
              <Link href={`/admin/cards/${card.id}/edit`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}