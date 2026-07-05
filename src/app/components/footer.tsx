import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <div>
            <div className="flex items-center justify-center w-24 h-24 mb-6 overflow-hidden relative">
              <Image
                src="/LOGO.png"
                alt="Lovery Photography"
                width={160}
                height={160}
                className="object-contain h-full w-full scale-[2.5] sm:scale-[3] brightness-0 invert"
              />
            </div>
            <p className="text-base text-gray-400 leading-relaxed max-w-sm">
              Studio fotografi premium di Yogyakarta. Mengabadikan setiap momen spesial Anda dengan elegan, profesional, dan personal.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-lovery-pink">Navigasi</h3>
            <div className="flex flex-col space-y-4 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors w-fit">Beranda</Link>
              <Link href="/#portfolio" className="hover:text-white transition-colors w-fit">Portfolio</Link>
              <Link href="/#layanan" className="hover:text-white transition-colors w-fit">Layanan</Link>
              <Link href="/ajukan-sesi" className="hover:text-white transition-colors w-fit">Booking Sesi</Link>
              <Link href="/status" className="hover:text-white transition-colors w-fit">Status Pengajuan</Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-lovery-pink">Hubungi Kami</h3>
            <div className="space-y-4 text-gray-400">
              <p>Yogyakarta, Indonesia</p>
              <p>Instagram: @lovery.photography</p>
              <p>WhatsApp: +62 857-0183-2169</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between">
          <p>&copy; {new Date().getFullYear()} Lovery Photography. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <span className="text-gray-800">|</span>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
