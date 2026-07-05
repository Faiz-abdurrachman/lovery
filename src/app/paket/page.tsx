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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-32 border-l-8 border-black ml-4 sm:ml-8 lg:ml-auto">
        <div className="mb-20 inline-block">
          <h1 className="text-5xl lg:text-7xl font-heading font-black text-white bg-black px-6 py-2 -skew-x-12 shadow-[8px_8px_0_0_#E89CC9]">
            DAFTAR PAKET
          </h1>
          <p className="text-black font-accent font-bold mt-4 uppercase tracking-widest bg-gray-100 p-2 border-2 border-black inline-block">
            PILIH PAKET FOTOGRAFI YANG SESUAI DENGAN KEBUTUHAN ANDA
          </p>
        </div>

        {all.length === 0 ? (
          <div className="text-center py-20 bg-gray-100 border-4 border-black shadow-[8px_8px_0_0_#111111]">
            <p className="text-2xl font-accent font-bold uppercase tracking-widest text-black">Belum ada paket tersedia.</p>
          </div>
        ) : (
          categories.map((cat) => {
            const items = all.filter((p: { category: string }) => p.category === cat)
            return (
              <div key={cat} className="mb-24">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 border-b-8 border-black pb-4">
                  <h2 className="text-4xl lg:text-5xl font-heading font-black text-black uppercase tracking-widest flex items-center gap-4">
                    <span className="text-4xl bg-lovery-pink p-2 border-4 border-black shadow-[4px_4px_0_0_#111111]">{ICON[cat] || "📸"}</span> 
                    {cat}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((pkg: { id: string; name: string; description: string | null; price: number }) => (
                    <div key={pkg.id} className="border-4 border-black bg-white p-6 md:p-8 flex flex-col group hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#111111] shadow-[8px_8px_0_0_#111111] transition-all duration-300 relative overflow-hidden">
                      {/* Decorative stripes */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-lovery-pink transform origin-bottom-left rotate-45 translate-x-8 -translate-y-8 border-l-4 border-black" />
                      
                      <div className="mb-8 relative z-10">
                        <p className="font-heading font-black text-black text-2xl lg:text-3xl uppercase tracking-tighter mb-4">{pkg.name}</p>
                        {pkg.description && (
                          <ul className="space-y-2 border-l-4 border-black pl-3 py-1">
                            {pkg.description.split(",").map((feature, idx) => {
                              const cleanFeature = feature.replace(/\.$/, "").trim();
                              if (!cleanFeature) return null;
                              return (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-lovery-pink font-black text-lg leading-none mt-0.5">»</span>
                                  <span className="text-black font-accent font-bold leading-tight uppercase text-sm tracking-wider">{cleanFeature}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                      <div className="mt-auto pt-6 border-t-4 border-black border-dashed relative z-10">
                        <p className="text-lovery-pink font-heading font-black text-4xl drop-shadow-[2px_2px_0_#111111] tracking-tighter">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(pkg.price)}
                        </p>
                        <a href={`/ajukan-sesi?pkg=${pkg.id}`} className="block mt-6 rounded-none border-4 border-black py-4 text-center text-lg font-heading font-black uppercase tracking-widest bg-black text-white hover:bg-lovery-pink hover:text-black transition-colors shadow-[4px_4px_0_0_#E89CC9] hover:shadow-[6px_6px_0_0_#111111]">
                          Pilih Paket
                        </a>
                      </div>
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
