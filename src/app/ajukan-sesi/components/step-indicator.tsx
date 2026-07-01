import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  steps: { label: string; icon: string }[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
              i < currentStep && "bg-lovery-pink text-white",
              i === currentStep && "bg-lovery-pink text-white",
              i > currentStep && "bg-gray-200 text-gray-500"
            )}
          >
            {i < currentStep ? <Check className="h-3.5 w-3.5" /> : step.icon}
          </div>
          <span
            className={cn(
              "text-xs hidden sm:block",
              i <= currentStep ? "text-lovery-pink font-medium" : "text-gray-400"
            )}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-8 h-0.5 hidden sm:block",
                i < currentStep ? "bg-lovery-pink" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
