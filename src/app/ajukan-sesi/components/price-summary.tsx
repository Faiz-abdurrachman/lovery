import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n)
}

interface PriceSummaryProps {
  selectedPackage: { name: string; price: number; category: string } | undefined
  selectedAddOns: { id: string; name: string; price: number }[]
  totalAddOnPrice: number
  totalPrice: number
  dpAmount: number
}

export function PriceSummary({
  selectedPackage,
  selectedAddOns,
  totalAddOnPrice,
  totalPrice,
  dpAmount,
}: PriceSummaryProps) {
  return (
    <Card className="border-0 shadow-sm sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Ringkasan Harga</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Paket</span>
          <span className="font-medium text-black">
            {selectedPackage ? formatRupiah(selectedPackage.price) : "-"}
          </span>
        </div>

        {selectedAddOns.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Add-On</p>
            {selectedAddOns.map((a) => (
              <div key={a.id} className="flex justify-between text-sm pl-2">
                <span className="text-gray-600">{a.name}</span>
                <span className="text-gray-600">{formatRupiah(a.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pl-2 pt-1">
              <span className="text-gray-400">Total Add-On</span>
              <span className="text-gray-600">
                {formatRupiah(totalAddOnPrice)}
              </span>
            </div>
          </div>
        )}

        <Separator />

        <div className="flex justify-between">
          <span className="font-semibold text-black">Total</span>
          <span className="font-bold text-lovery-pink text-lg">
            {totalPrice > 0 ? formatRupiah(totalPrice) : "-"}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Estimasi DP</span>
          <span className="font-medium text-black">
            {dpAmount > 0 ? formatRupiah(dpAmount) : "-"}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          * DP minimum ditentukan berdasarkan paket dan add-on yang dipilih. Pembayaran dilakukan setelah admin menerima pengajuan.
        </p>
      </CardContent>
    </Card>
  )
}
