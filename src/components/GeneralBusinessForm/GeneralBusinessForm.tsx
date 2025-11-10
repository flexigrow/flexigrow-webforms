import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { config } from "@/lib/config";
import { formDefaultValues } from "./data";
import { GeneralBusinessNavigation } from "./GeneralBusinessNavigation";
import {
  Step,
  stepSchemas,
  unifiedSchema,
  type UnifiedFormData,
} from "./schemas";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { StepIndicator } from "./StepIndicator";
import { transformFormDataToPayload } from "./transformFormData";

export function GeneralBusinessForm() {
  const [currentStep, setCurrentStep] = useState(Step.YOUR_DETAILS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Single form instance for all steps
  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(unifiedSchema),
    mode: "onTouched", // Only validate after user interacts with field
    defaultValues: formDefaultValues,
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
        setIsSubmitting(true);
        const formData = form.getValues();
        await submitToAPI(formData);
        setIsSubmitting(false);
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
      const payload = transformFormDataToPayload(formData);

      const response = await fetch(
        `${config.apiBaseUrl}/api/client/insurance-registration`,
        {
          method: "POST",
          headers: {
            "x-external-request": "true",
            "x-signature": config.apiSignature,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      await response.json();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* Title and Subtitle - Only visible on Step 1 */}
      {currentStep === Step.YOUR_DETAILS && (
        <div className="text-left text-white p-4 sm:p-8 lg:p-12 overflow-hidden">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-tight lg:leading-[72px] mb-4">
            This will only take a{" "}
            <span className="text-[#C6FF00] font-light">few minutes.</span>
          </h1>
          <p className="text-lg sm:text-xl font-normal leading-[140%] text-white/80">
            We just need a few quick details to tailor Flexigrow to your
            business needs.
          </p>
        </div>
      )}

      <div className="bg-[#080808] text-white p-4 sm:p-8 lg:p-12">
        <div className="mx-auto">
          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          <Form {...form}>
            {/* Step 1: Your Details */}
            {currentStep === Step.YOUR_DETAILS && <Step1 />}

            {/* Step 2: General Liability */}
            {currentStep === Step.GENERAL_LIABILITY && <Step2 />}

            {/* Step 3: Disclosure and Claims Details */}
            {currentStep === Step.DISCLOSURE_CLAIMS && <Step4 />}

            {/* Step 4: Welcome/Success Page */}
            {currentStep === Step.CONFIRMATION && (
              <Step5
                firstName={form.getValues("name")?.split(" ")[0] || "there"}
                email={form.getValues("email") || "your email"}
              />
            )}
          </Form>

          {/* Global Navigation - Left side only */}
          <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24 mt-6 sm:mt-12">
            <div className="col-span-12 xl:col-span-8">
              <GeneralBusinessNavigation
                isFirstStep={currentStep === Step.YOUR_DETAILS}
                isLastStep={currentStep === Step.CONFIRMATION}
                currentStep={currentStep}
                isSubmitting={isSubmitting}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
            <div className="col-span-12 xl:col-span-4">
              {/* Empty space to match the SideContent layout */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
