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
import { Loader2, ArrowLeft, Clock, User, MapPin, Package, MessageCircle, ExternalLink, HardDrive } from "lucide-react"
import { toast } from "sonner"
import { openWhatsApp, WhatsAppTemplates } from "@/features/whatsapp/utils/whatsapp"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"
import type { SubmissionStatus } from "@prisma/client"
import { useState } from "react"
import Link from "next/link"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(n)
}

const STATUS_ACTIONS: Record<string, string> = {
  WAITING_DP: "Terima Pengajuan",
  REJECTED: "Tolak Pengajuan",
  RESCHEDULE: "Minta Penjadwalan Ulang",
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Pengajuan tidak ditemukan.</p>
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
      await updateStatus.mutateAsync({
        id: sub.id,
        status: actionDialog.status as SubmissionStatus,
        adminNote: adminNote || undefined,
      })
      setActionDialog(null)
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal mengubah status")
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
    (sum: number, s) => sum + (s.addOn?.price || 0), 0
  ) || 0

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/admin/pengajuan" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-2">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">{sub.submissionNumber}</h1>
          <Badge className={cn("rounded-full", SUBMISSION_STATUS_COLORS[sub.status as SubmissionStatus])}>
            {SUBMISSION_STATUS_LABELS[sub.status as SubmissionStatus]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" /> Info Klien
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Nama</span><span className="text-black font-medium">{sub.client?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">WhatsApp</span><span className="text-black">{sub.client?.phone}</span></div>
              {sub.client?.instagram && <div className="flex justify-between"><span className="text-gray-500">Instagram</span><span className="text-black">@{sub.client.instagram}</span></div>}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Detail Sesi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Acara</span><span className="text-black font-medium">{sub.eventName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tanggal</span><span className="text-black">{format(new Date(sub.eventDate), "EEEE, dd MMMM yyyy", { locale: idLocale })}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Jam</span><span className="text-black">{sub.eventTime}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Lokasi</span><span className="text-black">{sub.location}</span></div>
              {sub.specialRequest && <div><span className="text-gray-500 block mb-1">Request Khusus</span><p className="text-black bg-gray-50 p-3 rounded-xl">{sub.specialRequest}</p></div>}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" /> Paket & Add-On
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{sub.package?.name}</span>
                <span className="font-medium">{formatRupiah(sub.package?.price || 0)}</span>
              </div>
              {sub.submissionAddOns?.map((s) => (
                <div key={s.addonId} className="flex justify-between text-sm ml-2">
                  <span className="text-gray-500">{s.addOn?.name}</span>
                  <span className="text-gray-500">{formatRupiah(s.addOn?.price || 0)}</span>
                </div>
              ))}
              {sub.submissionAddOns?.length > 0 && (
                <>
                  <Separator />
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span className="text-lovery-pink">{formatRupiah((sub.package?.price || 0) + totalAddOnPrice)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" /> Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sub.timelines?.map((t) => (
                  <div key={t.id} className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-lovery-pink mt-1.5" />
                      <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                    </div>
                    <div className="pb-3">
                      <p className="text-xs text-gray-400">{format(new Date(t.createdAt), "dd MMM, HH:mm", { locale: idLocale })}</p>
                      <p className="text-sm font-medium text-black">{t.activity}</p>
                      {t.description && <p className="text-xs text-gray-500">{t.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {["EDITING", "DELIVERED", "COMPLETED"].includes(sub.status) && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <HardDrive className="h-4 w-4" /> Google Drive
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sub.googleDriveLink && (
                  <a
                    href={sub.googleDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-info hover:underline break-all"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    {sub.googleDriveLink}
                  </a>
                )}
                {sub.status !== "COMPLETED" && (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Tempel link Google Drive..."
                        className="rounded-xl text-sm"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl"
                        onClick={() => handleSaveDrive(false)}
                        disabled={savingDrive || !driveLink}
                      >
                        {savingDrive ? (
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        ) : null}
                        Simpan Link
                      </Button>
                      {sub.status === "EDITING" && (
                        <Button
                          className="flex-1 rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white"
                          onClick={() => handleSaveDrive(true)}
                          disabled={savingDrive || !driveLink}
                        >
                          <MessageCircle className="mr-1 h-3 w-3" />
                          Simpan & Kirim
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {nextStatuses.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {nextStatuses.map((status) => (
                  <Button key={status} className="w-full rounded-xl" variant="outline" onClick={() => handleAction(status)} disabled={updateStatus.isPending}>
                    {STATUS_ACTIONS[status] || `Ubah ke ${status}`}
                    {status === "WAITING_DP" && <MessageCircle className="ml-2 h-4 w-4" />}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>{actionDialog?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-gray-500">Anda yakin ingin melakukan aksi ini?</p>
            <Textarea placeholder="Catatan (opsional)..." className="rounded-xl" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={2} />
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setActionDialog(null)}>Batal</Button>
            <Button className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white" onClick={confirmAction} disabled={updateStatus.isPending}>
              {updateStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
