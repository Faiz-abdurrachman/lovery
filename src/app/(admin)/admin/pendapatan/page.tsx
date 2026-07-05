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
import { cn, formatRupiah } from "@/lib/utils"
import type { PaymentType } from "@prisma/client"
import * as XLSX from "xlsx"

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
  const year = useMemo(() => new Date().getFullYear(), [])

  // Pake next month first day 00:00 UTC biar gak ada transaksi kelewat
  const startDate = new Date(Date.UTC(year, month, 1))
  const endDate = new Date(Date.UTC(year, month + 1, 1))

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
          <h1 className="text-2xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">Pendapatan</h1>
          <p className="text-gray-500 mt-1">Monitoring cashflow studio.</p>
        </div>
        <Button
          variant="outline"
          className="rounded-none border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-transform gap-2"
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
            "rounded-none border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all text-sm",
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
              "rounded-none border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all text-sm",
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
          <Card key={card.label} className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 flex items-center justify-center", card.color + "/10")}>
                  <TrendingUp className={cn("h-5 w-5", card.color.replace("bg-", "text-"))} />
                </div>
                <div>
                  <p className="font-accent font-bold text-black uppercase tracking-widest border-b-4 border-black pb-2 mb-2 block">{card.label}</p>
                  <p className="font-heading font-black text-3xl text-black">{formatRupiah(card.value)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
          </CardContent>
        ) : !data?.payments.length ? (
          <CardContent className="flex items-center justify-center py-16">
            <div className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#111111]">
              Belum ada transaksi di bulan ini.
            </div>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-black">
                <TableRow className="border-b-2 border-black hover:bg-transparent">
                  <TableHead className="text-white font-heading font-black">No. Transaksi</TableHead>
                  <TableHead className="text-white font-heading font-black">Klien</TableHead>
                  <TableHead className="text-white font-heading font-black">Paket</TableHead>
                  <TableHead className="text-white font-heading font-black">Tipe</TableHead>
                  <TableHead className="text-white font-heading font-black">Nominal</TableHead>
                  <TableHead className="text-white font-heading font-black">Tanggal</TableHead>
                  <TableHead className="text-white font-heading font-black">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.payments.map((p) => (
                  <TableRow key={p.id} className="border-b-2 border-black">
                    <TableCell>
                      <span className="inline-block font-accent font-bold bg-black text-white px-2 py-1 text-xs shadow-[2px_2px_0_0_#E89CC9]">
                        {p.paymentNumber}
                      </span>
                    </TableCell>
                    <TableCell className="font-heading font-black text-lg text-black uppercase">{p.invoice?.submission?.client?.name}</TableCell>
                    <TableCell>
                      <span className="inline-block font-accent font-bold text-black border-2 border-black px-2 py-1 text-xs uppercase shadow-[2px_2px_0_0_#111111]">
                        {p.invoice?.submission?.package?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest",
                          p.paymentType === "DP" ? "bg-info text-white" : "bg-success text-white"
                        )}
                      >
                        {p.paymentType === "DP" ? "DP" : "Lunas"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-heading font-black text-xl text-black">{formatRupiah(p.amount)}</TableCell>
                    <TableCell className="font-accent font-bold text-black uppercase tracking-widest text-xs">
                      {p.verifiedAt ? format(new Date(p.verifiedAt), "dd MMM yyyy") : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest",
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
