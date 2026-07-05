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
    <GlassCard intensity="heavy" className="sticky top-6 border border-white/50 p-6 rounded-none border-t-8 border-t-black shadow-2xl">
      <div className="pb-4 border-b-2 border-black/10 mb-4">
        <h3 className="font-heading font-black text-xl uppercase tracking-widest text-black">Ringkasan Harga</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Paket</span>
          <span className="font-bold text-black font-accent text-base">
            {selectedPackage ? formatRupiah(selectedPackage.price) : "-"}
          </span>
        </div>

        {selectedAddOns.length > 0 && (
          <div className="space-y-2 bg-black/5 p-3 border-l-4 border-lovery-pink">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Add-On</p>
            {selectedAddOns.map((a) => (
              <div key={a.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{a.name}</span>
                <span className="text-gray-700 font-accent font-bold">{formatRupiah(a.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-black/10">
              <span className="text-gray-500 font-medium">Total Add-On</span>
              <span className="text-gray-700 font-accent font-bold">
                {formatRupiah(totalAddOnPrice)}
              </span>
            </div>
          </div>
        )}

        <div className="border-t-2 border-black border-dashed my-6" />

        <div className="flex justify-between items-end">
          <span className="font-bold text-black uppercase tracking-wider text-sm">Total</span>
          <span className="font-black text-lovery-pink text-3xl font-accent tracking-tighter drop-shadow-sm">
            {totalPrice > 0 ? formatRupiah(totalPrice) : "-"}
          </span>
        </div>

        <div className="flex justify-between text-sm bg-black text-white p-4 mt-4 shadow-[4px_4px_0_0_#E89CC9]">
          <span className="font-medium tracking-wide">Estimasi DP</span>
          <span className="font-bold font-accent text-lovery-pink text-lg">
            {dpAmount > 0 ? formatRupiah(dpAmount) : "-"}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-4 leading-relaxed bg-white/50 p-3 border border-white">
          * DP minimum ditentukan berdasarkan paket & add-on. Pembayaran instruksi akan diberikan via WhatsApp setelah pengajuan.
        </p>
      </div>
    </GlassCard>
  )
}
