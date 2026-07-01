import type { InvoiceStatus } from "@prisma/client"

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  ACTIVE: "Aktif",
  REVISED: "Revisi",
  VOID: "Batal",
}

export const INVOICE_PREFIX = "INV"

export function calculateDP(grandTotal: number, category: string, hasAddOns: boolean): number {
  if (category === "Wedding") return Math.round(grandTotal * 0.4)
  if (hasAddOns) return 100000
  return 50000
}
