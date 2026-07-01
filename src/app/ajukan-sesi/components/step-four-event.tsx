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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-black">Detail Acara</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tentukan kapan dan di mana sesi akan berlangsung.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eventName">
            Nama Acara <span className="text-error">*</span>
          </Label>
          <Input
            id="eventName"
            placeholder="Contoh: Wisuda Sarah"
            className="rounded-xl"
            {...register("eventName")}
            aria-invalid={!!errors.eventName}
          />
          {errors.eventName && (
            <p className="text-xs text-error">{errors.eventName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="eventDate">
              Tanggal <span className="text-error">*</span>
            </Label>
            <Controller
              name="eventDate"
              control={control}
              render={({ field }) => (
                <Input
                  id="eventDate"
                  type="date"
                  min={today}
                  className="rounded-xl"
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
              <p className="text-xs text-error">{errors.eventDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventTime">
              Jam <span className="text-error">*</span>
            </Label>
            <Input
              id="eventTime"
              type="time"
              className="rounded-xl"
              {...register("eventTime")}
              aria-invalid={!!errors.eventTime}
            />
            {errors.eventTime && (
              <p className="text-xs text-error">{errors.eventTime.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">
            Lokasi <span className="text-error">*</span>
          </Label>
          <Input
            id="location"
            placeholder="Contoh: UII Jakal, Yogyakarta"
            className="rounded-xl"
            {...register("location")}
            aria-invalid={!!errors.location}
          />
          {errors.location && (
            <p className="text-xs text-error">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequest">Request Khusus (Opsional)</Label>
          <Textarea
            id="specialRequest"
            placeholder="Ceritakan konsep atau keinginan khusus Anda..."
            className="rounded-xl min-h-[80px]"
            {...register("specialRequest")}
          />
        </div>
      </div>
    </div>
  )
}
