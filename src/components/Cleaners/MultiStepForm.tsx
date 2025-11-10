import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { config } from "@/lib/config";
import {
  formDefaultValues,
  step1SideContent,
  step2SideContent,
  step3SideContent,
  step4SideContent,
} from "./data";
import { CleanersFormNavigation } from "./CleanersFormNavigation";
import {
  Step,
  stepSchemas,
  unifiedSchema,
  type UnifiedFormData,
} from "./schemas";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { StepIndicator } from "./StepIndicator";
import { SideContent } from "./SideContent";
import { transformFormDataToPayload } from "./transformFormData";

export function CleanersForm() {
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

  // Get side content based on current step
  const getSideContent = () => {
    switch (currentStep) {
      case Step.YOUR_DETAILS:
        return step1SideContent;
      case Step.GENERAL_LIABILITY:
        return step2SideContent;
      case Step.PROFESSIONAL_INDEMNITY:
        return step3SideContent;
      case Step.DISCLOSURE_CLAIMS:
        return step4SideContent;
      default:
        return null;
    }
  };

  const sideContentItems = getSideContent();

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

          {/* Main content area with form and side content */}
          <div className="xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24">
            {/* Form content */}
            <div className="col-span-12 xl:col-span-8">
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
                    firstName={form.getValues("name")?.split(" ")[0] || "there"}
                    email={form.getValues("email") || "your email"}
                  />
                )}
              </Form>

              {/* Global Navigation */}
              <div className="mt-6 sm:mt-12">
                <CleanersFormNavigation
                  isFirstStep={currentStep === Step.YOUR_DETAILS}
                  isLastStep={currentStep === Step.CONFIRMATION}
                  currentStep={currentStep}
                  isSubmitting={isSubmitting}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
              </div>
            </div>

            {/* Side Content - Desktop: right side, Mobile: after navigation */}
            {sideContentItems && (
              <div className="col-span-12 xl:col-span-4 order-last xl:order-none mt-12 xl:mt-0">
                <SideContent items={sideContentItems} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
