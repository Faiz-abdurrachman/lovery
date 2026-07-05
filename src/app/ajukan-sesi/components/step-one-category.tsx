import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Package { id: string; name: string; category: string; description?: string | null; price: number }

interface StepOneCategoryProps {
  packages: Package[]
  selectedId: string | undefined
  onSelect: (id: string) => void
}

const CATEGORIES = ["Graduation", "Casual", "Wedding", "Event"]

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

export function StepOneCategory({ packages, selectedId, onSelect }: StepOneCategoryProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-heading font-black text-black uppercase tracking-widest border-b-4 border-black pb-4 inline-block">PILIH PAKET</h2>
      </div>

      {CATEGORIES.map((cat) => {
        const catPackages = packages.filter((p) => p.category === cat)
        if (catPackages.length === 0) return null

        return (
          <div key={cat} className="space-y-4">
            <h3 className="text-2xl font-heading font-black text-white bg-black inline-block px-4 py-1 skew-x-[-10deg] uppercase tracking-widest shadow-[4px_4px_0_0_#E89CC9] mb-2">
              {cat}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {catPackages.map((pkg) => {
                const isSelected = selectedId === pkg.id
                return (
                  <button
                    key={pkg.id}
                    onClick={() => onSelect(pkg.id)}
                    className={cn(
                      "text-left p-6 relative transition-all duration-300 group border-4 border-black hover:-translate-y-1",
                      isSelected
                        ? "bg-lovery-pink shadow-[6px_6px_0_0_#111111]"
                        : "bg-white shadow-[4px_4px_0_0_#111111] hover:shadow-[8px_8px_0_0_#111111]"
                    )}
                  >
                    <div className="flex items-start justify-between relative z-10">
                      <div>
                        <p className="font-heading font-black text-xl uppercase tracking-tighter text-black">{pkg.name}</p>
                        
                        {pkg.description && (
                          <ul className="space-y-1 mt-3 border-l-4 border-black pl-3 py-1">
                            {pkg.description.split(",").map((feature, idx) => {
                              const cleanFeature = feature.replace(/\.$/, "").trim();
                              if (!cleanFeature) return null;
                              return (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className={cn("font-black text-sm leading-none mt-0.5", isSelected ? "text-white drop-shadow-[1px_1px_0_#111111]" : "text-lovery-pink")}>»</span>
                                  <span className="text-black font-accent font-bold leading-tight uppercase text-xs tracking-wider">{cleanFeature}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-8 h-8 rounded-none border-2 border-black bg-white flex items-center justify-center shrink-0 ml-2 shadow-[2px_2px_0_0_#111111]">
                          <Check className="h-5 w-5 text-black stroke-[4]" />
                        </div>
                      )}
                    </div>
                    <p className={cn("text-3xl font-heading font-black mt-6 tracking-tighter border-t-2 border-black pt-4 border-dashed", isSelected ? "text-white drop-shadow-[2px_2px_0_#111111]" : "text-lovery-pink drop-shadow-[2px_2px_0_#111111]")}>
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
        <p className="text-gray-400 text-center py-8 font-accent tracking-widest uppercase">
          Memuat daftar paket...
        </p>
      )}
    </div>
  )
}
