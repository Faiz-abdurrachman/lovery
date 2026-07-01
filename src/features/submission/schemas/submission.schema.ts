import { z } from "zod"

export const submissionSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  phone: z
    .string()
    .min(1, "Nomor WhatsApp wajib diisi")
    .regex(
      /^(08\d{8,11}|628\d{8,11})$/,
      "Format nomor WhatsApp tidak valid (08xx atau 628xx)"
    ),
  instagram: z
    .string()
    .max(50, "Username Instagram maksimal 50 karakter")
    .optional()
    .or(z.literal("")),
  packageId: z.string().min(1, "Paket wajib dipilih"),
  addonIds: z.array(z.string()),
  eventName: z
    .string()
    .min(2, "Nama acara minimal 2 karakter")
    .max(200, "Nama acara maksimal 200 karakter"),
  eventDate: z.preprocess(
    (v) => {
      if (v instanceof Date) return v
      if (typeof v === "string" && v.length > 0) return new Date(v)
      return v
    },
    z.date({ message: "Tanggal wajib dipilih" })
  ),
  eventTime: z.string().min(1, "Jam wajib diisi"),
  location: z
    .string()
    .min(3, "Lokasi minimal 3 karakter")
    .max(500, "Lokasi maksimal 500 karakter"),
  specialRequest: z
    .string()
    .max(500, "Request khusus maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
  allowPublish: z.boolean(),
  agreedTerms: z.boolean(),
})

export type SubmissionFormData = z.infer<typeof submissionSchema>
