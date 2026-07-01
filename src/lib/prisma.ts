import { PrismaClient } from "@prisma/client"
import type { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let _prisma: PrismaClient | undefined

function initPrisma(): PrismaClient {
  if (_prisma) return _prisma

  const { PrismaPg: Adapter } = require("@prisma/adapter-pg") as {
    PrismaPg: new (opts: { connectionString: string }) => PrismaPg
  }

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) throw new Error("DATABASE_URL not set in Vercel Environment Variables")

  const adapter = new Adapter({ connectionString: dbUrl })
  _prisma = new PrismaClient({ adapter })
  globalForPrisma.prisma = _prisma
  return _prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = globalForPrisma.prisma ?? initPrisma()
    const value = (client as Record<string | symbol, unknown>)[prop]
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client)
    }
    return value
  },
})
