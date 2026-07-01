"use client"

import { Button } from "@/components/ui/button"
import { Camera, RefreshCw } from "lucide-react"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-lovery-pink/20 flex items-center justify-center mx-auto mb-4">
          <Camera className="h-8 w-8 text-lovery-pink" />
        </div>
        <h1 className="text-xl font-bold text-black">Terjadi Kesalahan</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba beberapa saat lagi.
        </p>
        <Button onClick={reset} className="mt-6 rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white gap-2">
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </Button>
      </div>
    </div>
  )
}
