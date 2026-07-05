import type { InvoiceStatus } from "@prisma/client"

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  ACTIVE: "Aktif",
  REVISED: "Revisi",
  VOID: "Batal",
}

export const INVOICE_PREFIX = "INV"

export function calculateDP(grandTotal: number, category: string, hasAddOns: boolean): number {
  if (category === "Wedding") return Math.round(grandTotal * 0.4)
  // Casual: DP flat 100.000 sesuai pricelist
  if (category === "Casual") return 100000
  // Graduation: 100.000 untuk premium/bundling (ada add-on), 50.000 untuk reguler
  if (hasAddOns) return 100000
  return 50000
}
