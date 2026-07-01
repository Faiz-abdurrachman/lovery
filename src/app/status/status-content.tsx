"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSearchParams } from "next/navigation"
import { useTrackSubmission } from "@/features/submission/hooks/use-submission"
import {
  SUBMISSION_STATUS_LABELS,
  SUBMISSION_STATUS_COLORS,
} from "@/features/submission/constants/submission.constant"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Search, ExternalLink, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { SubmissionStatus } from "@prisma/client"

const trackSchema = z.object({
  number: z.string().min(1, "Nomor pengajuan wajib diisi"),
  phone: z.string().min(1, "Nomor WhatsApp wajib diisi"),
})


export function StatusContent() {
  const searchParams = useSearchParams()
  const initialNumber = searchParams.get("number") || ""
  const [trackData, setTrackData] = useState({ number: initialNumber, phone: "" })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(trackSchema),
    defaultValues: { number: initialNumber, phone: "" },
  })
  const { data: submission, isLoading, isError, error, refetch } = useTrackSubmission(trackData.number, trackData.phone)

  function onTrack(formData: { number: string; phone: string }) {
    setTrackData(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lovery-pink/20 mb-4">
            <Camera className="h-6 w-6 text-lovery-pink" />
          </div>
          <h1 className="text-2xl font-bold text-black">Status Pengajuan</h1>
          <p className="text-gray-500 mt-2">Lacak status pengajuan sesi Anda.</p>
        </div>
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onTrack)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="number">Nomor Pengajuan</Label>
                <Input id="number" placeholder="LVR-0001-2026" className="rounded-xl" {...register("number")} />
                {errors.number && <p className="text-xs text-error">{errors.number.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor WhatsApp</Label>
                <Input id="phone" placeholder="08123456789" className="rounded-xl" {...register("phone")} />
                {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
              </div>
              <Button type="submit" className="w-full rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white">
                <Search className="mr-2 h-4 w-4" /> Lacak Status
              </Button>
            </form>
          </CardContent>
        </Card>
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-lovery-pink" />
            <p className="text-gray-500 mt-4">Mencari pengajuan...</p>
          </div>
        )}
        {isError && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-error text-sm">{(error as Error)?.message || "Pengajuan tidak ditemukan"}</p>
              <Button variant="outline" className="mt-3 rounded-xl" onClick={() => refetch()}>Coba Lagi</Button>
            </CardContent>
          </Card>
        )}
        {submission && (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{submission.submissionNumber}</CardTitle>
                  <Badge className={cn("rounded-full", SUBMISSION_STATUS_COLORS[submission.status as SubmissionStatus])}>
                    {SUBMISSION_STATUS_LABELS[submission.status as SubmissionStatus]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><p className="text-gray-400 text-xs">Acara</p><p className="text-black font-medium">{submission.eventName}</p></div>
                  <div><p className="text-gray-400 text-xs">Paket</p><p className="text-black font-medium">{submission.package?.name}</p></div>
                  <div><p className="text-gray-400 text-xs">Tanggal</p><p className="text-black font-medium">{submission.eventDate ? format(new Date(submission.eventDate), "dd MMM yyyy") : "-"}</p></div>
                  <div><p className="text-gray-400 text-xs">Jam</p><p className="text-black font-medium">{submission.eventTime}</p></div>
                </div>
                <Separator />
                <div><p className="text-gray-400 text-xs mb-2">Lokasi</p><p className="text-black text-sm">{submission.location}</p></div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3"><CardTitle className="text-base">Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submission.timelines?.map((t: { id: string; activity: string; description?: string | null; createdAt: string }) => (
                    <div key={t.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-lovery-pink mt-2" /><div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-gray-400">{format(new Date(t.createdAt), "dd MMM, HH:mm")}</p>
                        <p className="text-sm font-medium text-black mt-0.5">{t.activity}</p>
                        {t.description && <p className="text-xs text-gray-500">{t.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full rounded-xl" onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890"}`, "_blank")}>
              <ExternalLink className="mr-2 h-4 w-4" /> Hubungi Admin via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
