import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Package {
  id: string
  name: string
  category: string
  description?: string | null
  price: number
}

interface StepOneCategoryProps {
  packages: Package[]
  selectedId: string | undefined
  onSelect: (id: string) => void
}

const CATEGORIES = ["Graduation", "Casual", "Wedding", "Event"]

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n)
}

export function StepOneCategory({
  packages,
  selectedId,
  onSelect,
}: StepOneCategoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-black">Pilih Paket</h2>
        <p className="text-sm text-gray-500 mt-1">
          Pilih paket yang sesuai dengan kebutuhan Anda.
        </p>
      </div>

      {CATEGORIES.map((cat) => {
        const catPackages = packages.filter((p) => p.category === cat)
        if (catPackages.length === 0) return null

        return (
          <div key={cat} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {cat}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {catPackages.map((pkg) => {
                const isSelected = selectedId === pkg.id
                return (
                  <button
                    key={pkg.id}
                    onClick={() => onSelect(pkg.id)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all",
                      isSelected
                        ? "border-lovery-pink bg-lovery-pink/5"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-black">{pkg.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {pkg.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-lovery-pink flex items-center justify-center shrink-0 ml-2">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-lg font-bold text-lovery-pink mt-3">
                      {formatRupiah(pkg.price)}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {packages.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          Memuat daftar paket...
        </p>
      )}
    </div>
  )
}
