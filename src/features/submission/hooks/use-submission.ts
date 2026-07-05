"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type {
  SubmissionListItem,
  SubmissionDetail,
  CreateSubmissionInput,
  SubmissionFilters,
} from "@/features/submission/types/submission.type"
import type { SubmissionStatus } from "@prisma/client"

async function fetchSubmissions(filters?: SubmissionFilters) {
  const params = new URLSearchParams()
  if (filters?.status) params.set("status", filters.status)
  if (filters?.search) params.set("search", filters.search)
  if (filters?.page) params.set("page", String(filters.page))
  if (filters?.limit) params.set("limit", String(filters.limit))

  const res = await fetch(`/api/submissions/list?${params}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.message)
  return json.data as { items: SubmissionListItem[]; total: number }
}

export function useSubmissions(filters?: SubmissionFilters) {
  return useQuery({
    queryKey: ["submissions", filters],
    queryFn: () => fetchSubmissions(filters),
  })
}

export function useSubmission(id: string) {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const res = await fetch(`/api/submissions/${id}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      return json.data as SubmissionDetail
    },
    enabled: !!id,
  })
}

export function useCreateSubmission() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSubmissionInput) => {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!json.success) {
        const err = new Error(json.message) as Error & { fields?: Record<string, string[]> }
        if (json.errors) err.fields = json.errors
        throw err
      }
      return json.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
    },
  })
}

export function useUpdateStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      status,
      adminNote,
    }: {
      id: string
      status: SubmissionStatus
      adminNote?: string
    }) => {
      const res = await fetch(`/api/submissions/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      return json.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      queryClient.invalidateQueries({ queryKey: ["submission"] })
    },
  })
}

export function useTrackSubmission(number: string) {
  return useQuery({
    queryKey: ["track", number],
    queryFn: async () => {
      const params = new URLSearchParams({ number })
      const res = await fetch(`/api/submissions/track?${params}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      return json.data
    },
    enabled: !!number,
    retry: false,
  })
}
