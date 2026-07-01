import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrisma(customUrl?: string): PrismaClient {
  const url = customUrl || process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL not set")
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: url }),
  })
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    if (globalForPrisma.prisma) {
      return (globalForPrisma.prisma as unknown as Record<string, unknown>)[prop as string]
    }
    globalForPrisma.prisma = createPrisma()
    return (globalForPrisma.prisma as unknown as Record<string, unknown>)[prop as string]
  },
})
