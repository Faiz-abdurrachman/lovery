import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface AddOn {
  id: string
  name: string
  price: number
  description?: string | null
}

interface StepTwoAddOnsProps {
  addOns: AddOn[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n)
}

export function StepTwoAddOns({
  addOns,
  selectedIds,
  onToggle,
}: StepTwoAddOnsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-black">Add-On <span className="text-sm font-normal text-gray-400">(Opsional)</span></h2>
        <p className="text-sm text-gray-500 mt-1">
          Tambahkan layanan ekstra sesuai kebutuhan. Jika tidak ada yang dipilih, langsung klik <strong>Selanjutnya</strong>.
        </p>
      </div>

      <div className="space-y-3">
        {addOns.map((addon) => {
          const isSelected = selectedIds.includes(addon.id)
          return (
            <button
              key={addon.id}
              onClick={() => onToggle(addon.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                isSelected
                  ? "border-lovery-pink bg-lovery-pink/5"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                  isSelected
                    ? "bg-lovery-pink border-lovery-pink"
                    : "border-gray-300"
                )}
              >
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-black">{addon.name}</p>
                {addon.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {addon.description}
                  </p>
                )}
              </div>
              <p className="font-semibold text-lovery-pink text-sm">
                +{formatRupiah(addon.price)}
              </p>
            </button>
          )
        })}
      </div>

      {addOns.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          Memuat daftar add-on...
        </p>
      )}

      {addOns.length > 0 && selectedIds.length === 0 && (
        <p className="text-center text-sm text-gray-400 mt-6">
          Tidak ada add-on yang dipilih. Klik <strong>Selanjutnya</strong> untuk melanjutkan.
        </p>
      )}
    </div>
  )
}
