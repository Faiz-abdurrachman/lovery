import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/#faq", label: "FAQ" },
  { href: "/status", label: "Cek Status" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black flex flex-col shadow-[0_8px_0_0_rgba(0,0,0,1)]">
      {/* STATUS BAR */}
      <div className="bg-black text-lovery-pink py-1.5 px-4 text-center border-b-4 border-black">
        <span className="font-accent text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase">
          /// All-Female Crew /// Area Layanan: DIY & Sekitarnya /// Est. 2026 ///
        </span>
      </div>

      <div className="flex items-stretch justify-between w-full h-20 sm:h-28 bg-white">
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center justify-center px-4 sm:px-8 border-r-4 border-black hover:bg-black transition-colors duration-300 group shrink-0 overflow-hidden relative w-24 sm:w-32 bg-white">
          <Image
            src="/LOGO.png"
            alt="Lovery Photography"
            width={160}
            height={160}
            className="object-contain h-full w-full scale-[2.5] sm:scale-[3] group-hover:-rotate-12 group-hover:invert group-hover:hue-rotate-180 group-hover:contrast-[1.2] transition-all duration-300"
          />
        </Link>

        {/* DESKTOP NAV (STRETCHED BLOCKS) */}
        <nav className="hidden md:flex flex-1 items-stretch">
          {navLinks.map(({ href, label }) => (
            <Link 
              key={href} 
              href={href} 
              className="flex-1 flex items-center justify-center px-4 border-l-4 border-black font-accent font-bold text-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON (RIGHT) */}
        <Link href="/ajukan-sesi" className="hidden md:flex shrink-0 items-center gap-2 px-6 lg:px-10 border-l-4 border-black bg-lovery-pink font-accent font-black text-black text-lg uppercase tracking-widest hover:bg-black hover:text-lovery-pink transition-all duration-300 group">
          AJUKAN SESI 
          <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
        </Link>

        {/* MOBILE NAV TRIGGER */}
        <Sheet>
          <SheetTrigger className="md:hidden flex items-center justify-center px-6 border-l-4 border-black hover:bg-lovery-pink transition-colors" aria-label="Buka menu navigasi">
            <Menu className="h-8 w-8 text-black" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80 p-0 flex flex-col bg-white border-l-8 border-black">
            <div className="p-8 border-b-4 border-black bg-lovery-pink">
              <span className="text-4xl font-heading font-black text-black tracking-widest uppercase">Lovery</span>
            </div>
            <div className="flex flex-col flex-1 p-8 gap-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-black font-heading font-black text-3xl uppercase tracking-widest hover:text-lovery-pink hover:translate-x-2 transition-all border-b-4 border-black pb-2">
                  {label}
                </Link>
              ))}
            </div>
            <Link href="/ajukan-sesi" className="mt-auto border-t-4 border-black bg-lovery-pink text-black p-8 hover:bg-black hover:text-lovery-pink transition-colors group flex justify-between items-center">
              <span className="font-accent font-black text-2xl uppercase tracking-widest">
                AJUKAN SESI
              </span>
              <span className="text-4xl group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">↗</span>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
