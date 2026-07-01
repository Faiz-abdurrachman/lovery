import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const dbUrl = process.env.DATABASE_URL

const adapter = dbUrl ? new PrismaPg({ connectionString: dbUrl }) : undefined

function createPrismaClient(): PrismaClient {
  if (!adapter) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Check Vercel Environment Variables."
    )
  }
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
