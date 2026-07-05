"use client"

import { useFormContext, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { SubmissionFormData } from "@/features/submission/schemas/submission.schema"

export function StepFourEvent() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SubmissionFormData>()

  const today = new Date().toISOString().split("T")[0]

  const inputClass = "rounded-none border-2 border-black bg-white/40 backdrop-blur-md shadow-[4px_4px_0_0_#111111] focus:bg-white focus:ring-0 focus:border-lovery-pink focus:shadow-[4px_4px_0_0_#E89CC9] transition-all h-14 px-4 text-black font-body text-base"
  const textareaClass = "rounded-none border-2 border-black bg-white/40 backdrop-blur-md shadow-[4px_4px_0_0_#111111] focus:bg-white focus:ring-0 focus:border-lovery-pink focus:shadow-[4px_4px_0_0_#E89CC9] transition-all px-4 py-3 text-black font-body text-base min-h-[120px]"
  const labelClass = "font-accent font-bold uppercase tracking-widest text-sm text-black inline-block mb-1 bg-white border border-black px-2 py-1 shadow-[2px_2px_0_0_#111111]"
  const errorClass = "text-xs font-bold text-white bg-black w-fit px-2 py-1 mt-1 inline-block uppercase shadow-[2px_2px_0_0_#E89CC9]"

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-heading font-black text-black uppercase tracking-widest border-b-4 border-black pb-4 inline-block">Detail Acara</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="eventName" className={labelClass}>
            Nama Acara <span className="text-lovery-pink ml-1">*</span>
          </Label>
          <Input
            id="eventName"
            placeholder="CONTOH: HEIST MISSION"
            className={inputClass}
            {...register("eventName")}
            aria-invalid={!!errors.eventName}
          />
          {errors.eventName && (
            <p className={errorClass}>{errors.eventName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="eventDate" className={labelClass}>
              Tanggal <span className="text-lovery-pink ml-1">*</span>
            </Label>
            <Controller
              name="eventDate"
              control={control}
              render={({ field }) => (
                <Input
                  id="eventDate"
                  type="date"
                  min={today}
                  className={inputClass}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  aria-invalid={!!errors.eventDate}
                />
              )}
            />
            {errors.eventDate && (
              <p className={errorClass}>{errors.eventDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventTime" className={labelClass}>
              Jam <span className="text-lovery-pink ml-1">*</span>
            </Label>
            <Input
              id="eventTime"
              type="time"
              className={inputClass}
              {...register("eventTime")}
              aria-invalid={!!errors.eventTime}
            />
            {errors.eventTime && (
              <p className={errorClass}>{errors.eventTime.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className={labelClass}>
            Lokasi <span className="text-lovery-pink ml-1">*</span>
          </Label>
          <Input
            id="location"
            placeholder="SHIBUYA CROSSING"
            className={inputClass}
            {...register("location")}
            aria-invalid={!!errors.location}
          />
          {errors.location && (
            <p className={errorClass}>{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequest" className={labelClass}>Request Khusus (Opsional)</Label>
          <Textarea
            id="specialRequest"
            placeholder="CERITAKAN KONSEP ATAU REQUEST KHUSUS..."
            className={textareaClass}
            {...register("specialRequest")}
          />
        </div>
      </div>
    </div>
  )
}
