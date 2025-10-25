import { Button } from "@/components/ui/button";

interface MultiStepNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function MultiStepNavigation({
  currentStep,
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
    <div className="flex items-center justify-between">
      <div className="flex gap-6 text-sm">
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

      <div className="flex gap-4">
        {!isFirstStep && (
          <Button
            onClick={onPrevious}
            className="bg-black hover:border-white border-solid border border-white text-white font-semibold px-20 py-6 text-base rounded-full transition-colors"
            size="lg"
          >
            Previous
          </Button>
        )}
        <Button
          onClick={onNext}
          className="bg-primary hover:bg-primary-hover text-black font-semibold px-20 py-6 text-base rounded-full transition-colors"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
