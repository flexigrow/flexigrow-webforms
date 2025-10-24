import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import {
  Step,
  unifiedSchema,
  stepSchemas,
  type UnifiedFormData,
} from "./schemas";

const steps = [
  { id: Step.YOUR_DETAILS, title: "Your Details" },
  { id: Step.GENERAL_LIABILITY, title: "General Liability" },
  { id: Step.PROFESSIONAL_INDEMNITY, title: "Professional Indemnity" },
  { id: Step.DISCLOSURE_CLAIMS, title: "Disclosure & Claims" },
  { id: Step.CONFIRMATION, title: "Confirmation" },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(Step.YOUR_DETAILS);

  // Single form instance for all steps
  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(unifiedSchema),
    defaultValues: {
      productSelection: "public-liability",
    },
  });

  // Global navigation handlers
  const handleNext = async () => {
    // Skip validation for confirmation step (Step 5)
    if (currentStep === Step.CONFIRMATION) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Get the current step's schema
    const currentStepSchema =
      stepSchemas[currentStep as keyof typeof stepSchemas];

    if (!currentStepSchema) {
      console.error(`No schema found for step ${currentStep}`);
      return;
    }

    // Validate only the current step's fields using the schema
    const isValid = await form.trigger(
      Object.keys(currentStepSchema.shape) as (keyof UnifiedFormData)[]
    );

    if (isValid) {
      if (currentStep === Step.DISCLOSURE_CLAIMS) {
        // Submit all form data to API
        const formData = form.getValues();
        await submitToAPI(formData);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > Step.YOUR_DETAILS) {
      setCurrentStep(currentStep - 1);
    }
  };

  // API submission function
  const submitToAPI = async (formData: UnifiedFormData) => {
    try {
      const response = await fetch("/wp-json/flexigrow/v1/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12">
      <div className="max-w-6xl mx-auto bg-black">
        {/* Step Indicator */}
        <div className="mb-16">
          <div className="flex items-start justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle and Label */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step.id < currentStep
                        ? "bg-gray-600 text-white"
                        : step.id === currentStep
                        ? "bg-gray-600 text-white"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <svg
                        className="w-4 h-4"
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
                    ) : null}
                  </div>
                  <span className="text-xs font-normal text-white whitespace-nowrap">
                    {step.title}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`h-[1px] flex-1 mx-3 transition-colors ${
                      step.id < currentStep ? "bg-[#cdfa00]" : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          {/* Step 1: Your Details */}
          {currentStep === Step.YOUR_DETAILS && <Step1 />}

          {/* Step 2: General Liability */}
          {currentStep === Step.GENERAL_LIABILITY && <Step2 />}

          {/* Step 3: Professional Indemnity */}
          {currentStep === Step.PROFESSIONAL_INDEMNITY && <Step3 />}

          {/* Step 4: Disclosure and Claims Details */}
          {currentStep === Step.DISCLOSURE_CLAIMS && <Step4 />}

          {/* Step 5: Welcome/Success Page */}
          {currentStep === Step.CONFIRMATION && (
            <Step5
              firstName={form.getValues("yourName")?.split(" ")[0] || "there"}
              email={form.getValues("email") || "your email"}
            />
          )}
        </Form>

        {/* Global Navigation Buttons */}
        {currentStep < Step.CONFIRMATION && (
          <div className="flex items-center justify-between pt-8 border-t border-gray-900">
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
              {currentStep > Step.YOUR_DETAILS && (
                <Button
                  onClick={handlePrevious}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 text-base rounded-full transition-colors"
                  size="lg"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="bg-[#cdfa00] hover:bg-[#b8e600] text-black font-semibold px-20 py-6 text-base rounded-full transition-colors"
                size="lg"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
