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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-black">Konfirmasi Pengajuan</h2>
        <p className="text-sm text-gray-500 mt-1">Periksa kembali ringkasan pengajuan Anda sebelum dikirim.</p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Paket</span>
          <span className="font-medium text-black">{selectedPackage?.name || "-"}</span>
        </div>
        {selectedAddOns.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Add-On</p>
            {selectedAddOns.map((a) => (
              <div key={a.id} className="flex justify-between text-sm ml-2">
                <span className="text-gray-600">{a.name}</span>
                <span className="text-gray-600">{formatRupiah(a.price)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-medium text-black">Total</span>
          <span className="font-bold text-lovery-pink">{formatRupiah(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimasi DP</span>
          <span className="font-medium text-black">{formatRupiah(dpAmount)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-black">Publikasi Hasil Foto</p>
          <Controller
            name="allowPublish"
            control={control}
            render={({ field }) => (
              <>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="allowPublish" checked={field.value === true} onChange={() => field.onChange(true)} className="mt-1 accent-lovery-pink" />
                  <span className="text-sm text-gray-600">Saya mengizinkan Lovery Photography mempublikasikan hasil foto pada portfolio dan media sosial.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="allowPublish" checked={field.value === false} onChange={() => field.onChange(false)} className="mt-1 accent-lovery-pink" />
                  <span className="text-sm text-gray-600">Saya tidak mengizinkan publikasi hasil foto.</span>
                </label>
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Controller
            name="agreedTerms"
            control={control}
            render={({ field }) => (
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-1 accent-lovery-pink"
                />
                <span>
                  <span className="text-sm text-gray-600">
                    Saya telah membaca dan menyetujui{" "}
                    <button type="button" onClick={() => setShowSK(true)} className="text-lovery-pink underline font-medium cursor-pointer">
                      Syarat & Ketentuan
                    </button>{" "}
                    Lovery Photography.
                  </span>
                  {errors.agreedTerms && <p className="text-xs text-error mt-1">{String(errors.agreedTerms?.message)}</p>}
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
