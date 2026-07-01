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
import { Loader2, Eye, CheckCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { toast } from "sonner"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(n)
}

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
