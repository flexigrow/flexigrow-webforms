import { Step } from "./schemas";

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.YOUR_DETAILS, title: "Your Details" },
  { id: Step.GENERAL_LIABILITY, title: "General Liability" },
  { id: Step.PROFESSIONAL_INDEMNITY, title: "Professional Indemnity" },
  { id: Step.DISCLOSURE_CLAIMS, title: "Disclosure & Claims" },
  { id: Step.CONFIRMATION, title: "Confirmation" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle and Label */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step.id <= currentStep
                    ? "bg-primary text-black"
                    : step.id === currentStep + 1
                    ? "bg-[#919493] text-black"
                    : "bg-[#3F4040] text-black"
                }`}
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Hide labels on mobile, show on tablet and up */}
              <span className="hidden md:inline text-xs lg:text-sm font-normal text-white whitespace-nowrap">
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-[1px] flex-1 mx-2 sm:mx-4 transition-colors bg-primary`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
