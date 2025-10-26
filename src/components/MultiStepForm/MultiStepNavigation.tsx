import { Button } from "@/components/ui/button";

interface MultiStepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function MultiStepNavigation({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
}: MultiStepNavigationProps) {
  // Don't render navigation on the last step
  if (isLastStep) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Links - centered on mobile, left-aligned on desktop */}
      <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm justify-center sm:justify-start">
        <a
          href="#"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
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
            className="bg-black hover:border-white border-solid border border-white text-white font-semibold px-6 sm:px-12 lg:px-20 py-4 sm:py-6 text-sm sm:text-base rounded-full transition-colors flex-1 sm:flex-initial"
            size="lg"
          >
            Previous
          </Button>
        )}
        <Button
          onClick={onNext}
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-6 sm:px-12 lg:px-20 py-4 sm:py-6 text-sm sm:text-base rounded-full transition-colors flex-1 sm:flex-initial"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
