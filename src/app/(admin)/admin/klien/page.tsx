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
        <h1 className="text-4xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">Klien</h1>
        <p className="text-black font-bold font-accent mt-2">Database klien dan riwayat pengajuan.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
        <Input
          placeholder="Cari nama, nomor WA, atau nomor klien..."
          className="pl-10 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
          </CardContent>
        ) : !clients?.length ? (
          <CardContent className="text-center py-16">
            <Users className="mx-auto h-10 w-10 text-gray-300" />
            <p className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#111111] inline-block mt-4">Belum ada klien.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-black text-white font-heading font-black">
                <TableRow className="border-b-2 border-black">
                  <TableHead className="text-white">No. Klien</TableHead>
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">WhatsApp</TableHead>
                  <TableHead className="text-white">Instagram</TableHead>
                  <TableHead className="text-white">Total Pengajuan</TableHead>
                  <TableHead className="w-10 text-white"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c: { id: string; clientNumber: string; name: string; phone: string; instagram: string | null; _count: { submissions: number } }) => (
                  <TableRow key={c.id} className="border-b-2 border-black hover:bg-gray-100 transition-colors">
                    <TableCell>
                      <span className="font-accent font-bold bg-black text-white px-2 py-1 text-xs shadow-[2px_2px_0_0_#E89CC9]">
                        {c.clientNumber}
                      </span>
                    </TableCell>
                    <TableCell className="font-heading font-black text-lg text-black uppercase">{c.name}</TableCell>
                    <TableCell>
                      <span className="font-accent font-bold text-black border-2 border-black px-2 py-1 text-xs shadow-[2px_2px_0_0_#111111]">
                        {c.phone}
                      </span>
                    </TableCell>
                    <TableCell>
                      {c.instagram ? (
                        <span className="font-accent font-bold text-lovery-pink bg-black px-2 py-1 text-xs uppercase shadow-[2px_2px_0_0_#111111]">
                          @{c.instagram}
                        </span>
                      ) : "-"}
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest">{c._count.submissions}</Badge></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)} className="rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]">
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
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white mt-8">
          <CardContent className="p-6 space-y-6">
            <h2 className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block">Riwayat Pengajuan — {clientDetail.name}</h2>
            {!clientDetail.submissions?.length ? (
              <p className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#111111] inline-block">Belum ada pengajuan.</p>
            ) : (
              <div className="space-y-2">
                {clientDetail.submissions.map((s: { id: string; submissionNumber: string; eventName: string; eventDate: string; status: SubmissionStatus; package: { name: string } }) => (
                  <div key={s.id} className="flex items-center justify-between border-4 border-black shadow-[4px_4px_0_0_#111111] bg-white rounded-none p-4 mb-4 transition-all hover:-translate-y-1">
                    <div>
                      <p className="font-heading font-black text-xl uppercase">{s.submissionNumber} — {s.eventName}</p>
                      <p className="font-accent font-bold text-xs bg-black text-white px-2 py-1 uppercase inline-block mt-2">{s.package.name} • {format(new Date(s.eventDate), "dd MMM yyyy")}</p>
                    </div>
                    <Badge className={cn("rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest", SUBMISSION_STATUS_COLORS[s.status])}>
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
