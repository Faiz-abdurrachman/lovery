import { z } from "zod"

export const createInvoiceSchema = z.object({
  submissionId: z.string().min(1),
})

export const editInvoiceSchema = z.object({
  subtotal: z.number().int().min(0).optional(),
  addonTotal: z.number().int().min(0).optional(),
  grandTotal: z.number().int().min(0).optional(),
  dpAmount: z.number().int().min(0).optional(),
  remainingAmount: z.number().int().min(0).optional(),
})

export const verifyPaymentSchema = z.object({
  paymentType: z.enum(["DP", "PELUNASAN"]),
  amount: z.number().int().min(1, "Nominal harus lebih dari 0"),
  paymentMethod: z.enum(["TRANSFER", "QRIS"]),
  notes: z.string().optional(),
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
export type EditInvoiceInput = z.infer<typeof editInvoiceSchema>
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>
