import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const ICONS: Record<string, string> = {
  Graduation: "🎓", Wedding: "💍", Casual: "📷", Event: "🎉",
}

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

interface Pkg { id: string; name: string; category: string; description: string | null; price: number }

export function Services({ packages }: { packages: Pkg[] }) {
  const cats = [...new Set(packages.map((p) => p.category))]

  return (
    <section id="layanan" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-lovery-pink uppercase tracking-wide">Layanan</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-black mt-3">Paket Fotografi</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">Pilih paket yang sesuai dengan kebutuhan Anda.</p>
        </div>

        {packages.length === 0
          ? <div className="text-center py-16 text-gray-400"><p className="text-lg">Belum ada paket tersedia.</p></div>
          : cats.map((cat) => (
              <div key={cat} className="mb-10">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <span>{ICONS[cat] || "📸"}</span> {cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packages.filter((p) => p.category === cat).map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="font-semibold text-black text-lg">{pkg.name}</p>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{pkg.description}</p>
                      <p className="text-lovery-pink font-bold text-xl mt-4">{fmt(pkg.price)}</p>
                      <Link href={`/ajukan-sesi?pkg=${pkg.id}`}>
                        <Button variant="outline" className="w-full mt-4 rounded-xl">Pilih Paket <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
        }
      </div>
    </section>
  )
}
