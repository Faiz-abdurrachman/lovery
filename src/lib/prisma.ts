import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const dbUrl = process.env.DATABASE_URL

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set")
  }

  // Dynamic require to avoid Vercel build-time initialization
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaPg } = require("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg")

  const adapter = new PrismaPg({ connectionString: dbUrl! })
  globalForPrisma.prisma = new PrismaClient({ adapter })
  return globalForPrisma.prisma
}

// Legacy export for existing code using `prisma.xxx`
// Creates a Proxy that lazily calls getPrisma()
export const prisma = new Proxy({} as PrismaClient, {
  get(_: unknown, prop: string | symbol) {
    if (typeof prop === "symbol") return undefined
    const client = getPrisma()
    const value = (client as unknown as Record<string, unknown>)[prop]
    if (typeof value === "function") {
      return (...args: unknown[]) => (value as CallableFunction).apply(client, args)
    }
    return value
  },
})
