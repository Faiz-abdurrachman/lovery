"use client"

import { useState } from "react"
import { useInvoices, useInvoice } from "@/features/invoice/hooks/use-invoice"
import { useVerifyPayment, useCreatePayment } from "@/features/invoice/hooks/use-invoice"
import {
  INVOICE_STATUS_LABELS,
} from "@/features/invoice/constants/invoice.constant"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, Eye, CheckCircle, FileText, Download } from "lucide-react"
import { cn, formatRupiah } from "@/lib/utils"
import { format } from "date-fns"
import { toast } from "sonner"

import jsPDF from "jspdf"

export default function AdminInvoicePage() {
  const { data: invoices, isLoading } = useInvoices()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data: selectedInvoice } = useInvoice(selectedId || "")
  const [payDialog, setPayDialog] = useState<{
    invoiceId: string
    remaining: number
  } | null>(null)
  const [payType, setPayType] = useState("DP")
  const [payAmount, setPayAmount] = useState("")
  const [payMethod, setPayMethod] = useState("TRANSFER")
  function handleDownloadPDF() {
    if (!selectedInvoice) return
    try {
      const inv = selectedInvoice
      const pdf = new jsPDF("p", "mm", "a4")
      const w = pdf.internal.pageSize.getWidth()
      let y = 20

      // Header
      pdf.setFontSize(20)
      pdf.setTextColor("#E89CC9")
      pdf.text("LOVERY PHOTOGRAPHY", w / 2, y, { align: "center" })
      y += 10
      pdf.setFontSize(10)
      pdf.setTextColor("#6B7280")
      pdf.text("All Female Crew Photographer", w / 2, y, { align: "center" })
      y += 12

      // Line
      pdf.setDrawColor("#E5E7EB")
      pdf.line(20, y, w - 20, y)
      y += 8

      // Invoice title
      pdf.setFontSize(16)
      pdf.setTextColor("#111111")
      pdf.text(`INVOICE`, 20, y)
      pdf.setFontSize(10)
      pdf.setTextColor("#6B7280")
      pdf.text(`No. ${inv.invoiceNumber}`, 20, y + 5)
      pdf.text(`Revisi: ${inv.revision}`, w - 20, y + 5, { align: "right" })
      y += 18

      // Client info
      const client = (inv.submission as any)?.client
      const clientName = (client as any)?.[0]?.name || client?.name || "-"
      const clientPhone = (client as any)?.[0]?.phone || client?.phone || "-"
      const subNumber = inv.submission?.submissionNumber || "-"
      const pkgName = (inv.submission as any)?.package?.[0]?.name || (inv.submission as any)?.package?.name || "-"

      pdf.setFontSize(10)
      pdf.setTextColor("#374151")
      pdf.text(`Klien: ${clientName}`, 20, y)
      pdf.text(`WA: ${clientPhone}`, 20, y + 5)
      pdf.text(`Pengajuan: ${subNumber}`, 20, y + 10)
      pdf.text(`Paket: ${pkgName}`, 20, y + 15)
      y += 24

      // Line
      pdf.line(20, y, w - 20, y)
      y += 8

      // Table header
      pdf.setFontSize(10)
      pdf.setTextColor("#FFFFFF")
      pdf.setFillColor("#E89CC9")
      pdf.rect(20, y, w - 40, 7, "F")
      pdf.text("Deskripsi", 24, y + 5)
      pdf.text("Jumlah", w - 24, y + 5, { align: "right" })
      y += 10

      // Subtotal
      pdf.setFontSize(10)
      pdf.setTextColor("#111111")
      pdf.text("Subtotal (Paket)", 24, y)
      pdf.text(formatRupiah(inv.subtotal), w - 24, y, { align: "right" })
      y += 6

      // Addons
      if (inv.addonTotal > 0) {
        pdf.text("Add-On", 24, y)
        pdf.text(formatRupiah(inv.addonTotal), w - 24, y, { align: "right" })
        y += 6
      }

      // Line
      y += 2
      pdf.setDrawColor("#E5E7EB")
      pdf.line(20, y, w - 20, y)
      y += 6

      // Grand total
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      pdf.text("Grand Total", 24, y)
      pdf.text(formatRupiah(inv.grandTotal), w - 24, y, { align: "right" })
      y += 7

      // DP
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text("DP", 24, y)
      pdf.text(formatRupiah(inv.dpAmount), w - 24, y, { align: "right" })
      y += 6

      // Remaining
      pdf.text("Sisa Pembayaran", 24, y)
      pdf.text(formatRupiah(inv.remainingAmount), w - 24, y, { align: "right" })
      y += 16

      // Payment history
      if (inv.payments?.length > 0) {
        pdf.setDrawColor("#E5E7EB")
        pdf.line(20, y, w - 20, y)
        y += 6
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(10)
        pdf.setTextColor("#111111")
        pdf.text("Riwayat Pembayaran", 20, y)
        y += 6
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor("#6B7280")
        for (const p of inv.payments) {
          const label = p.paymentType === "DP" ? "DP" : "Pelunasan"
          const status = p.verifiedAt ? "✓ Terverifikasi" : "○ Pending"
          pdf.text(`${label} - ${formatRupiah(p.amount)} via ${p.paymentMethod}`, 24, y)
          pdf.text(status, w - 24, y, { align: "right" })
          y += 5
        }
      }

      // Footer
      y = 270
      pdf.setDrawColor("#E5E7EB")
      pdf.line(20, y, w - 20, y)
      y += 6
      pdf.setFontSize(8)
      pdf.setTextColor("#9CA3AF")
      pdf.text("Lovery Photography", 20, y)
      pdf.text("Terima kasih telah mempercayakan momen Anda kepada kami", w / 2, y + 4, { align: "center" })

      pdf.save(`Invoice-${inv.invoiceNumber}.pdf`)
      toast.success("Invoice berhasil di-download")
    } catch (err) {
      toast.error("Gagal membuat PDF: " + (err as Error)?.message)
    }
  }

  const verifyPayment = useVerifyPayment()
  const createPayment = useCreatePayment()

  async function handleVerify(paymentId: string) {
    try {
      await verifyPayment.mutateAsync(paymentId)
      toast.success("Pembayaran berhasil diverifikasi")
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal verifikasi")
    }
  }

  async function handleCreatePayment() {
    if (!payDialog || !payAmount) return
    try {
      const pAmount = parseInt(payAmount, 10)
      if (isNaN(pAmount) || pAmount <= 0) {
        toast.error("Nominal pembayaran tidak valid")
        return
      }
      const payment = await createPayment.mutateAsync({
        invoiceId: payDialog.invoiceId,
        paymentType: payType,
        amount: pAmount,
        paymentMethod: payMethod,
      })
      await verifyPayment.mutateAsync(payment.id)
      toast.success("Pembayaran dicatat dan diverifikasi")
      setPayDialog(null)
      setPayAmount("")
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal mencatat pembayaran")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Invoice</h1>
        <p className="text-gray-500 mt-1">
          Kelola invoice dan verifikasi pembayaran.
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        {isLoading ? (
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
          </CardContent>
        ) : !invoices?.length ? (
          <CardContent className="text-center py-16">
            <FileText className="mx-auto h-10 w-10 text-gray-300" />
            <p className="text-gray-400 mt-4">Belum ada invoice.</p>
            <p className="text-sm text-gray-400 mt-1">
              Invoice akan dibuat otomatis saat admin menerima pengajuan.
            </p>
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Invoice</TableHead>
                  <TableHead>Klien</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>DP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-sm">
                      {inv.invoiceNumber}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-black">
                        {inv.submission?.client?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {inv.submission?.submissionNumber}
                      </p>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatRupiah(inv.grandTotal)}
                    </TableCell>
                    <TableCell>{formatRupiah(inv.dpAmount)}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "rounded-full",
                          inv.status === "ACTIVE"
                            ? "bg-success text-white"
                            : inv.status === "REVISED"
                              ? "bg-warning text-white"
                              : "bg-gray-400 text-white"
                        )}
                      >
                        {INVOICE_STATUS_LABELS[inv.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setSelectedId(selectedId === inv.id ? null : inv.id)
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {selectedInvoice && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Detail Invoice: {selectedInvoice.invoiceNumber}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-1.5"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4" /> PDF
                </Button>
                <Badge
                  className={cn(
                    "rounded-full",
                    selectedInvoice.status === "ACTIVE"
                      ? "bg-success text-white"
                      : selectedInvoice.status === "REVISED"
                        ? "bg-warning text-white"
                        : "bg-gray-400 text-white"
                  )}
                >
                  {INVOICE_STATUS_LABELS[selectedInvoice.status]}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Subtotal</p>
                <p className="font-medium">{formatRupiah(selectedInvoice.subtotal)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Add-On</p>
                <p className="font-medium">{formatRupiah(selectedInvoice.addonTotal)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total</p>
                <p className="font-bold text-lovery-pink">{formatRupiah(selectedInvoice.grandTotal)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Sisa</p>
                <p className="font-medium">{formatRupiah(selectedInvoice.remainingAmount)}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-2">Riwayat Pembayaran</p>
              {selectedInvoice.payments?.length ? (
                <div className="space-y-2">
                  {selectedInvoice.payments.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between text-sm py-2 px-3 rounded-xl bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">
                          {p.paymentType === "DP" ? "DP" : "Pelunasan"} -{" "}
                          {formatRupiah(p.amount)} via {p.paymentMethod === "TRANSFER" ? "Transfer" : "QRIS"}
                        </p>
                        {p.verifiedAt && (
                          <p className="text-xs text-success">
                            Terverifikasi{" "}
                            {format(new Date(p.verifiedAt), "dd MMM HH:mm")}
                          </p>
                        )}
                      </div>
                      {!p.verifiedAt && (
                        <Button
                          size="sm"
                          className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white"
                          onClick={() => handleVerify(p.id)}
                          disabled={verifyPayment.isPending}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verifikasi
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Belum ada pembayaran.</p>
              )}
            </div>

            {selectedInvoice.remainingAmount > 0 && (
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() =>
                  setPayDialog({
                    invoiceId: selectedInvoice.id,
                    remaining: selectedInvoice.remainingAmount,
                  })
                }
              >
                + Catat Pembayaran
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={!!payDialog} onOpenChange={() => setPayDialog(null)}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>Catat Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label>Tipe Pembayaran</Label>
                <Select value={payType} onValueChange={(v) => setPayType(v || "DP")}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DP">DP</SelectItem>
                  <SelectItem value="PELUNASAN">Pelunasan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nominal</Label>
              <Input
                type="number"
                placeholder="50000"
                className="rounded-xl"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
              />
              <p className="text-xs text-gray-400">
                Sisa: {payDialog ? formatRupiah(payDialog.remaining) : ""}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Metode</Label>
                <Select value={payMethod} onValueChange={(v) => setPayMethod(v || "TRANSFER")}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRANSFER">Transfer Bank</SelectItem>
                  <SelectItem value="QRIS">QRIS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setPayDialog(null)}>
              Batal
            </Button>
            <Button
              className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white"
              onClick={handleCreatePayment}
              disabled={createPayment.isPending || !payAmount}
            >
              {createPayment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan & Verifikasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
