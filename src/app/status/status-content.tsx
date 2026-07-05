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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { SubmissionStatus } from "@prisma/client"

const trackSchema = z.object({
  number: z.string().min(1, "Nomor pengajuan wajib diisi"),
})

export function StatusContent() {
  const searchParams = useSearchParams()
  const initialNumber = searchParams.get("number") || ""
  const [trackData, setTrackData] = useState({ number: initialNumber })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(trackSchema),
    defaultValues: { number: initialNumber },
  })
  const { data: submission, isLoading, isError, error, refetch } = useTrackSubmission(trackData.number)

  function onTrack(formData: { number: string }) {
    setTrackData(formData)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-20 lg:py-32">
        <div className="mb-12 inline-block">
          <h1 className="text-4xl lg:text-6xl font-heading font-black text-white bg-black px-6 py-2 -skew-x-12 shadow-[8px_8px_0_0_#E89CC9]">
            LACAK STATUS
          </h1>
          <p className="text-black font-accent font-bold mt-4 uppercase tracking-widest bg-gray-100 p-2 border-2 border-black inline-block ml-4">
            PANTAU PERJALANAN PENGAJUAN SESI ANDA
          </p>
        </div>

        <div className="border-8 border-black bg-white p-6 md:p-10 shadow-[16px_16px_0_0_#111111] mb-12 relative overflow-hidden">
          {/* Decorative manga effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lovery-pink transform origin-bottom-left rotate-45 translate-x-16 -translate-y-16 border-l-8 border-black z-0" />
          
          <form onSubmit={handleSubmit(onTrack)} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <Label htmlFor="number" className="font-heading font-black text-xl uppercase tracking-widest text-black bg-lovery-pink inline-block px-3 py-1 border-2 border-black shadow-[4px_4px_0_0_#111111]">
                Nomor Pengajuan
              </Label>
              <Input 
                id="number" 
                placeholder="LVR-0001-2026" 
                className="rounded-none border-4 border-black h-16 text-2xl font-heading font-black uppercase tracking-widest focus-visible:ring-0 focus-visible:border-lovery-pink shadow-[6px_6px_0_0_#111111]" 
                {...register("number")} 
              />
              {errors.number && <p className="text-sm font-bold font-accent text-white bg-red-600 inline-block px-2 py-1 border-2 border-black uppercase tracking-widest">{errors.number.message}</p>}
            </div>
            
            <Button type="submit" className="w-full rounded-none border-4 border-black h-16 bg-black text-white hover:bg-lovery-pink hover:text-black transition-colors font-heading font-black text-2xl uppercase tracking-widest shadow-[6px_6px_0_0_#E89CC9] hover:shadow-[8px_8px_0_0_#111111] mt-4">
              <Search className="mr-3 h-6 w-6 stroke-[3]" /> CARI PENGAJUAN
            </Button>
          </form>
        </div>

        {isLoading && (
          <div className="text-center py-16 border-4 border-black border-dashed bg-gray-50">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-black" />
            <p className="text-black font-heading font-black text-2xl uppercase tracking-widest mt-6">Mencari Data...</p>
          </div>
        )}

        {isError && (
          <div className="border-4 border-black bg-red-100 p-8 shadow-[8px_8px_0_0_#111111] text-center">
            <p className="text-red-600 font-heading font-black text-2xl uppercase tracking-widest mb-4">
              {(error as Error)?.message || "PENGAJUAN TIDAK DITEMUKAN"}
            </p>
            <Button className="rounded-none border-4 border-black bg-black text-white hover:bg-red-600 font-heading font-black uppercase tracking-widest" onClick={() => refetch()}>
              COBA LAGI
            </Button>
          </div>
        )}

        {submission && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="border-4 border-black bg-white shadow-[12px_12px_0_0_#E89CC9] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-accent font-black text-4xl opacity-10 rotate-12 pointer-events-none">RESULT</div>
              
              <div className="border-b-4 border-black p-6 bg-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-3xl font-heading font-black text-black uppercase tracking-widest">{submission.submissionNumber}</h2>
                <Badge className={cn("rounded-none border-2 border-black font-heading font-black uppercase tracking-widest text-lg px-4 py-1", SUBMISSION_STATUS_COLORS[submission.status as SubmissionStatus])}>
                  {SUBMISSION_STATUS_LABELS[submission.status as SubmissionStatus]}
                </Badge>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0_0_#111111]">
                    <p className="text-lovery-pink font-accent font-bold uppercase tracking-widest text-sm mb-1">Acara</p>
                    <p className="text-black font-heading font-black text-xl uppercase">{submission.eventName}</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0_0_#111111]">
                    <p className="text-lovery-pink font-accent font-bold uppercase tracking-widest text-sm mb-1">Paket</p>
                    <p className="text-black font-heading font-black text-xl uppercase">{submission.package?.name}</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0_0_#111111]">
                    <p className="text-lovery-pink font-accent font-bold uppercase tracking-widest text-sm mb-1">Tanggal</p>
                    <p className="text-black font-heading font-black text-xl uppercase">{submission.eventDate ? format(new Date(submission.eventDate), "dd MMM yyyy") : "-"}</p>
                  </div>
                  <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0_0_#111111]">
                    <p className="text-lovery-pink font-accent font-bold uppercase tracking-widest text-sm mb-1">Jam</p>
                    <p className="text-black font-heading font-black text-xl uppercase">{submission.eventTime}</p>
                  </div>
                </div>

                <div className="border-2 border-black p-4 bg-gray-50 shadow-[4px_4px_0_0_#111111]">
                  <p className="text-lovery-pink font-accent font-bold uppercase tracking-widest text-sm mb-1">Lokasi</p>
                  <p className="text-black font-accent font-bold uppercase">{submission.location}</p>
                </div>
              </div>
            </div>

            <div className="border-4 border-black bg-white shadow-[12px_12px_0_0_#111111]">
              <div className="border-b-4 border-black p-6 bg-black text-white">
                <h3 className="text-2xl font-heading font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="text-lovery-pink">►</span> TIMELINE AKTIVITAS
                </h3>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  {submission.timelines?.map((t: { id: string; activity: string; description?: string | null; createdAt: string }) => (
                    <div key={t.id} className="flex gap-6 relative group">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-none border-2 border-black bg-lovery-pink group-hover:scale-125 transition-transform shadow-[2px_2px_0_0_#111111] z-10" />
                        <div className="w-1 flex-1 bg-black absolute top-4 bottom-[-24px] left-[6px]" />
                      </div>
                      <div className="pb-6 w-full">
                        <p className="text-xs font-accent font-bold uppercase tracking-widest text-white bg-black inline-block px-2 py-0.5 border-2 border-black mb-2 shadow-[2px_2px_0_0_#E89CC9]">
                          {new Date(t.createdAt).toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: 'short' }).toUpperCase() + ", " + new Date(t.createdAt).toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).replace(/\./g, ':')} WIB
                        </p>
                        <p className="text-lg font-heading font-black text-black uppercase">{t.activity}</p>
                        {t.description && <p className="text-sm font-accent font-bold text-gray-600 mt-1 uppercase border-l-4 border-black pl-3">{t.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full rounded-none border-4 border-black h-16 bg-white text-black hover:bg-lovery-pink transition-colors font-heading font-black text-xl uppercase tracking-widest shadow-[8px_8px_0_0_#111111]" onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890"}`, "_blank")}>
              <ExternalLink className="mr-3 h-6 w-6 stroke-[3]" /> HUBUNGI ADMIN VIA WHATSAPP
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
