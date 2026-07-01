import type { Client, Submission } from "@prisma/client"

export type ClientListItem = Client & {
  _count: { submissions: number }
}

export type ClientDetail = Client & {
  submissions: (Submission & {
    package: { name: string; category: string }
    status: string
  })[]
}
