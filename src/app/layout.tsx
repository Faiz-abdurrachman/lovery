import type { Metadata } from "next"
import { Questrial, Public_Sans, Outfit } from "next/font/google"
import "./globals.css"
import { Providers } from "@/providers"
import { TooltipProvider } from "@/components/ui/tooltip"

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

// Gunakan Outfit sebagai fallback sementara untuk TT Hoves (karakter teknikal/geometris yang mirip)
const ttHovesFallback = Outfit({
  subsets: ["latin"],
  variable: "--font-accent",
})

export const metadata: Metadata = {
  title: "Lovery Photography",
  description:
    "Studio fotografi profesional untuk momen spesial Anda. Graduation, Wedding, Casual, dan Event.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${questrial.variable} ${publicSans.variable} ${ttHovesFallback.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
      </body>
    </html>
  )
}
