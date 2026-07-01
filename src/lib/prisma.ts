import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Please set it in your .env file or Vercel environment variables."
  )
}

const adapter = new PrismaPg({
  connectionString: dbUrl,
})

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
