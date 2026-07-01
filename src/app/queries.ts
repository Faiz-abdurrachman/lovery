import { prisma } from "@/lib/prisma"

export async function fetchPackages() {
  return prisma.package.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  })
}
