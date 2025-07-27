// middleware.ts
import { authMiddleware } from "@clerk/nextjs/server"; // ✅ CORRECT subpath import

export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};