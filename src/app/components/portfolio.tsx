const categories = ["Graduation", "Wedding", "Casual", "Event"]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-lovery-pink uppercase tracking-wide">Portfolio</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-black mt-3">Karya Terbaik Kami</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Setiap momen memiliki cerita. Kami mengabadikannya dengan penuh perhatian dan ketulusan.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat}
              className="aspect-[4/5] rounded-2xl bg-gradient-to-b from-lovery-pink/20 to-lovery-pink/5 flex items-end p-4 hover:scale-[1.02] transition-transform"
            >
              <div className="bg-white/90 backdrop-blur rounded-xl px-3 py-2 w-full text-center">
                <p className="text-sm font-semibold text-black">{cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
