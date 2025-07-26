import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCardForm from "@/components/EditCardForm";

export default async function EditCardPage({
  params,
}: {
  params: { id: string };
}) {
  const card = await prisma.yourCard.findUnique({ where: { id: params.id } });

  if (!card) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Card</h1>
      <EditCardForm card={card} />
    </main>
  );
}