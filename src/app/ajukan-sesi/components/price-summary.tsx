import { GlassCard } from "@/app/components/glass-card"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

interface PriceSummaryProps {
  selectedPackage: { name: string; price: number; category: string } | undefined
  selectedAddOns: { id: string; name: string; price: number }[]
  totalAddOnPrice: number
  totalPrice: number
  dpAmount: number
}

export function PriceSummary({ selectedPackage, selectedAddOns, totalAddOnPrice, totalPrice, dpAmount }: PriceSummaryProps) {
  return (
    <div className="sticky top-6 border-4 border-black bg-white shadow-[8px_8px_0_0_#111111] lg:shadow-[12px_12px_0_0_#111111] p-6 lg:p-8 rounded-none relative overflow-hidden">
      {/* Tape decor */}
      <div className="absolute top-0 right-0 w-16 h-4 bg-lovery-pink transform rotate-45 translate-x-4 -translate-y-2 border-y-2 border-black z-10" />

      <div className="pb-4 border-b-4 border-black mb-6">
        <h3 className="font-heading font-black text-2xl lg:text-3xl uppercase tracking-widest text-black bg-lovery-pink inline-block px-3 py-1 border-2 border-black shadow-[4px_4px_0_0_#111111]">
          Ringkasan
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between text-base items-end">
          <span className="text-black font-bold font-accent uppercase tracking-widest">Paket</span>
          <span className="font-black text-black font-accent text-xl bg-gray-100 border-2 border-black px-2 py-1">
            {selectedPackage ? formatRupiah(selectedPackage.price) : "-"}
          </span>
        </div>

        {selectedAddOns.length > 0 && (
          <div className="space-y-3 bg-gray-100 p-4 border-4 border-black shadow-[4px_4px_0_0_#111111]">
            <p className="text-xs text-white bg-black px-2 py-1 font-bold font-accent uppercase tracking-widest inline-block mb-2">ADD-ON</p>
            {selectedAddOns.map((a) => (
              <div key={a.id} className="flex justify-between text-sm">
                <span className="text-black font-bold uppercase tracking-wider">{a.name}</span>
                <span className="text-black font-accent font-black">{formatRupiah(a.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-3 border-t-4 border-black mt-2">
              <span className="text-black font-bold uppercase tracking-wider">Total Add-On</span>
              <span className="text-black font-accent font-black">
                {formatRupiah(totalAddOnPrice)}
              </span>
            </div>
          </div>
        )}

        <div className="border-t-4 border-black border-dashed my-6" />

        <div className="flex justify-between items-end">
          <span className="font-black text-black font-accent uppercase tracking-widest text-lg">Total</span>
          <span className="font-black text-black text-2xl sm:text-3xl font-accent bg-lovery-pink border-4 border-black px-2 py-1 sm:px-3 shadow-[4px_4px_0_0_#111111]">
            {totalPrice > 0 ? formatRupiah(totalPrice) : "-"}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm bg-black text-white p-4 border-4 border-black shadow-[6px_6px_0_0_#E89CC9] mt-6 -skew-x-2">
          <span className="font-black font-accent uppercase tracking-widest text-xs sm:text-sm">Estimasi DP</span>
          <span className="font-black font-accent text-lovery-pink text-xl sm:text-2xl">
            {dpAmount > 0 ? formatRupiah(dpAmount) : "-"}
          </span>
        </div>

        <div className="bg-lovery-pink/20 border-l-4 border-black p-3 mt-6">
          <p className="text-[10px] sm:text-xs text-black font-bold uppercase tracking-widest leading-relaxed font-accent">
            * DP minimum ditentukan berdasarkan paket & add-on. Pembayaran instruksi akan diberikan via WhatsApp setelah pengajuan.
          </p>
        </div>
      </div>
    </div>
  )
}
