"use client"

import { useQuery } from "@tanstack/react-query"

export function useClients(search?: string) {
  return useQuery({
    queryKey: ["clients", search],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      const res = await fetch(`/api/clients?${params}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      return json.data
    },
  })
}
