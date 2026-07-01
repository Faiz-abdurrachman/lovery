import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let _prisma: PrismaClient

function getPrismaClient(): PrismaClient {
  if (!_prisma) {
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      throw new Error(
        "DATABASE_URL environment variable is not set. Please set it in your .env file or Vercel environment variables."
      )
    }

    const adapter = new PrismaPg({ connectionString: dbUrl })
    _prisma = new PrismaClient({ adapter })
  }
  return _prisma
}

type PrismaClientLike = {
  [K in keyof PrismaClient]: PrismaClient[K]
}

export const prisma = new Proxy({} as PrismaClientLike, {
  get(_target, prop: string) {
    if (globalForPrisma.prisma) return (globalForPrisma.prisma as Record<string, unknown>)[prop]
    const client = getPrismaClient()
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client
    return (client as Record<string, unknown>)[prop]
  },
}) as unknown as PrismaClient
