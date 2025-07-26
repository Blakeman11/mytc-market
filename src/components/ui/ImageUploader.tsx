"use client";

import { useCallback } from "react";
import { UploadDropzone } from "@/utils/uploadthing";

type UploadResponse = {
  url: string;
  name: string;
}[];

type Props = {
  onUploadComplete: (url: string) => void;
};

export default function ImageUploader({ onUploadComplete }: Props) {
  const handleUpload = useCallback(
    (res: UploadResponse) => {
      if (res && res.length > 0) {
        onUploadComplete(res[0].url);
      }
    },
    [onUploadComplete]
  );

  return (
    <div className="border p-4 rounded-md">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={handleUpload}
        onUploadError={(error: { message: string }) =>
          alert(`Upload failed: ${error.message}`)
        }
      />
    </div>
  );
}