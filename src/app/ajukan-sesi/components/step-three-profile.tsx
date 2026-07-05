import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SubmissionFormData } from "@/features/submission/schemas/submission.schema"

export function StepThreeProfile() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SubmissionFormData>()

  const inputClass = "rounded-none border-2 border-black bg-white/40 backdrop-blur-md shadow-[4px_4px_0_0_#111111] focus:bg-white focus:ring-0 focus:border-lovery-pink focus:shadow-[4px_4px_0_0_#E89CC9] transition-all h-14 px-4 text-black font-body text-base"
  const labelClass = "font-accent font-bold uppercase tracking-widest text-sm text-black inline-block mb-1 bg-white border border-black px-2 py-1 shadow-[2px_2px_0_0_#111111]"

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-heading font-black text-black uppercase tracking-widest border-b-4 border-black pb-4 inline-block">Data Diri</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name" className={labelClass}>
            Nama Lengkap <span className="text-lovery-pink ml-1">*</span>
          </Label>
          <Input
            id="name"
            placeholder="JOKER / AKIRA"
            className={inputClass}
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs font-bold text-white bg-black w-fit px-2 py-1 mt-1 inline-block uppercase shadow-[2px_2px_0_0_#E89CC9]">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClass}>
            Nomor WhatsApp <span className="text-lovery-pink ml-1">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="08123456789"
            className={inputClass}
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs font-bold text-white bg-black w-fit px-2 py-1 mt-1 inline-block uppercase shadow-[2px_2px_0_0_#E89CC9]">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram" className={labelClass}>Instagram (Opsional)</Label>
          <Input
            id="instagram"
            placeholder="@phantom_thieves"
            className={inputClass}
            {...register("instagram")}
          />
        </div>
      </div>
    </div>
  )
}
