import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    throw new Error("DATABASE_URL not set in Vercel Environment Variables")
  }

  const adapter = new PrismaPg({ connectionString: dbUrl })
  globalForPrisma.prisma = new PrismaClient({ adapter })
  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrisma()
    const value = Reflect.get(client as object, prop, client)
    if (typeof value === "function") {
      return value.bind(client)
    }
    return value
  },
})
