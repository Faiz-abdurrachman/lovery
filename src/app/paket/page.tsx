import { supabase } from "@/lib/supabase"

const ICON: Record<string, string> = { Graduation: "🎓", Wedding: "💍", Casual: "📷", Event: "🎉" }

export const dynamic = "force-dynamic"

export default async function PaketPage() {
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("isActive", true)
    .order("category", { ascending: true })

  const all = packages || []
  const categories = [...new Set(all.map((p: { category: string }) => p.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black">Daftar Paket</h1>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">Pilih paket fotografi yang sesuai dengan kebutuhan Anda.</p>
        </div>

        {all.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Belum ada paket tersedia.</p>
          </div>
        ) : (
          categories.map((cat) => {
            const items = all.filter((p: { category: string }) => p.category === cat)
            return (
              <div key={cat} className="mb-10">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <span>{ICON[cat] || "📸"}</span> {cat}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((pkg: { id: string; name: string; description: string | null; price: number }) => (
                    <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="font-semibold text-black text-lg">{pkg.name}</p>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-3">{pkg.description}</p>
                      <p className="text-lovery-pink font-bold text-xl mt-4">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(pkg.price)}
                      </p>
                      <a href={`/ajukan-sesi?pkg=${pkg.id}`} className="mt-4 rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white px-4 py-2 text-sm font-medium inline-flex items-center gap-2">
                        Pilih
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
