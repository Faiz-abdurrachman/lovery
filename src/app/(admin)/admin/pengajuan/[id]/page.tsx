"use client"

import { useParams } from "next/navigation"
import { useSubmission, useUpdateStatus } from "@/features/submission/hooks/use-submission"
import {
  SUBMISSION_STATUS_LABELS,
  SUBMISSION_STATUS_COLORS,
  NEXT_ALLOWED_STATUSES,
} from "@/features/submission/constants/submission.constant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, ArrowLeft, Clock, User, MapPin, Package, MessageCircle, ExternalLink, HardDrive, Bell, Download, CreditCard, CheckCircle, Receipt, Trash2 } from "lucide-react"
import jsPDF from "jspdf"
import { toast } from "sonner"
import { openWhatsApp, WhatsAppTemplates } from "@/features/whatsapp/utils/whatsapp"
import { useQueryClient } from "@tanstack/react-query"
import { cn, formatRupiah } from "@/lib/utils"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"
import type { SubmissionStatus } from "@prisma/client"
import { useState } from "react"
import Link from "next/link"
import { useSettings } from "@/features/settings/hooks/use-settings"

function loadImageDataURL(src: string): Promise<{ data: string; width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) return resolve(null)
      ctx.drawImage(img, 0, 0)
      resolve({ data: canvas.toDataURL("image/jpeg", 0.9), width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

const STATUS_ACTIONS: Record<string, string> = {
  WAITING_DP: "Terima Pengajuan",
  REJECTED: "Tolak Pengajuan",
  RESCHEDULE: "Minta Penjadwalan Ulang",
  // Dari RESCHEDULE balik ke WAITING_DP
  // Reuse label "Konfirmasi Penjadwalan Ulang" biar jelas konteksnya
  CANCELLED: "Batalkan Pengajuan",
  ON_SESSION: "Mulai Sesi",
  EDITING: "Selesaikan Sesi",
  DELIVERED: "Upload Google Drive",
  COMPLETED: "Tandai Selesai",
}

export default function AdminDetailPengajuanPage() {
  const { id } = useParams<{ id: string }>()
  const { data: submission, isLoading } = useSubmission(id)
  const updateStatus = useUpdateStatus()
  const queryClient = useQueryClient()
  const [actionDialog, setActionDialog] = useState<{ status: string; label: string } | null>(null)
  const [adminNote, setAdminNote] = useState("")
  const [driveLink, setDriveLink] = useState("")
  const [savingDrive, setSavingDrive] = useState(false)
  const [payDialog, setPayDialog] = useState<{ invoiceId: string; remaining: number } | null>(null)
  const [payType, setPayType] = useState("DP")
  const [payAmount, setPayAmount] = useState("")
  const [payMethod, setPayMethod] = useState("TRANSFER")
  const [paying, setPaying] = useState(false)
  const { data: settings } = useSettings()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-12 w-12 animate-spin text-lovery-pink" />
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="text-center py-32">
        <p className="font-heading font-black text-4xl uppercase text-black bg-gray-200 inline-block px-4 py-2 border-4 border-black shadow-[8px_8px_0_0_#E89CC9]">Pengajuan tidak ditemukan.</p>
      </div>
    )
  }

  const sub = submission
  const nextStatuses = NEXT_ALLOWED_STATUSES[sub.status as SubmissionStatus] || []

  function handleAction(status: string) {
    const label = STATUS_ACTIONS[status] || status
    setActionDialog({ status, label })
    setAdminNote("")
  }

  async function confirmAction() {
    if (!actionDialog) return
    try {
      const result = await updateStatus.mutateAsync({
        id: sub.id,
        status: actionDialog.status as SubmissionStatus,
        adminNote: adminNote || undefined,
      })
      setActionDialog(null)

      // Auto-open WhatsApp untuk notification ke klien
      const clientPhone = (sub.client as any)?.[0]?.phone || sub.client?.phone
      const clientName = (sub.client as any)?.[0]?.name || sub.client?.name
      if (!clientPhone) return

      const status = actionDialog.status
      if (status === "WAITING_DP") {
        const inv = (result as any)?.invoice
        if (inv) {
          const total = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(inv.grandTotal)
          const dp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(inv.dpAmount)
          let msg = WhatsAppTemplates.invoiceReady(clientName, inv.invoiceNumber, total, dp, packageData?.name)
          // Tambah info pembayaran dari settings
          const s = settings
          if (s?.bankName && s?.bankAccount) {
            msg += `\n\nPembayaran dapat dilakukan ke:\n🏦 ${s.bankName} - ${s.bankAccount}${s.bankHolder ? ` a.n ${s.bankHolder}` : ""}`
          }
          openWhatsApp(clientPhone, msg)
        }
      } else if (status === "REJECTED") {
        const msg = WhatsAppTemplates.submissionRejected(clientName, adminNote || "Tidak ada alasan")
        openWhatsApp(clientPhone, msg)
      } else if (status === "RESCHEDULE") {
        const msg = WhatsAppTemplates.rescheduleRequested(clientName)
        openWhatsApp(clientPhone, msg)
      } else if (status === "CANCELLED") {
        const msg = `Halo ${clientName},\n\nPengajuan ${sub.submissionNumber} telah dibatalkan.\n\nTerima kasih,\nLovery Photography`
        openWhatsApp(clientPhone, msg)
      } else if (status === "ON_SESSION") {
        const date = format(new Date(sub.eventDate), "EEEE, dd MMMM yyyy")
        const msg = WhatsAppTemplates.sessionReminder(clientName, date, sub.eventTime, sub.location)
        openWhatsApp(clientPhone, msg)
      } else if (status === "COMPLETED") {
        const msg = WhatsAppTemplates.thankYou(clientName)
        openWhatsApp(clientPhone, msg)
      }
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal mengubah status")
    }
  }

  async function handleCreatePayment() {
    if (!payDialog || !payAmount) return
    setPaying(true)
    try {
      const pAmount = parseInt(payAmount, 10)
      if (isNaN(pAmount) || pAmount <= 0) {
        toast.error("Nominal tidak valid")
        setPaying(false)
        return
      }
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: payDialog.invoiceId,
          paymentType: payType,
          amount: pAmount,
          paymentMethod: payMethod,
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)

      // Verify langsung
      const verifyRes = await fetch(`/api/payments/${json.data.id}/verify`, { method: "PATCH" })
      const verifyJson = await verifyRes.json()
      if (!verifyJson.success) throw new Error(verifyJson.message)

      toast.success("Pembayaran dicatat dan diverifikasi")
      setPayDialog(null)
      setPayAmount("")
      queryClient.invalidateQueries({ queryKey: ["submission", sub.id] })
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal mencatat pembayaran")
    } finally {
      setPaying(false)
    }
  }

  async function handleSaveDrive(send: boolean) {
    if (!driveLink) return
    setSavingDrive(true)
    try {
      const res = await fetch(`/api/submissions/${sub.id}/drive`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driveLink, send }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)

      toast.success(
        send ? "Link disimpan & hasil dikirim" : "Link Google Drive disimpan"
      )

      if (send && json.clientPhone) {
        const msg = WhatsAppTemplates.driveDelivered(json.clientName, driveLink)
        openWhatsApp(json.clientPhone, msg)
      }

      setDriveLink("")
      queryClient.invalidateQueries({ queryKey: ["submission", sub.id] })
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal menyimpan link")
    } finally {
      setSavingDrive(false)
    }
  }

  const totalAddOnPrice = sub.submissionAddOns?.reduce(
    (sum: number, s) => sum + (s.priceSnapshot || s.addOn?.price || 0), 0
  ) || 0

  // Normalize Supabase join: sometimes returns array, sometimes object
  const clientData = (sub.client as any)?.[0] || sub.client
  const packageData = (sub.package as any)?.[0] || sub.package

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <Link href="/admin/pengajuan" className="inline-flex items-center gap-2 font-accent font-bold uppercase tracking-widest text-black bg-gray-200 px-3 py-1 border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all mb-4">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-4xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">{sub.submissionNumber}</h1>
          <Badge className={cn("rounded-none border-4 border-black shadow-[4px_4px_0_0_#111111] font-accent font-black uppercase tracking-widest text-sm px-4 py-1", SUBMISSION_STATUS_COLORS[sub.status as SubmissionStatus])}>
            {SUBMISSION_STATUS_LABELS[sub.status as SubmissionStatus]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
            <CardHeader className="pb-0">
              <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                <User className="h-6 w-6" /> Info Klien
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Nama</span>
                <span className="font-heading font-black text-xl text-black uppercase text-right">{clientData?.name}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">WhatsApp</span>
                <span className="font-heading font-black text-xl text-black uppercase text-right">{clientData?.phone}</span>
              </div>
              {clientData?.instagram && (
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                  <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Instagram</span>
                  <span className="font-heading font-black text-xl text-black uppercase text-right">@{clientData.instagram}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
            <CardHeader className="pb-0">
              <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                <MapPin className="h-6 w-6" /> Detail Sesi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Acara</span>
                <span className="font-heading font-black text-xl text-black uppercase text-right">{sub.eventName}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Tanggal</span>
                <span className="font-heading font-black text-xl text-black uppercase text-right">{format(new Date(sub.eventDate), "EEEE, dd MMMM yyyy", { locale: idLocale })}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Jam</span>
                <span className="font-heading font-black text-xl text-black uppercase text-right">{sub.eventTime}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-4 gap-2">
                <span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Lokasi</span>
                <span className="font-heading font-black text-xl text-black uppercase text-right">{sub.location}</span>
              </div>
              {sub.specialRequest && <div><span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit mb-2">Request Khusus</span><p className="font-heading font-black text-lg text-black uppercase bg-gray-50 p-4 rounded-none border-4 border-black">{sub.specialRequest}</p></div>}
            </CardContent>
          </Card>

          <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
            <CardHeader className="pb-0">
              <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                <Package className="h-6 w-6" /> Paket & Add-On
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-2 gap-2">
                <span className="font-heading font-black text-xl text-black uppercase">{packageData?.name}</span>
                <span className="font-heading font-black text-xl text-black">{formatRupiah(packageData?.price || 0)}</span>
              </div>
              {sub.submissionAddOns?.map((s) => (
                <div key={s.addonId} className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dashed border-black pb-2 ml-4 gap-2">
                  <span className="font-accent font-bold uppercase tracking-widest">{s.addOn?.name}</span>
                  <span className="font-accent font-bold tracking-widest">{formatRupiah(s.priceSnapshot || s.addOn?.price || 0)}</span>
                </div>
              ))}
              {sub.submissionAddOns?.length > 0 && (
                <>
                  <div className="border-t-4 border-black pt-4 flex flex-col md:flex-row md:items-center justify-between gap-2 mt-4">
                    <span className="font-heading font-black text-2xl uppercase">Total</span>
                    <span className="font-heading font-black text-3xl text-lovery-pink drop-shadow-[2px_2px_0_#111111]">{formatRupiah((packageData?.price || 0) + totalAddOnPrice)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
            <CardHeader className="pb-0">
              <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                <Clock className="h-6 w-6" /> Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="ml-2">
                {sub.timelines?.map((t) => (
                  <div key={t.id} className="border-l-8 border-black pl-6 pb-8 relative last:pb-2 pt-2">
                    <div className="w-4 h-4 bg-lovery-pink border-2 border-black absolute -left-[12px] top-2 shadow-[2px_2px_0_0_#111111]" />
                    <div className="pb-2">
                      <p className="font-accent font-bold bg-black text-white px-2 py-1 text-xs uppercase inline-block mb-2 shadow-[2px_2px_0_0_#E89CC9]">{format(new Date(t.createdAt), "dd MMM, HH:mm", { locale: idLocale })}</p>
                      <p className="font-heading font-black text-xl uppercase text-black leading-tight">{t.activity}</p>
                      {t.description && <p className="font-accent font-bold uppercase tracking-widest text-black mt-2 bg-gray-100 p-2 border-2 border-black inline-block">{t.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {["EDITING", "DELIVERED", "COMPLETED"].includes(sub.status) && (
            <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
              <CardHeader className="pb-0">
                <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                  <HardDrive className="h-6 w-6" /> Google Drive
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sub.googleDriveLink && (
                  <a
                    href={sub.googleDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-accent font-bold uppercase tracking-widest text-blue-600 hover:underline break-all border-4 border-black p-2 bg-blue-50 shadow-[4px_4px_0_0_#111111]"
                  >
                    <ExternalLink className="h-5 w-5 shrink-0" />
                    {sub.googleDriveLink}
                  </a>
                )}
                {sub.status !== "COMPLETED" ? (
                  <>
                    <div className="flex gap-2 mt-4">
                      <Input
                        placeholder="Tempel link Google Drive..."
                        className="rounded-none border-4 border-black font-accent font-bold h-12 text-black"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-lg h-12"
                        onClick={() => handleSaveDrive(false)}
                        disabled={savingDrive || !driveLink}
                      >
                        {savingDrive ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Simpan Link
                      </Button>
                      {sub.status === "EDITING" && (
                        <Button
                          className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-lovery-pink hover:bg-lovery-pink-dark text-white font-heading font-black uppercase tracking-widest text-lg h-12 gap-2"
                          onClick={() => handleSaveDrive(true)}
                          disabled={savingDrive || !driveLink}
                        >
                          <MessageCircle className="h-5 w-5" />
                          Simpan & Kirim
                        </Button>
                      )}
                    </div>
                  </>
                ) : !sub.googleDriveLink && (
                  <p className="font-accent font-bold uppercase text-gray-500 bg-gray-100 p-2 border-2 border-black inline-block">Belum ada link tersimpan.</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Kartu Invoice — muncul kalo udah ada invoice */}
          {(() => {
            const inv = (sub.invoices as any)?.[0]
            if (!inv) return null
            const totalPayments = (inv.payments || []).reduce((s: number, p: any) => s + (p.verifiedAt ? p.amount : 0), 0)
            const isActive = inv.status === "ACTIVE"
            return (
            <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
              <CardHeader className="pb-0">
                <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                  <Receipt className="h-6 w-6 text-lovery-pink" /> Invoice
                  <Badge className={cn("rounded-none border-4 border-black shadow-[4px_4px_0_0_#111111] font-accent font-black uppercase tracking-widest ml-auto text-sm px-3 py-1", isActive ? "bg-success text-white" : "bg-black text-white")}>
                    {inv.status === "ACTIVE" ? "Aktif" : inv.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="font-accent font-bold uppercase tracking-widest text-black bg-gray-200 inline-block px-2 py-1 border-2 border-black">{inv.invoiceNumber}</p>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-2 gap-2"><span className="font-heading font-black text-2xl uppercase">Total</span><span className="font-heading font-black text-3xl text-lovery-pink drop-shadow-[2px_2px_0_#111111]">{formatRupiah(inv.grandTotal)}</span></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-2 gap-2"><span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">DP</span><span className="font-heading font-black text-xl text-black uppercase">{formatRupiah(inv.dpAmount)}</span></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-2 gap-2"><span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Sisa</span><span className="font-heading font-black text-xl text-black uppercase">{formatRupiah(inv.remainingAmount)}</span></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-dotted border-black pb-2 gap-2"><span className="font-accent font-bold uppercase tracking-widest bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">Terkumpul</span><span className="font-heading font-black text-xl text-success uppercase">{formatRupiah(totalPayments)}</span></div>
                </div>

                {/* Riwayat Pembayaran */}
                {(inv.payments || []).length > 0 && (
                  <>
                    <div className="border-t-8 border-black pt-4">
                      <p className="font-heading font-black text-xl uppercase mb-4">Riwayat Pembayaran</p>
                      <div className="space-y-4">
                        {(inv.payments || []).map((p: any) => (
                          <div key={p.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-none border-4 border-black bg-gray-50 shadow-[4px_4px_0_0_#111111] gap-4">
                            <div>
                              <p className="font-heading font-black text-lg uppercase">{p.paymentType === "DP" ? "DP" : "Pelunasan"} — {formatRupiah(p.amount)}</p>
                              <p className="font-accent font-bold uppercase tracking-widest mt-1">{p.paymentMethod} {p.verifiedAt ? "✓ " + format(new Date(p.verifiedAt), "dd MMM") : "⏳ Pending"}</p>
                            </div>
                            {!p.verifiedAt && (
                                <div className="flex gap-2">
                                  <Button className="rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-lovery-pink text-white font-heading font-black uppercase tracking-widest px-4 h-10"
                                    onClick={async () => {
                                      try {
                                        const res = await fetch(`/api/payments/${p.id}/verify`, { method: "PATCH" })
                                        const json = await res.json()
                                        if (!json.success) throw new Error(json.message)
                                        toast.success("Pembayaran diverifikasi")
                                        queryClient.invalidateQueries({ queryKey: ["submission", sub.id] })
                                      } catch (e) { toast.error((e as Error).message) }
                                    }}
                                  >
                                    Verifikasi
                                  </Button>
                                  <Button variant="outline" className="rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-white text-error font-heading font-black uppercase tracking-widest px-3 h-10"
                                    onClick={async () => {
                                      if (!confirm("Hapus catatan pembayaran ini?")) return
                                      try {
                                        const res = await fetch(`/api/payments/${p.id}`, { method: "DELETE" })
                                        const json = await res.json()
                                        if (!json.success) throw new Error(json.message)
                                        toast.success("Catatan pembayaran dihapus")
                                        queryClient.invalidateQueries({ queryKey: ["submission", sub.id] })
                                      } catch (e) { toast.error((e as Error).message) }
                                    }}
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-8 border-black mt-6">
                  <Button variant="outline" className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-lg h-12 gap-2"
                    onClick={async () => {
                      const inv2 = sub.invoices?.[0]
                      if (!inv2) return
                      try {
                        const pdf = new jsPDF("p", "mm", "a4")
                        const w = pdf.internal.pageSize.getWidth()
                        const m = 18
                        let y = m

                        // ── LOGO ──
                        const logo = await loadImageDataURL("/logo bulat.png")
                        if (logo) {
                          const logoW = 32
                          const logoH = (logo.height / logo.width) * logoW
                          pdf.addImage(logo.data, "PNG", (w - logoW) / 2, y, logoW, logoH)
                          y += logoH + 4
                        }

                        // ── HEADER ──
                        pdf.setFontSize(16); pdf.setFont("helvetica", "bold"); pdf.setTextColor("#E89CC9")
                        pdf.text("LOVERY PHOTOGRAPHY", w / 2, y, { align: "center" }); y += 5
                        pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor("#6B7280")
                        pdf.text("All Female Crew Photographer", w / 2, y, { align: "center" }); y += 4
                        pdf.text("Yogyakarta | Solo | Semarang", w / 2, y, { align: "center" }); y += 4
                        pdf.text("WA: 6281234567890", w / 2, y, { align: "center" }); y += 6

                        // ── LINE ──
                        pdf.setDrawColor("#E89CC9"); pdf.setLineWidth(0.5)
                        pdf.line(m, y, w - m, y); y += 6

                        // ── INVOICE TITLE ──
                        pdf.setFontSize(18); pdf.setFont("helvetica", "bold"); pdf.setTextColor("#111111")
                        pdf.text("INVOICE", m, y); y += 5
                        pdf.setFont("helvetica", "normal"); pdf.setFontSize(9); pdf.setTextColor("#6B7280")
                        pdf.text(`No. ${inv2.invoiceNumber}`, m, y)
                        pdf.text(`Tanggal: ${format(new Date(), "dd MMMM yyyy")}`, w - m, y, { align: "right" }); y += 7

                        // ── CLIENT INFO ──
                        pdf.setFontSize(9); pdf.setTextColor("#374151")
                        pdf.setFont("helvetica", "bold"); pdf.text("KLIEN", m, y); y += 4
                        pdf.setFont("helvetica", "normal")
                        pdf.text(`Nama: ${clientData?.name || "-"}`, m, y); y += 4
                        pdf.text(`WA: ${clientData?.phone || "-"}`, m, y); y += 4
                        pdf.text(`Paket: ${packageData?.name || "-"}`, m, y); y += 4
                        pdf.text(`Acara: ${sub.eventName}`, m, y); y += 4
                        if (sub.eventDate) {
                          pdf.text(`Tanggal Sesi: ${format(new Date(sub.eventDate), "EEEE, dd MMMM yyyy")}`, m, y); y += 4
                        }
                        y += 4

                        // ── TABLE HEADER ──
                        pdf.setDrawColor("#E89CC9"); pdf.setFillColor("#E89CC9")
                        pdf.rect(m, y, w - 2 * m, 7, "F")
                        pdf.setFontSize(8); pdf.setFont("helvetica", "bold"); pdf.setTextColor("#FFFFFF")
                        const col = [m + 3, m + 90, w - m - 55, w - m - 28, w - m - 3]
                        pdf.text("Deskripsi", col[0], y + 5)
                        pdf.text("Qty", col[1], y + 5)
                        pdf.text("Harga", col[2], y + 5)
                        pdf.text("Total", col[3], y + 5)
                        y += 11

                        // ── TABLE ROWS ──
                        pdf.setFont("helvetica", "normal"); pdf.setFontSize(9); pdf.setTextColor("#111111")
                        // Paket
                        pdf.text(`Paket: ${packageData?.name || "-"}`, col[0], y)
                        pdf.text("1", col[1], y)
                        pdf.text(formatRupiah(inv2.subtotal), col[2], y)
                        pdf.text(formatRupiah(inv2.subtotal), col[3], y)
                        y += 6
                        // Add-ons
                        if (inv2.addonTotal > 0) {
                          pdf.setTextColor("#6B7280")
                          pdf.text("Add-On", col[0], y)
                          pdf.text("1", col[1], y)
                          pdf.text(formatRupiah(inv2.addonTotal), col[2], y)
                          pdf.text(formatRupiah(inv2.addonTotal), col[3], y)
                          y += 6
                        }

                        // ── TABLE BORDER ──
                        pdf.setDrawColor("#E5E7EB"); pdf.setLineWidth(0.3)
                        pdf.line(m, y, w - m, y); y += 5

                        // ── TOTALS ──
                        const totX = w - m - 55
                        pdf.setFontSize(9); pdf.setTextColor("#6B7280")
                        pdf.text("Sub Total:", totX, y); pdf.text(formatRupiah(inv2.subtotal + inv2.addonTotal), w - m - 3, y, { align: "right" }); y += 5
                        pdf.text("DP:", totX, y); pdf.text(formatRupiah(inv2.dpAmount), w - m - 3, y, { align: "right" }); y += 5
                        pdf.text("Sisa:", totX, y); pdf.text(formatRupiah(inv2.remainingAmount), w - m - 3, y, { align: "right" }); y += 5
                        pdf.setDrawColor("#E89CC9"); pdf.setLineWidth(0.5)
                        pdf.line(m, y, w - m, y); y += 6
                        pdf.setFont("helvetica", "bold"); pdf.setFontSize(12); pdf.setTextColor("#E89CC9")
                        pdf.text("GRAND TOTAL:", w - m - 35, y, { align: "right" }); pdf.text(formatRupiah(inv2.grandTotal), w - m - 3, y, { align: "right" })
                        y += 12

                        // ── PAYMENT INFO ──
                        const sData = settings
                        pdf.setDrawColor("#E5E7EB"); pdf.line(m, y, w - m, y); y += 5
                        pdf.setFont("helvetica", "bold"); pdf.setFontSize(9); pdf.setTextColor("#111111")
                        pdf.text("PEMBAYARAN", m, y); y += 5
                        pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor("#374151")
                        if (sData?.bankName && sData?.bankAccount) {
                          pdf.text(`Bank: ${sData.bankName}`, m, y); y += 4
                          pdf.text(`No. Rek: ${sData.bankAccount}`, m, y); y += 4
                          if (sData.bankHolder) { pdf.text(`a.n: ${sData.bankHolder}`, m, y); y += 4 }
                        } else {
                          pdf.text("BCA - 1234567890 a.n Lovery Photography", m, y); y += 4
                        }
                        y += 4

                        // ── TERMS ──
                        pdf.setDrawColor("#E5E7EB"); pdf.line(m, y, w - m, y); y += 5
                        pdf.setFont("helvetica", "bold"); pdf.setFontSize(9); pdf.setTextColor("#111111")
                        pdf.text("SYARAT & KETENTUAN", m, y); y += 5
                        pdf.setFont("helvetica", "normal"); pdf.setFontSize(7); pdf.setTextColor("#6B7280")
                        const terms = [
                          "1. DP wajib dibayarkan untuk mengamankan jadwal.",
                          "2. Pelunasan maksimal H-1 sebelum sesi.",
                          "3. Pembatalan di hari-H dikenakan biaya 2x paket.",
                          "4. Hasil foto dikirim via Google Drive dalam 14 hari.",
                        ]
                        terms.forEach(t => { pdf.text(t, m + 2, y); y += 4 })

                        // ── FOOTER ──
                        y = Math.max(y, 265)
                        pdf.setDrawColor("#E5E7EB"); pdf.line(m, y, w - m, y); y += 4
                        pdf.setFontSize(7); pdf.setTextColor("#9CA3AF")
                        pdf.text("Terima kasih telah mempercayakan momen Anda kepada Lovery Photography.", w / 2, y, { align: "center" })
                        y += 3
                        pdf.text("© Lovery Photography", w / 2, y, { align: "center" })

                        pdf.save(`Invoice-${inv2.invoiceNumber}.pdf`)
                        toast.success("PDF di-download")
                      } catch(e) { toast.error("Gagal download PDF") }
                    }}
                  >
                    <Download className="h-5 w-5" /> PDF
                  </Button>
                  {isActive && inv.remainingAmount > 0 && (
                    <Button variant="outline" className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-lg h-12 gap-2 bg-lovery-pink text-white"
                      onClick={() => setPayDialog({ invoiceId: inv.id, remaining: inv.remainingAmount })}
                    >
                      <CreditCard className="h-5 w-5" /> Bayar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            )
          })()}

          {/* Tombol WhatsApp + PDF ke klien — selalu muncul */}
          <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
            <CardHeader className="pb-0">
              <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-green-500" /> WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="font-accent font-bold uppercase tracking-widest text-black bg-gray-200 inline-block px-2 py-1 border-2 border-black w-fit">{clientData?.name} • {clientData?.phone}</p>
                <p className="text-xs font-accent font-bold uppercase tracking-widest text-gray-500">* Sistem akan otomatis mengonversi awalan 0 menjadi 62.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-base h-12 gap-2"
                  onClick={() => {
                    let msg = WhatsAppTemplates.invoiceReady(
                      clientData?.name || "",
                      sub.invoices?.[0]?.invoiceNumber || "-",
                      formatRupiah(sub.invoices?.[0]?.grandTotal || 0),
                      formatRupiah(sub.invoices?.[0]?.dpAmount || 0),
                      packageData?.name
                    )
                    const s = settings
                    if (s?.bankName && s?.bankAccount) {
                      msg += `\n\nPembayaran dapat dilakukan ke:\n🏦 ${s.bankName} - ${s.bankAccount}${s.bankHolder ? ` a.n ${s.bankHolder}` : ""}`
                    }
                    openWhatsApp(clientData?.phone || "", msg)
                  }}
                >
                  <MessageCircle className="h-5 w-5" /> Invoice
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-base h-12 gap-2"
                  onClick={() => {
                    if (sub.eventDate) {
                      const date = format(new Date(sub.eventDate), "EEEE, dd MMMM yyyy")
                      const msg = WhatsAppTemplates.sessionReminder(
                        clientData?.name || "",
                        date,
                        sub.eventTime,
                        sub.location
                      )
                      openWhatsApp(clientData?.phone || "", msg)
                    }
                  }}
                >
                  <Bell className="h-5 w-5" /> Pengingat
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-base h-12 gap-2 bg-black text-white"
                  onClick={() => openWhatsApp(clientData?.phone || "", "")}
                >
                  <MessageCircle className="h-5 w-5" /> Buka Chat
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-base h-12 gap-2 bg-gray-200 text-black"
                  onClick={() => {
                    const inv = sub.invoices?.[0]
                    if (!inv) return toast.error("Belum ada invoice")
                    try {
                      const pdf = new jsPDF("p", "mm", "a4")
                      const w2 = pdf.internal.pageSize.getWidth()
                      let y2 = 20
                      pdf.setFontSize(20)
                      pdf.setTextColor("#E89CC9")
                      pdf.text("LOVERY PHOTOGRAPHY", w2 / 2, y2, { align: "center" })
                      y2 += 10
                      pdf.setFontSize(10)
                      pdf.setTextColor("#6B7280")
                      pdf.text("Studio Fotografi Profesional", w2 / 2, y2, { align: "center" })
                      y2 += 12
                      pdf.setDrawColor("#E5E7EB")
                      pdf.line(20, y2, w2 - 20, y2)
                      y2 += 8
                      pdf.setFontSize(16)
                      pdf.setTextColor("#111111")
                      pdf.text("INVOICE", 20, y2)
                      pdf.setFontSize(10)
                      pdf.setTextColor("#6B7280")
                      pdf.text(`No. ${inv.invoiceNumber}`, 20, y2 + 5)
                      y2 += 18
                      pdf.setFontSize(10)
                      pdf.setTextColor("#374151")
                      pdf.text(`Klien: ${clientData?.name || "-"}`, 20, y2)
                      pdf.text(`WA: ${clientData?.phone || "-"}`, 20, y2 + 5)
                      y2 += 16
                      pdf.setDrawColor("#E5E7EB")
                      pdf.line(20, y2, w2 - 20, y2)
                      y2 += 8
                      pdf.setFontSize(10)
                      pdf.setTextColor("#FFFFFF")
                      pdf.setFillColor("#E89CC9")
                      pdf.rect(20, y2, w2 - 40, 7, "F")
                      pdf.text("Deskripsi", 24, y2 + 5)
                      pdf.text("Jumlah", w2 - 24, y2 + 5, { align: "right" })
                      y2 += 10
                      pdf.setTextColor("#111111")
                      pdf.text(`Paket (${packageData?.name || "-"})`, 24, y2)
                      pdf.text(formatRupiah(inv.subtotal), w2 - 24, y2, { align: "right" })
                      y2 += 6
                      if (inv.addonTotal > 0) {
                        pdf.text("Add-On", 24, y2)
                        pdf.text(formatRupiah(inv.addonTotal), w2 - 24, y2, { align: "right" })
                        y2 += 6
                      }
                      y2 += 2
                      pdf.setDrawColor("#E5E7EB")
                      pdf.line(20, y2, w2 - 20, y2)
                      y2 += 6
                      pdf.setFont("helvetica", "bold")
                      pdf.setFontSize(12)
                      pdf.text("Grand Total", 24, y2)
                      pdf.text(formatRupiah(inv.grandTotal), w2 - 24, y2, { align: "right" })
                      y2 += 7
                      pdf.setFont("helvetica", "normal")
                      pdf.setFontSize(10)
                      pdf.text("DP", 24, y2)
                      pdf.text(formatRupiah(inv.dpAmount), w2 - 24, y2, { align: "right" })
                      y2 += 6
                      pdf.text("Sisa", 24, y2)
                      pdf.text(formatRupiah(inv.remainingAmount), w2 - 24, y2, { align: "right" })
                      y2 = 270
                      pdf.setDrawColor("#E5E7EB")
                      pdf.line(20, y2, w2 - 20, y2)
                      y2 += 6
                      pdf.setFontSize(8)
                      pdf.setTextColor("#9CA3AF")
                      pdf.text("Lovery Photography", 20, y2)
                      pdf.save(`Invoice-${inv.invoiceNumber}.pdf`)
                      toast.success("Invoice di-download")
                    } catch (e) {
                      toast.error("Gagal download PDF")
                    }
                  }}
                >
                  <Download className="h-5 w-5" /> PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {nextStatuses.length > 0 && (
            <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
              <CardHeader className="pb-0">
                <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full">Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {nextStatuses.map((status) => (
                  <Button key={status} className="w-full rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-lg h-14" variant="outline" onClick={() => handleAction(status)} disabled={updateStatus.isPending}>
                    {STATUS_ACTIONS[status] || (status === "WAITING_DP" && sub.status === "RESCHEDULE" ? "Konfirmasi Penjadwalan Ulang" : `Ubah ke ${status}`)}
                    {status === "WAITING_DP" && <MessageCircle className="ml-2 h-5 w-5" />}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        <DialogContent className="rounded-none border-8 border-black shadow-[12px_12px_0_0_#E89CC9] max-w-sm bg-white p-6">
          <DialogHeader>
            <DialogTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2">{actionDialog?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="font-accent font-bold uppercase tracking-widest text-black bg-gray-100 p-2 border-2 border-black inline-block">Anda yakin ingin melakukan aksi ini?</p>
            <Textarea placeholder="Catatan (opsional)..." className="rounded-none border-4 border-black font-accent font-bold bg-white" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Button variant="outline" className="w-full rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-lg h-12 bg-white text-black" onClick={() => setActionDialog(null)}>Batal</Button>
            <Button className="w-full rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-lovery-pink hover:bg-lovery-pink-dark text-white font-heading font-black uppercase tracking-widest text-lg h-12" onClick={confirmAction} disabled={updateStatus.isPending}>
              {updateStatus.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Konfirmasi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Catat Pembayaran */}
      <Dialog open={!!payDialog} onOpenChange={() => setPayDialog(null)}>
        <DialogContent className="rounded-none border-8 border-black shadow-[12px_12px_0_0_#E89CC9] max-w-sm bg-white p-6">
          <DialogHeader>
            <DialogTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2">Catat Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-black text-white px-2 py-1 inline-block shadow-[2px_2px_0_0_#E89CC9]">Tipe</Label>
              <Select value={payType} onValueChange={(v) => setPayType(v || "DP")}>
                <SelectTrigger className="rounded-none border-4 border-black font-heading font-black uppercase tracking-widest text-lg h-12 bg-white"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-none border-4 border-black font-heading font-black uppercase tracking-widest text-lg bg-white">
                  <SelectItem value="DP">DP</SelectItem>
                  <SelectItem value="PELUNASAN">Pelunasan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-black text-white px-2 py-1 inline-block shadow-[2px_2px_0_0_#E89CC9]">Nominal</Label>
              <Input type="number" placeholder="50000" className="rounded-none border-4 border-black font-heading font-black uppercase tracking-widest text-lg h-12 bg-white" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />
              <p className="font-accent font-bold uppercase tracking-widest mt-2 bg-gray-100 p-2 border-2 border-black inline-block text-sm">Sisa: <span className="text-lovery-pink">{payDialog ? formatRupiah(payDialog.remaining) : ""}</span></p>
            </div>
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-black text-white px-2 py-1 inline-block shadow-[2px_2px_0_0_#E89CC9]">Metode</Label>
              <Select value={payMethod} onValueChange={(v) => setPayMethod(v || "TRANSFER")}>
                <SelectTrigger className="rounded-none border-4 border-black font-heading font-black uppercase tracking-widest text-lg h-12 bg-white"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-none border-4 border-black font-heading font-black uppercase tracking-widest text-lg bg-white">
                  <SelectItem value="TRANSFER">Transfer Bank</SelectItem>
                  <SelectItem value="QRIS">QRIS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" className="w-full rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all font-heading font-black uppercase tracking-widest text-lg h-12 bg-white text-black" onClick={() => setPayDialog(null)}>Batal</Button>
            <Button className="w-full rounded-none border-4 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-lovery-pink hover:bg-lovery-pink-dark text-white font-heading font-black uppercase tracking-widest text-lg h-12" onClick={handleCreatePayment} disabled={paying || !payAmount}>
              {paying && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
