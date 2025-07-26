import { createRouteHandler } from "uploadthing/next"; // ✅ v7 correct path
import { uploadRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});