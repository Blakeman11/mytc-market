// src/app/admin/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4">
        <Link href="/admin/cards">
          <Button className="w-full justify-start">📇 Manage Cards</Button>
        </Link>
        <Link href="/admin/cards/new">
          <Button className="w-full justify-start">➕ Add New Card</Button>
        </Link>
        <Link href="/admin/flip-cards">
          <Button className="w-full justify-start">🔄 Manage Flip Cards</Button>
        </Link>
        {/* Optional cleanup utility */}
        <Link href="/admin/clean-uploads">
          <Button className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50">
            🧹 Clean Local Uploads
          </Button>
        </Link>
      </div>
    </main>
  );
}