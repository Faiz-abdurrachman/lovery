"use client"

import { useFormContext, Controller } from "react-hook-form"
import type { SubmissionFormData } from "@/features/submission/schemas/submission.schema"

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

  return (
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
                    <a href="/syarat-ketentuan" className="text-lovery-pink underline" target="_blank" rel="noopener noreferrer">Syarat & Ketentuan</a>{" "}
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
  )
}
