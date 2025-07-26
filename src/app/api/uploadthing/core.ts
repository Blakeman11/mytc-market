import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;