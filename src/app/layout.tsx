import type { Metadata } from "next"
import { Geist, Public_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/providers"
import { TooltipProvider } from "@/components/ui/tooltip"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Lovery Photography",
  description:
    "Studio fotografi profesional untuk momen spesial Anda. Graduation, Wedding, Casual, dan Event.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
      </body>
    </html>
  )
}
