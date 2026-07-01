import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

const ICON: Record<string, string> = { Graduation: "🎓", Wedding: "💍", Casual: "📷", Event: "🎉" }

export default async function PaketPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  })
  const categories = [...new Set(packages.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black">Daftar Paket</h1>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">Pilih paket fotografi yang sesuai dengan kebutuhan Anda.</p>
        </div>

        {categories.map((cat) => {
          const items = packages.filter((p) => p.category === cat)
          return (
            <div key={cat} className="mb-10">
              <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <span>{ICON[cat] || "📸"}</span> {cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <p className="font-semibold text-black text-lg">{pkg.name}</p>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">{pkg.description}</p>
                    <p className="text-lovery-pink font-bold text-xl mt-4">{formatRupiah(pkg.price)}</p>
                    <Link href={`/ajukan-sesi?pkg=${pkg.id}`}>
                      <Button className="w-full mt-4 rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white">
                        Pilih <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
