import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-lovery-pink/20 flex items-center justify-center mx-auto mb-4">
          <Camera className="h-8 w-8 text-lovery-pink" />
        </div>
        <h1 className="text-6xl font-bold text-black">404</h1>
        <p className="text-gray-500 mt-2">Halaman yang Anda cari tidak ditemukan.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/">
            <Button variant="outline" className="rounded-xl gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/ajukan-sesi">
            <Button className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white">
              Ajukan Sesi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
