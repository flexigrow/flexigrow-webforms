import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { MultiStepNavigation } from "./MultiStepNavigation";
import {
  Step,
  unifiedSchema,
  stepSchemas,
  type UnifiedFormData,
} from "./schemas";
import { StepIndicator } from "./StepIndicator";

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(Step.PROFESSIONAL_INDEMNITY);

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
    <div className="bg-[#080808] text-white p-4 sm:p-8 lg:p-12">
      <div className="mx-auto">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

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

        {/* Global Navigation - Left side only */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-8 sm:gap-12 xl:gap-24 mt-6 sm:mt-12">
          <div className="col-span-12 md:col-span-8">
            <MultiStepNavigation
              isFirstStep={currentStep === Step.YOUR_DETAILS}
              isLastStep={currentStep === Step.CONFIRMATION}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            {/* Empty space to match the SideContent layout */}
          </div>
        </div>
      </div>
    </div>
  );
}
