"use client"

import React, { useState } from "react"
import { useFormContext, Controller } from "react-hook-form"
import type { SubmissionFormData } from "@/features/submission/schemas/submission.schema"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

interface StepFiveFinalProps {
  selectedPackage: { name: string; price: number; category: string } | undefined
  selectedAddOns: { id: string; name: string; price: number }[]
  totalPrice: number
  dpAmount: number
}

export function StepFiveFinal({ selectedPackage, selectedAddOns, totalPrice, dpAmount }: StepFiveFinalProps) {
  const { register, control, formState: { errors } } = useFormContext<SubmissionFormData>()
  const [showSK, setShowSK] = useState(false)

  return (
    <React.Fragment>
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-heading font-black text-black uppercase tracking-widest border-b-4 border-black pb-4 inline-block">Konfirmasi Pengajuan</h2>
        <br />
        <p className="text-xs sm:text-sm font-bold font-accent uppercase tracking-widest text-black mt-4 bg-lovery-pink inline-block px-2 py-1 border-2 border-black">Periksa kembali ringkasan pengajuan Anda sebelum dikirim.</p>
      </div>

      <div className="bg-gray-100 border-4 border-black shadow-[8px_8px_0_0_#111111] p-6 space-y-4 relative overflow-hidden">
        {/* Tape decor */}
        <div className="absolute -top-4 -right-4 w-16 h-8 bg-lovery-pink transform rotate-45 border-y-2 border-black z-10" />

        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="text-black font-bold font-accent uppercase tracking-widest">Paket</span>
          <span className="font-black text-black bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111]">{selectedPackage?.name || "-"}</span>
        </div>
        
        {selectedAddOns.length > 0 && (
          <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_#111111] mt-4">
            <p className="text-[10px] sm:text-xs text-white bg-black px-2 py-1 font-bold font-accent uppercase tracking-widest inline-block mb-3">ADD-ON</p>
            {selectedAddOns.map((a) => (
              <div key={a.id} className="flex justify-between text-sm mb-2 last:mb-0">
                <span className="text-black font-bold uppercase tracking-wider">{a.name}</span>
                <span className="text-black font-accent font-black">{formatRupiah(a.price)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="border-t-4 border-black border-dashed my-4" />
        
        <div className="flex justify-between items-center bg-black p-4 border-4 border-black shadow-[4px_4px_0_0_#E89CC9] -skew-x-2">
          <span className="font-black text-white font-accent uppercase tracking-widest text-base sm:text-lg">Total</span>
          <span className="font-black text-lovery-pink text-xl sm:text-2xl font-accent">{formatRupiah(totalPrice)}</span>
        </div>

        <div className="flex justify-between items-center text-sm bg-lovery-pink p-3 border-4 border-black shadow-[4px_4px_0_0_#111111] mt-4">
          <span className="text-black font-bold font-accent uppercase tracking-widest">Estimasi DP</span>
          <span className="font-black text-black text-lg font-accent">{formatRupiah(dpAmount)}</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-lg font-black font-heading text-black uppercase tracking-widest border-l-8 border-lovery-pink pl-3">Publikasi Hasil Foto</p>
          <Controller
            name="allowPublish"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-3">
                <label className={`flex items-start gap-4 p-4 border-4 border-black cursor-pointer transition-all ${field.value === true ? 'bg-lovery-pink shadow-[6px_6px_0_0_#111111]' : 'bg-white hover:bg-gray-50'}`}>
                  <input type="radio" name="allowPublish" checked={field.value === true} onChange={() => field.onChange(true)} className="mt-1 w-5 h-5 accent-black cursor-pointer shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider leading-relaxed">Saya mengizinkan Lovery Photography mempublikasikan hasil foto pada portfolio dan media sosial.</span>
                </label>
                <label className={`flex items-start gap-4 p-4 border-4 border-black cursor-pointer transition-all ${field.value === false ? 'bg-gray-300 shadow-[6px_6px_0_0_#111111]' : 'bg-white hover:bg-gray-50'}`}>
                  <input type="radio" name="allowPublish" checked={field.value === false} onChange={() => field.onChange(false)} className="mt-1 w-5 h-5 accent-black cursor-pointer shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider leading-relaxed">Saya tidak mengizinkan publikasi hasil foto.</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="pt-4">
          <Controller
            name="agreedTerms"
            control={control}
            render={({ field }) => (
              <label className="flex items-start gap-4 p-4 bg-white border-4 border-black shadow-[8px_8px_0_0_#111111] cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-1 w-6 h-6 accent-lovery-pink cursor-pointer shrink-0"
                />
                <span className="flex-1">
                  <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider leading-relaxed">
                    Saya telah membaca dan menyetujui{" "}
                    <button type="button" onClick={() => setShowSK(true)} className="text-white bg-black px-2 py-1 mx-1 underline decoration-lovery-pink decoration-4 underline-offset-4 cursor-pointer hover:bg-lovery-pink hover:text-black transition-colors mt-2 sm:mt-0 inline-block">
                      Syarat & Ketentuan
                    </button>{" "}
                    Lovery Photography.
                  </span>
                  {errors.agreedTerms && <div className="block"><p className="text-[10px] sm:text-xs font-black text-white bg-red-600 px-2 py-1 uppercase mt-3 inline-block shadow-[2px_2px_0_0_#111111]">{String(errors.agreedTerms?.message)}</p></div>}
                </span>
              </label>
            )}
          />
        </div>
      </div>
    </div>

      <Dialog open={showSK} onOpenChange={setShowSK}>
        <DialogContent className="bg-white border-4 border-black shadow-[12px_12px_0_0_#E89CC9] sm:rounded-none max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 font-heading font-black text-2xl uppercase tracking-tighter text-black">
              <FileText className="h-6 w-6 text-lovery-pink" /> SYARAT & KETENTUAN
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-black">1. Pengajuan Sesi</h3>
              <p className="mt-1">Pengajuan sesi tidak menjamin ketersediaan jadwal. Admin akan melakukan peninjauan dan konfirmasi melalui WhatsApp.</p>
            </div>
            <div>
              <h3 className="font-semibold text-black">2. Pembayaran</h3>
              <p className="mt-1">DP wajib dibayarkan untuk mengamankan jadwal. Pelunasan maksimal H-1 sebelum sesi. Pembayaran dilakukan melalui transfer bank atau QRIS.</p>
            </div>
            <div>
              <h3 className="font-semibold text-black">3. Pembatalan</h3>
              <p className="mt-1">Pembatalan setelah DP dibayarkan akan mengikuti kebijakan refund Lovery Photography. Hubungi admin melalui WhatsApp untuk detail.</p>
            </div>
            <div>
              <h3 className="font-semibold text-black">4. Hasil Foto</h3>
              <p className="mt-1">Hasil foto dikirim melalui Google Drive. Link aktif selama 14 hari untuk paket reguler dan 30 hari untuk paket premium.</p>
            </div>
            <div>
              <h3 className="font-semibold text-black">5. Biaya Transportasi</h3>
              <p className="mt-1">Untuk area dalam kota dan kampus, transportasi gratis. Untuk area luar kota (contoh: Gunungkidul, Kulon Progo, Bantul ujung) akan dikenakan biaya transportasi yang akan didiskusikan dengan admin.</p>
            </div>
            <div>
              <h3 className="font-semibold text-black">6. Publikasi</h3>
              <p className="mt-1">Dengan menyetujui publikasi, Anda mengizinkan Lovery Photography menggunakan hasil foto untuk portfolio dan media sosial.</p>
            </div>
          </div>
          <Button className="w-full rounded-none bg-black hover:bg-lovery-pink text-white hover:text-black border-2 border-transparent hover:border-black font-accent font-bold uppercase tracking-widest mt-6 transition-colors shadow-[4px_4px_0_0_#111111]" onClick={() => setShowSK(false)}>
            Mengerti & Tutup
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
