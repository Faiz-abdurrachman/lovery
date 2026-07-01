import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL

  if (!dbUrl) {
    throw new Error("DATABASE_URL not set")
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaPg } = require("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg")

  console.log("[Prisma] Connecting to database...")

  const adapter = new PrismaPg({ connectionString: dbUrl })

  return new PrismaClient({
    adapter,
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
      { level: "info", emit: "stdout" },
    ],
  })
}

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const client = createPrismaClient()
  globalForPrisma.prisma = client
  return client
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getPrisma()
    if (typeof prop === "symbol") return undefined
    return (client as unknown as Record<string, unknown>)[prop]
  },
})
