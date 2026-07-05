"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSubmissions } from "@/features/submission/hooks/use-submission"
import {
  SUBMISSION_STATUS_LABELS,
  SUBMISSION_STATUS_COLORS,
} from "@/features/submission/constants/submission.constant"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Loader2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { SubmissionStatus } from "@prisma/client"

const STATUS_OPTIONS = Object.entries(SUBMISSION_STATUS_LABELS)

export default function AdminPengajuanPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useSubmissions({
    status: (statusFilter && statusFilter !== "ALL" ? statusFilter : undefined) as SubmissionStatus | undefined,
    search: searchQuery || undefined,
  })

  return (
    <div className="space-y-10">
      <div className="border-b-4 border-black pb-4 inline-block">
        <h1 className="text-3xl lg:text-5xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">
          DAFTAR SESI
        </h1>
        <p className="text-gray-600 mt-2 font-accent font-bold tracking-widest uppercase">
          /// REVIEW DAN KELOLA SELURUH SESI FOTOGRAFI DARI KLIEN ///
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black group-focus-within:text-lovery-pink transition-colors" />
          <Input
            placeholder="CARI NAMA, NOMOR PENGAJUAN, ATAU WA..."
            className="pl-12 rounded-none border-4 border-black shadow-[4px_4px_0_0_#111111] focus:shadow-[6px_6px_0_0_#E89CC9] focus:border-black font-accent font-bold uppercase tracking-widest h-14 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || "")}>
          <SelectTrigger className="w-full sm:w-64 rounded-none border-4 border-black shadow-[4px_4px_0_0_#111111] font-accent font-bold uppercase tracking-widest h-14 bg-white">
            <SelectValue placeholder="SEMUA STATUS" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-4 border-black shadow-[6px_6px_0_0_#111111] bg-white">
            <SelectItem value="ALL" className="font-accent font-bold uppercase cursor-pointer hover:bg-lovery-pink focus:bg-lovery-pink py-3">SEMUA STATUS</SelectItem>
            {STATUS_OPTIONS.map(([value, label]) => (
              <SelectItem key={value} value={value} className="font-accent font-bold uppercase cursor-pointer hover:bg-lovery-pink focus:bg-lovery-pink py-3">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white overflow-hidden">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <div className="bg-black p-4 border-2 border-black shadow-[4px_4px_0_0_#E89CC9]">
              <Loader2 className="h-10 w-10 animate-spin text-lovery-pink" />
            </div>
          </CardContent>
        ) : !data?.items?.length ? (
          <CardContent className="text-center py-16">
            <p className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink px-4 py-2 border-2 border-black inline-block shadow-[4px_4px_0_0_#111111]">BELUM ADA PENGAJUAN.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-black">
                <TableRow className="border-b-4 border-black hover:bg-black">
                  <TableHead className="font-heading font-black text-white text-base">NO. PENGAJUAN</TableHead>
                  <TableHead className="font-heading font-black text-white text-base">KLIEN</TableHead>
                  <TableHead className="font-heading font-black text-white text-base">PAKET</TableHead>
                  <TableHead className="font-heading font-black text-white text-base">TANGGAL</TableHead>
                  <TableHead className="font-heading font-black text-white text-base">STATUS</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map(
                  (item) => (
                    <TableRow key={item.id} className="border-b-2 border-black hover:bg-lovery-pink/10 transition-colors">
                      <TableCell className="font-accent font-bold text-base tracking-widest">
                        {item.submissionNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-heading font-black text-black text-lg uppercase">
                            {item.client.name}
                          </p>
                          <p className="font-accent font-bold text-xs bg-black text-white px-2 py-0.5 inline-block mt-1 tracking-widest">
                            {item.client.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-accent font-bold text-black uppercase border border-black px-2 py-1 bg-white shadow-[2px_2px_0_0_#111111]">{item.package.name}</span>
                      </TableCell>
                      <TableCell className="font-accent font-bold uppercase text-black">
                        {format(new Date(item.eventDate), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest",
                            SUBMISSION_STATUS_COLORS[item.status]
                          )}
                        >
                          {SUBMISSION_STATUS_LABELS[item.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-none border-2 border-black bg-white text-black hover:bg-lovery-pink hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all"
                          onClick={() =>
                            router.push(`/admin/pengajuan/${item.id}`)
                          }
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  )
}
