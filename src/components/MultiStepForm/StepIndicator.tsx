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
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const currentStepTitle = steps[currentStepIndex]?.title || "";

  return (
    <div className="mb-8 sm:mb-12 lg:mb-16 px-4">
      {/* Progress Bar and Circles - Centered */}
      <div className="flex items-center max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
        {/* Left spacer for balance */}
        <div className="flex-1" />

        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle and Label */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                    isCompleted
                      ? "bg-primary text-black"
                      : isCurrent
                      ? "bg-primary text-black ring-2 ring-primary ring-offset-2 ring-offset-[#080808]"
                      : "bg-[#3F4040] text-white"
                  }`}
                >
                  {isCompleted ? (
                    // Checkmark for completed steps
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                  ) : (
                    // Step number for current and future steps
                    <span className="text-xs sm:text-sm font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>
                {/* Hide labels on mobile, show on tablet and up */}
                <span className="hidden md:inline text-xs lg:text-sm font-normal text-white whitespace-nowrap">
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`h-[2px] w-12 sm:w-16 md:w-20 lg:w-24 mx-2 sm:mx-4 transition-colors ${
                    step.id < currentStep ? "bg-primary" : "bg-[#3F4040]"
                  }`}
                />
              )}
            </div>
          );
        })}

        {/* Right spacer for balance */}
        <div className="flex-1" />
      </div>

      {/* Mobile: Current Step Info */}
      <div className="mt-4 md:hidden text-center">
        <p className="text-sm text-gray-400">
          Step {currentStepIndex + 1} of {steps.length}
        </p>
        <p className="text-base font-medium text-white mt-1">
          {currentStepTitle}
        </p>
      </div>
    </div>
  );
}
