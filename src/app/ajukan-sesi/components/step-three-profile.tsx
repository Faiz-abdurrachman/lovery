import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SubmissionFormData } from "@/features/submission/schemas/submission.schema"

export function StepThreeProfile() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SubmissionFormData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-black">Data Diri</h2>
        <p className="text-sm text-gray-500 mt-1">
          Isi data diri Anda. Nomor WhatsApp digunakan untuk komunikasi selanjutnya.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nama Lengkap <span className="text-error">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Nama Anda"
            className="rounded-xl"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-error">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Nomor WhatsApp <span className="text-error">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="08123456789"
            className="rounded-xl"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs text-error">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram (Opsional)</Label>
          <Input
            id="instagram"
            placeholder="@username"
            className="rounded-xl"
            {...register("instagram")}
          />
        </div>
      </div>
    </div>
  )
}
