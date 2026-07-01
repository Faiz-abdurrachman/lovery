import { Suspense } from "react"
import { StatusContent } from "./status-content"

export default function StatusPage() {
  return (
    <Suspense>
      <StatusContent />
    </Suspense>
  )
}
