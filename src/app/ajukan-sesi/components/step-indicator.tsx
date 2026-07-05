import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  steps: { label: string; icon: string }[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-12">
      {steps.map((step, i) => {
        const isPast = i < currentStep
        const isCurrent = i === currentStep
        
        return (
          <div key={i} className="flex items-center">
            {/* Step Node */}
            <div
              className={cn(
                "relative flex items-center justify-center font-accent font-black text-lg transition-all duration-300",
                "w-10 h-10 sm:w-14 sm:h-14 border-4",
                isPast || isCurrent 
                  ? "bg-lovery-pink text-black border-black shadow-[4px_4px_0_0_#111111]" 
                  : "bg-white/40 backdrop-blur-md border-black/20 text-gray-400"
              )}
              style={isCurrent ? { transform: 'skewX(-10deg)' } : {}}
            >
              <span className={cn("relative z-10", isCurrent && "skew-x-12")}>{step.icon}</span>
              
              {/* Floating label */}
              {isCurrent && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading font-bold text-sm tracking-widest text-black bg-white px-2 border border-black shadow-[2px_2px_0_0_#111111]">
                  {step.label.toUpperCase()}
                </div>
              )}
            </div>
            
            {/* Connector Line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-4 sm:w-12 h-1 ml-1 sm:ml-2 transition-colors",
                  isPast ? "bg-black" : "bg-black/10"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
