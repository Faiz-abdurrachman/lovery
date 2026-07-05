"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, AlertTriangle } from "lucide-react"

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-7 w-7 text-error" />
        </div>
        <h2 className="text-lg font-bold text-black">Gagal Memuat</h2>
        <p className="text-gray-500 text-sm mt-2">
          Terjadi kesalahan saat memuat halaman ini.
        </p>
        <Button onClick={reset} className="mt-4 rounded-xl gap-2" variant="outline">
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </Button>
      </div>
    </div>
  )
}
