import { z } from "zod"

export const settingsSchema = z.object({
  studioName: z.string().min(1, "Nama studio wajib diisi"),
  whatsapp: z.string().min(1, "Nomor WhatsApp wajib diisi"),
  bankName: z.string().optional().or(z.literal("")),
  bankAccount: z.string().optional().or(z.literal("")),
  bankHolder: z.string().optional().or(z.literal("")),
  qrisImage: z.string().optional().or(z.literal("")),
  googleCalendarId: z.string().optional().or(z.literal("")),
  googleDriveFolder: z.string().optional().or(z.literal("")),
  businessHourStart: z.string().optional().or(z.literal("")),
  businessHourEnd: z.string().optional().or(z.literal("")),
})

export type SettingsFormData = z.infer<typeof settingsSchema>
