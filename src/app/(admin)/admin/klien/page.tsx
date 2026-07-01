"use client"

import { useState } from "react"
import { useClients } from "@/features/client/hooks/use-clients"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Loader2, ChevronDown, ChevronUp, Users } from "lucide-react"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/features/submission/constants/submission.constant"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { SubmissionStatus } from "@prisma/client"

export default function AdminKlienPage() {
  const [search, setSearch] = useState("")
  const { data: clients, isLoading } = useClients(search || undefined)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { data: clientDetail } = useQuery({
    queryKey: ["client", expandedId],
    queryFn: async () => {
      const res = await fetch(`/api/clients/${expandedId}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      return json.data
    },
    enabled: !!expandedId,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Klien</h1>
        <p className="text-gray-500 mt-1">Database klien dan riwayat pengajuan.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari nama, nomor WA, atau nomor klien..."
          className="pl-10 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border-0 shadow-sm">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
          </CardContent>
        ) : !clients?.length ? (
          <CardContent className="text-center py-16">
            <Users className="mx-auto h-10 w-10 text-gray-300" />
            <p className="text-gray-400 mt-4">Belum ada klien.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Klien</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Instagram</TableHead>
                  <TableHead>Total Pengajuan</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c: { id: string; clientNumber: string; name: string; phone: string; instagram: string | null; _count: { submissions: number } }) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-xs">{c.clientNumber}</TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-sm">{c.phone}</TableCell>
                    <TableCell className="text-sm text-gray-500">{c.instagram ? `@${c.instagram}` : "-"}</TableCell>
                    <TableCell><Badge variant="secondary" className="rounded-full">{c._count.submissions}</Badge></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                        {expandedId === c.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {clientDetail && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold">Riwayat Pengajuan — {clientDetail.name}</h2>
            {!clientDetail.submissions?.length ? (
              <p className="text-sm text-gray-400">Belum ada pengajuan.</p>
            ) : (
              <div className="space-y-2">
                {clientDetail.submissions.map((s: { id: string; submissionNumber: string; eventName: string; eventDate: string; status: SubmissionStatus; package: { name: string } }) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-sm">
                    <div>
                      <p className="font-medium">{s.submissionNumber} — {s.eventName}</p>
                      <p className="text-xs text-gray-400">{s.package.name} • {format(new Date(s.eventDate), "dd MMM yyyy")}</p>
                    </div>
                    <Badge className={cn("rounded-full", SUBMISSION_STATUS_COLORS[s.status])}>
                      {SUBMISSION_STATUS_LABELS[s.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
