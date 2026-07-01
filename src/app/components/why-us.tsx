const REASONS = [
  { title: "Profesional", desc: "Fotografer berpengalaman yang memahami setiap momen penting Anda.", icon: "🎯" },
  { title: "Personal", desc: "Pendekatan hangat dan personal — Anda bukan sekadar klien.", icon: "💝" },
  { title: "Hasil Berkualitas", desc: "Editing profesional dengan sentuhan estetika yang timeless.", icon: "✨" },
  { title: "Proses Mudah", desc: "Pengajuan sesi cukup 3 menit. Komunikasi via WhatsApp.", icon: "⚡" },
  { title: "Transparan", desc: "Harga jelas tanpa biaya tersembunyi. Status selalu bisa dilacak.", icon: "🔍" },
  { title: "Tepat Waktu", desc: "Kami menghargai waktu Anda. Hasil selalu sesuai timeline.", icon: "⏰" },
]

export function WhyUs() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-lovery-pink uppercase tracking-wide">Mengapa Lovery</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-black mt-3">Alasan Memilih Kami</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map(({ title, desc, icon }) => (
            <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:border-lovery-pink/30 transition-colors">
              <p className="text-3xl mb-3">{icon}</p>
              <h3 className="font-semibold text-black text-lg">{title}</h3>
              <p className="text-gray-500 text-sm mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
