import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// eslint-disable-next-line
function getClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL not set")
  return new PrismaClient({ datasourceUrl: url } as any)
}

let _prisma: PrismaClient

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    if (!_prisma) _prisma = getClient()
    return (_prisma as any)[prop]
  },
})
