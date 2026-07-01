import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <p className="text-sm font-medium text-lovery-pink tracking-wide uppercase mb-4">
            Studio Fotografi Premium
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
            Abadikan Momen <br />
            <span className="text-lovery-pink">Spesial Anda</span>
          </h1>
          <p className="text-gray-500 mt-6 max-w-md mx-auto lg:mx-0 text-lg leading-relaxed">
            Lovery Photography hadir untuk mendokumentasikan momen berharga Anda dengan profesional, hangat, dan personal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
            <Link href="/ajukan-sesi">
              <Button className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white px-8 py-6 text-base">
                Ajukan Sesi Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#portfolio">
              <Button variant="outline" className="rounded-xl px-8 py-6 text-base">
                Lihat Portfolio
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-lovery-pink/30 to-lovery-pink/10 overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur mx-auto flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
              <p className="text-lovery-pink/60 mt-4 font-medium">
                Foto berbicara lebih dari seribu kata
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl bg-lovery-pink/10 -z-10" />
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-lovery-pink/5 -z-10" />
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-64 h-64 bg-lovery-pink/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-lovery-pink/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl -z-10" />
    </section>
  )
}
