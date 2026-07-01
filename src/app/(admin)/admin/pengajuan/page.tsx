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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Pengajuan</h1>
        <p className="text-gray-500 mt-1">
          Review dan kelola seluruh pengajuan sesi dari klien.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari nama, nomor pengajuan, atau WA..."
            className="pl-10 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || "")}>
          <SelectTrigger className="w-full sm:w-48 rounded-xl">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua Status</SelectItem>
            {STATUS_OPTIONS.map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-0 shadow-sm">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
          </CardContent>
        ) : !data?.items?.length ? (
          <CardContent className="text-center py-16">
            <p className="text-gray-400">Belum ada pengajuan.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Pengajuan</TableHead>
                  <TableHead>Klien</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map(
                  (item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">
                        {item.submissionNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-black">
                            {item.client.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.client.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.package.name}</span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(item.eventDate), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "rounded-full",
                            SUBMISSION_STATUS_COLORS[item.status]
                          )}
                        >
                          {SUBMISSION_STATUS_LABELS[item.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/pengajuan/${item.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
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
