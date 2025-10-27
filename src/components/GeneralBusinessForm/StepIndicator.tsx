import { Step } from "./schemas";

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.YOUR_DETAILS, title: "Your Details" },
  { id: Step.GENERAL_LIABILITY, title: "General Liability" },
  { id: Step.DISCLOSURE_CLAIMS, title: "Disclosure & Claims" },
  { id: Step.CONFIRMATION, title: "Confirmation" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const currentStepTitle = steps[currentStepIndex]?.title || "";

  return (
    <div className="mb-8 sm:mb-12 md:mb-14 xl:mb-20">
      {/* Progress Bar and Circles - Centered on mobile, left-aligned on desktop */}
      <div className="flex items-center max-w-md md:max-w-3xl xl:max-w-5xl mx-auto md:mx-0">
        {/* Left spacer for balance on mobile only */}
        <div className="flex-1 md:hidden" />

        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle and Label */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-3 xl:gap-4">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-medium transition-colors ${
                    isCompleted
                      ? "bg-primary text-black"
                      : isCurrent
                      ? "bg-primary text-black ring-2 ring-primary ring-offset-2 ring-offset-[#080808]"
                      : "bg-[#3F4040] text-white"
                  }`}
                >
                  <>
                    {/* Checkmark for all steps - Desktop only */}
                    <svg
                      className="hidden md:block w-3 h-3"
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
                    {/* Step number for all steps - Mobile only */}
                    <span className="text-xs font-bold md:hidden">
                      {index + 1}
                    </span>
                  </>
                </div>
                {/* Hide labels on mobile, show on tablet and up */}
                <span className="hidden md:inline text-sm font-normal text-white whitespace-nowrap">
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`h-[2px] md:h-[2.5px] xl:h-[3px] w-12 sm:w-16 md:w-24 xl:w-32 mx-2 sm:mx-4 md:mx-4 xl:mx-6 transition-colors ${
                    step.id < currentStep ? "bg-primary" : "bg-[#3F4040]"
                  }`}
                />
              )}
            </div>
          );
        })}

        {/* Right spacer for balance on mobile only */}
        <div className="flex-1 md:hidden" />
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
