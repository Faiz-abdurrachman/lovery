import { Suspense } from "react"
import AjukanSesiContent from "./content"

export default function AjukanSesiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-lovery-pink/30 border-t-lovery-pink rounded-full animate-spin" /></div>}>
      <AjukanSesiContent />
    </Suspense>
  )
}
