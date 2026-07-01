import Link from "next/link"
import { Camera, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#layanan", label: "Layanan" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-lovery-pink flex items-center justify-center">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-black">Lovery</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="text-sm text-gray-600 hover:text-lovery-pink transition-colors">
              {label}
            </a>
          ))}
          <Link href="/ajukan-sesi">
            <Button className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white">
              Ajukan Sesi
            </Button>
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger className="md:hidden" aria-label="Buka menu navigasi">
            <Menu className="h-6 w-6 text-black" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6 flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="text-black font-medium text-lg">{label}</a>
            ))}
            <Link href="/ajukan-sesi">
              <Button className="w-full rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white mt-4">
                Ajukan Sesi
              </Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
