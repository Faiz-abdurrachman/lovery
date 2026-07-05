"use client"

import { useState, useCallback, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import {
  submissionSchema,
  type SubmissionFormData,
} from "@/features/submission/schemas/submission.schema"
import { useCreateSubmission } from "@/features/submission/hooks/use-submission"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Camera,
} from "lucide-react"
import { StepIndicator } from "./components/step-indicator"
import { StepOneCategory } from "./components/step-one-category"
import { StepTwoAddOns } from "./components/step-two-addons"
import { StepThreeProfile } from "./components/step-three-profile"
import { StepFourEvent } from "./components/step-four-event"
import { StepFiveFinal } from "./components/step-five-final"
import { PriceSummary } from "./components/price-summary"
import { AnimatedMeshBg } from "../components/animated-mesh"

const STEPS = [
  { label: "Paket", icon: "1" },
  { label: "Add-On", icon: "2" },
  { label: "Data Diri", icon: "3" },
  { label: "Acara", icon: "4" },
  { label: "Konfirmasi", icon: "5" },
]

export default function AjukanSesiContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(0)
  const [submitError, setSubmitError] = useState("")
  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      addonIds: [],
      allowPublish: true,
      agreedTerms: true,
    },
    mode: "onChange",
  })

  const pkgParam = searchParams.get("pkg")

  useEffect(() => {
    if (pkgParam) {
      form.setValue("packageId", pkgParam)
    }
  }, [pkgParam, form])

  const watchedPackageId = form.watch("packageId")
  const watchedAddonIds = form.watch("addonIds")

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await fetch("/api/packages")
      const json = await res.json()
      return json.data || []
    },
  })

  const { data: addOns = [] } = useQuery({
    queryKey: ["addons"],
    queryFn: async () => {
      const res = await fetch("/api/addons")
      const json = await res.json()
      return json.data || []
    },
  })

  const createSubmission = useCreateSubmission()

  const selectedPackage = packages.find((p: { id: string }) => p.id === watchedPackageId)
  const selectedAddOns = addOns.filter((a: { id: string }) =>
    watchedAddonIds?.includes(a.id)
  )

  const totalAddOnPrice = selectedAddOns.reduce(
    (sum: number, a: { price: number }) => sum + a.price,
    0
  )
  const totalPrice = (selectedPackage?.price || 0) + totalAddOnPrice

  const dpAmount = (() => {
    const category = selectedPackage?.category
    if (category === "Wedding") return Math.round(totalPrice * 0.4)
    if (selectedAddOns.length > 0) return 100000
    return 50000
  })()

  const canNext = useCallback(() => {
    if (step === 0) return !!watchedPackageId
    return true
  }, [step, watchedPackageId])

  async function onSubmit(data: SubmissionFormData) {
    setSubmitError("")
    try {
      const result = await createSubmission.mutateAsync(data)
      router.push(`/status?number=${result.submissionNumber}`)
    } catch {
      // error handled by mutation state
    }
  }

  async function handleNext() {
    setSubmitError("")
    // Validasi field per step sebelum lanjut
    const stepFields: Record<number, (keyof SubmissionFormData)[]> = {
      0: ["packageId"],
      2: ["name", "phone", "instagram"],
      3: ["eventName", "eventDate", "eventTime", "location"],
    }
    const fieldsToValidate = stepFields[step]
    if (fieldsToValidate) {
      const valid = await form.trigger(fieldsToValidate)
      if (!valid) {
        const errors = form.formState.errors
        const fieldLabels: Record<string, string> = {
          name: "Nama", phone: "Nomor WhatsApp", packageId: "Paket",
          eventName: "Nama acara", eventDate: "Tanggal", eventTime: "Jam",
          location: "Lokasi",
        }
        const firstKey = fieldsToValidate.find((f) => errors[f])
        const msg = firstKey ? (errors[firstKey]?.message as string) || `${fieldLabels[firstKey]} tidak valid` : "Data belum lengkap"
        setSubmitError(msg)
        return
      }
    }

    if (step < 4) {
      setStep((s) => s + 1)
    } else {
      form.handleSubmit(onSubmit, (errors) => {
        const fieldLabels: Record<string, string> = {
          name: "Nama", phone: "Nomor WhatsApp", packageId: "Paket",
          eventName: "Nama acara", eventDate: "Tanggal", eventTime: "Jam",
          location: "Lokasi", agreedTerms: "Syarat & Ketentuan",
        }
        const firstKey = Object.keys(errors)[0]
        const label = fieldLabels[firstKey] || firstKey
        setSubmitError(`Data belum lengkap: ${label}. Silakan periksa kembali form Anda.`)
      })()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden z-0">
      <AnimatedMeshBg />
      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="mb-12">
          <h1 className="text-5xl lg:text-7xl font-heading font-black text-white bg-black w-fit px-8 py-2 -skew-x-12 shadow-[8px_8px_0_0_#E89CC9] border-2 border-black">
            RESERVASI
          </h1>
          <h1 className="text-4xl lg:text-6xl font-heading font-black text-black ml-8 mt-2 uppercase tracking-tighter drop-shadow-[4px_4px_0_#E89CC9]">
            JADWAL SESI
          </h1>
        </div>

        <StepIndicator steps={STEPS} currentStep={step} />

        <FormProvider {...form}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <div className="border border-white/50 bg-white/40 backdrop-blur-3xl shadow-[12px_12px_0_0_#111111] p-6 lg:p-10 relative">
                {/* Brutalist Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-lovery-pink border-l border-b border-white/50" />
                  {step === 0 && (
                    <StepOneCategory
                      packages={packages}
                      selectedId={watchedPackageId}
                      onSelect={(id) => form.setValue("packageId", id)}
                    />
                  )}
                  {step === 1 && (
                    <StepTwoAddOns
                      addOns={addOns}
                      selectedIds={watchedAddonIds || []}
                      onToggle={(id) => {
                        const current = watchedAddonIds || []
                        const updated = current.includes(id)
                          ? current.filter((x: string) => x !== id)
                          : [...current, id]
                        form.setValue("addonIds", updated)
                      }}
                    />
                  )}
                  {step === 2 && <StepThreeProfile />}
                  {step === 3 && <StepFourEvent />}
                  {step === 4 && (
                    <StepFiveFinal
                      selectedPackage={selectedPackage}
                      selectedAddOns={selectedAddOns}
                      totalPrice={totalPrice}
                      dpAmount={dpAmount}
                    />
                  )}
              </div>

              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className="rounded-none border-4 border-black font-accent font-bold uppercase tracking-widest hover:bg-gray-100 shadow-[4px_4px_0_0_#111111] px-6 py-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canNext() || createSubmission.isPending}
                  className="rounded-none border-4 border-black bg-lovery-pink text-black hover:bg-white font-accent font-bold uppercase tracking-widest shadow-[6px_6px_0_0_#111111] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#111111] transition-all px-8 py-6"
                >
                  {createSubmission.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {step === 4 ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Kirim
                    </>
                  ) : (
                    <>
                      Lanjut
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <PriceSummary
                selectedPackage={selectedPackage}
                selectedAddOns={selectedAddOns}
                totalAddOnPrice={totalAddOnPrice}
                totalPrice={totalPrice}
                dpAmount={dpAmount}
              />
            </div>
          </div>
        </FormProvider>

        {submitError && (
          <div className="mt-6 p-4 rounded-xl bg-error/10 text-error text-sm">
            <p className="font-medium">{submitError}</p>
          </div>
        )}

        {createSubmission.isError && (
          <div className="mt-6 p-4 rounded-xl bg-error/10 text-error text-sm space-y-2">
            <p className="font-medium">{(createSubmission.error as Error)?.message || "Terjadi kesalahan. Silakan coba lagi."}</p>
            {(createSubmission.error as any)?.fields && (
              <ul className="list-disc ml-4 space-y-1">
                {Object.entries((createSubmission.error as any).fields).map(([field, msgs]: [string, any]) => (
                  <li key={field}><span className="font-medium">{field}:</span> {Array.isArray(msgs) ? msgs.join(", ") : String(msgs)}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
