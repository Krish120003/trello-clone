// src/client.ts
import { PrismaClient } from "@prisma/client";
var prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
if (process.env.NODE_ENV !== "production")
  global.prisma = prisma;
export {
  prisma
};
//# sourceMappingURL=index.mjs.map