// src/app/admin/cards/bulk-upload/page.tsx
"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";
import Papa from "papaparse";

type CardCSV = {
  title: string;
  playerName: string;
  brand: string;
  year: string;
  cardNumber: string;
  category: string;
  condition: string;
  grade: string;
  price: string;
  imageKey: string;
};

type UploadedFile = {
  name: string;
  url: string;
};

export default function BulkUploadPage() {
  const [csvData, setCsvData] = useState<CardCSV[]>([]);
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCSV = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<CardCSV>(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const handleSubmit = async () => {
    setUploading(true);
    setMessage("");

    const cards = csvData.map((row) => ({
      ...row,
      year: Number(row.year),
      price: Number(row.price),
      imageUrl: imageMap[row.imageKey] || "",
    }));

    const res = await fetch("/api/admin/cards/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards }),
    });

    if (res.ok) {
      setMessage("✅ Cards uploaded successfully!");
      setCsvData([]);
      setImageMap({});
    } else {
      setMessage("❌ Upload failed.");
    }

    setUploading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📤 Bulk Upload Cards</h1>

      <div>
        <Label>Select CSV File</Label>
        <Input type="file" accept=".csv" onChange={handleCSV} />
      </div>

      <div>
        <Label>Upload Images</Label>
        <UploadDropzone
          endpoint="imageUploader" 
          onClientUploadComplete={(res: UploadedFile[]) => {
            const newMap = { ...imageMap };
            res.forEach((file) => {
              const fileName = file.name.split(".")[0];
              newMap[fileName] = file.url;
            });
            setImageMap(newMap);
          }}
          onUploadError={(err: { message: string }) =>
            alert("Upload error: " + err.message)
          }
        />
      </div>

      {csvData.length > 0 && (
        <Button disabled={uploading} onClick={handleSubmit}>
          {uploading ? "Uploading..." : "Submit All"}
        </Button>
      )}

      {message && <p>{message}</p>}
    </main>
  );
}