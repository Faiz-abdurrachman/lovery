import Link from "next/link"
import { Camera } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-lovery-pink flex items-center justify-center">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Lovery Photography</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Studio fotografi profesional di Yogyakarta. Mengabadikan momen spesial Anda dengan profesional, hangat, dan personal.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigasi</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/" className="block hover:text-white transition-colors">Beranda</Link>
              <Link href="/#portfolio" className="block hover:text-white transition-colors">Portfolio</Link>
              <Link href="/#layanan" className="block hover:text-white transition-colors">Layanan</Link>
              <Link href="/ajukan-sesi" className="block hover:text-white transition-colors">Ajukan Sesi</Link>
              <Link href="/status" className="block hover:text-white transition-colors">Status Pengajuan</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>WhatsApp: 0812-3456-7890</p>
              <p>Instagram: @loveryphotography</p>
              <p>Yogyakarta, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Lovery Photography. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
