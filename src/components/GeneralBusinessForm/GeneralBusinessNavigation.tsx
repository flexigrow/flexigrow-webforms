import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Step } from "./schemas";

interface GeneralBusinessNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: Step;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function GeneralBusinessNavigation({
  isFirstStep,
  isLastStep,
  currentStep,
  isSubmitting,
  onPrevious,
  onNext,
}: GeneralBusinessNavigationProps) {
  // Don't render navigation on the last step
  if (isLastStep) {
    return null;
  }

  const isSubmitStep = currentStep === Step.DISCLOSURE_CLAIMS;
  const buttonText = isSubmitStep ? "Submit" : "Next";

  return (
    <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Links - centered on mobile, left-aligned on desktop */}
      <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm justify-center sm:justify-start">
        <a
          target="_blank"
          href="https://flexigrow.com/wp-content/uploads/2025/09/EWG-Terms-of-Engagement-V3.0-September-2025.pdf"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Terms of Service
        </a>
        <a
          target="_blank"
          href="https://flexigrow.com/wp-content/uploads/2025/09/EWG-Complaints-Policy-V1.0-September-2025.pdf"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Privacy Policy
        </a>
      </div>

      {/* Buttons - full width on mobile, auto width on desktop */}
      <div className="flex gap-3 sm:gap-4">
        {!isFirstStep && (
          <Button
            onClick={onPrevious}
            disabled={isSubmitting}
            className="bg-black hover:border-white hover:bg-[#2C2C2C] hover:border-transparent border-solid border border-white text-white hover:text-primary font-semibold px-6 sm:px-12 lg:px-20 py-4 sm:py-6 text-sm sm:text-base rounded-full transition-colors flex-1 sm:flex-initial disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            Previous
          </Button>
        )}
        <Button
          onClick={onNext}
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-6 sm:px-12 lg:px-20 py-4 sm:py-6 text-sm sm:text-base rounded-full transition-colors flex-1 sm:flex-initial disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
