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
  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      addonIds: [],
      allowPublish: true,
      agreedTerms: true as unknown as true,
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
    if (step === 2) {
      const values = form.getValues()
      return !!values.name && !!values.phone
    }
    if (step === 3) {
      const values = form.getValues()
      return !!values.eventName && !!values.eventDate && !!values.eventTime && !!values.location
    }
    return true
  }, [step, watchedPackageId, form])

  async function onSubmit(data: SubmissionFormData) {
    try {
      const result = await createSubmission.mutateAsync(data)
      router.push(`/status?number=${result.submissionNumber}`)
    } catch {
      // error handled by mutation state
    }
  }

  function handleNext() {
    if (step < 4) {
      setStep((s) => s + 1)
    } else {
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lovery-pink/20 mb-4">
            <Camera className="h-6 w-6 text-lovery-pink" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">
            Ajukan Sesi
          </h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Isi formulir di bawah untuk mengajukan sesi fotografi. Admin akan meninjau pengajuan Anda.
          </p>
        </div>

        <StepIndicator steps={STEPS} currentStep={step} />

        <FormProvider {...form}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
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
                </CardContent>
              </Card>

              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className="rounded-xl"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canNext() || createSubmission.isPending}
                  className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white"
                >
                  {createSubmission.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {step === 4 ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Kirim Pengajuan
                    </>
                  ) : (
                    <>
                      Selanjutnya
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
