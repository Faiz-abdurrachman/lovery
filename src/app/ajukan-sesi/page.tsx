import { Suspense } from "react"
import AjukanSesiContent from "./content"

export default function AjukanSesiPage() {
  return (
    <Suspense>
      <AjukanSesiContent />
    </Suspense>
  )
}
