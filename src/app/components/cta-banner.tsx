import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-lovery-pink-dark to-lovery-pink rounded-3xl p-10 lg:p-16 text-white">
          <h2 className="text-2xl lg:text-3xl font-bold text-black">
            Siap Mengabadikan Momen Anda?
          </h2>
          <p className="text-black/70 mt-4 max-w-md mx-auto">
            Ajukan sesi sekarang dan biarkan kami mengabadikan cerita Anda dengan profesional dan penuh perhatian.
          </p>
          <Link href="/ajukan-sesi">
            <Button className="mt-8 rounded-xl bg-black text-white hover:bg-black/80 px-8 py-6 text-base font-semibold">
              Ajukan Sesi Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
