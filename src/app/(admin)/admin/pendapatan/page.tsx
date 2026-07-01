"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Download, TrendingUp, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentType } from "@prisma/client"
import * as XLSX from "xlsx"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(n)
}

interface RevenueData {
  payments: {
    id: string
    paymentNumber: string
    paymentType: PaymentType
    amount: number
    paymentMethod: string
    verifiedAt: string | null
    createdAt: string
    invoice: {
      invoiceNumber: string
      submission: {
        submissionNumber: string
        client: { name: string }
        package: { name: string }
      }
    }
  }[]
}

export default function AdminPendapatanPage() {
  const [month, setMonth] = useState(() => new Date().getMonth())
  const [year] = useState(() => new Date().getFullYear())

  const startDate = new Date(Date.UTC(year, month, 1, -7, 0, 0))
  const endDate = new Date(Date.UTC(year, month + 1, 0, 16, 59, 59))

  const { data, isLoading } = useQuery<RevenueData>({
    queryKey: ["revenue", month, year],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
      const res = await fetch(`/api/payments/revenue?${params}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      return json.data
    },
  })

  const stats = useMemo(() => {
    if (!data) return { total: 0, dp: 0, pelunasan: 0 }
    let total = 0, dp = 0, pelunasan = 0
    for (const p of data.payments) {
      if (!p.verifiedAt) continue
      if (p.paymentType === "DP") dp += p.amount
      else if (p.paymentType === "PELUNASAN") pelunasan += p.amount
      total += p.amount
    }
    return { total, dp, pelunasan }
  }, [data])

  function exportExcel() {
    if (!data?.payments.length) return

    const rows = data.payments.map((p) => ({
      "No. Transaksi": p.paymentNumber,
      "No. Invoice": p.invoice?.invoiceNumber,
      "No. Pengajuan": p.invoice?.submission?.submissionNumber,
      Klien: p.invoice?.submission?.client?.name,
      Paket: p.invoice?.submission?.package?.name,
      Tipe: p.paymentType === "DP" ? "DP" : "Pelunasan",
      Nominal: p.amount,
      Metode: p.paymentMethod,
      "Tgl Verifikasi": p.verifiedAt
        ? format(new Date(p.verifiedAt), "dd/MM/yyyy HH:mm")
        : "-",
      Status: p.verifiedAt ? "Terverifikasi" : "Belum",
    }))

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Pendapatan")
    XLSX.writeFile(wb, `pendapatan-lovery-${year}-${String(month + 1).padStart(2, "0")}.xlsx`)
  }

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Pendapatan</h1>
          <p className="text-gray-500 mt-1">Monitoring cashflow studio.</p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl gap-2"
          onClick={exportExcel}
          disabled={!data?.payments.length}
        >
          <Download className="h-4 w-4" />
          Export Excel
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={month === 0 ? "default" : "outline"}
          className={cn(
            "rounded-xl text-sm",
            month === 0 && "bg-lovery-pink hover:bg-lovery-pink-dark text-white"
          )}
          onClick={() => setMonth(0)}
        >
          Jan
        </Button>
        {months.slice(1).map((m, i) => (
          <Button
            key={m}
            variant={month === i + 1 ? "default" : "outline"}
            className={cn(
              "rounded-xl text-sm",
              month === i + 1 && "bg-lovery-pink hover:bg-lovery-pink-dark text-white"
            )}
            onClick={() => setMonth(i + 1)}
          >
            {m.substring(0, 3)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: `Total ${months[month]}`, value: stats.total, color: "bg-lovery-pink" },
          { label: "DP", value: stats.dp, color: "bg-info" },
          { label: "Pelunasan", value: stats.pelunasan, color: "bg-success" },
        ].map((card) => (
          <Card key={card.label} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", card.color + "/10")}>
                  <TrendingUp className={cn("h-5 w-5", card.color.replace("bg-", "text-"))} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{card.label}</p>
                  <p className="text-xl font-bold text-black">{formatRupiah(card.value)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
          </CardContent>
        ) : !data?.payments.length ? (
          <CardContent className="text-center py-16">
            <p className="text-gray-400">Belum ada transaksi di bulan ini.</p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Transaksi</TableHead>
                  <TableHead>Klien</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Nominal</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.paymentNumber}</TableCell>
                    <TableCell className="font-medium">{p.invoice?.submission?.client?.name}</TableCell>
                    <TableCell className="text-sm text-gray-500">{p.invoice?.submission?.package?.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "rounded-full",
                          p.paymentType === "DP" ? "bg-info text-white" : "bg-success text-white"
                        )}
                      >
                        {p.paymentType === "DP" ? "DP" : "Lunas"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{formatRupiah(p.amount)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {p.verifiedAt ? format(new Date(p.verifiedAt), "dd MMM yyyy") : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "rounded-full",
                          p.verifiedAt ? "bg-success text-white" : "bg-warning text-white"
                        )}
                      >
                        {p.verifiedAt ? "Terverifikasi" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  )
}
