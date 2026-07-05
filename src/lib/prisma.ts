// @deprecated — Tidak dipakai runtime. Semua query pake Supabase SDK (lib/supabase-server.ts)
// Prisma cuma dipake buat generate types (prisma generate) dan schema reference.
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
