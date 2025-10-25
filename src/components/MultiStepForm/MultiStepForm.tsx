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
import { StepIndicator } from "./StepIndicator";
import {
  Step,
  unifiedSchema,
  stepSchemas,
  type UnifiedFormData,
} from "./schemas";
import { SideContent } from "./SideContent";
import gearIconUrl from "./images/icons/gear.svg";

const sideContentItems = [
  {
    icon: gearIconUrl,
    heading: "Simplify your financial workflow",
    subheading:
      "Automate invoicing and payment reminders to get paid faster with less effort.",
  },
  {
    icon: gearIconUrl,
    heading: "Cut down on paper clutter",
    subheading:
      "Easily scan and upload receipts for smarter, hassle-free expense tracking.",
  },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(Step.DISCLOSURE_CLAIMS);

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
    <div className="bg-[#080808] text-white p-6 sm:p-12">
      <div className="mx-auto">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        <div className="grid grid-cols-12 gap-24">
          <div className="col-span-8 content-center space-y-12">
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
                  firstName={
                    form.getValues("yourName")?.split(" ")[0] || "there"
                  }
                  email={form.getValues("email") || "your email"}
                />
              )}
            </Form>

            {/* Global Navigation Buttons */}
            {currentStep < Step.CONFIRMATION && (
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
                  {currentStep > Step.YOUR_DETAILS && (
                    <Button
                      onClick={handlePrevious}
                      className="bg-black hover:border-white border-solid border border-white text-white font-semibold px-20 py-6 text-base rounded-full transition-colors"
                      size="lg"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary-hover text-black font-semibold px-20 py-6 text-base rounded-full transition-colors"
                    size="lg"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-4 content-center">
            <SideContent items={sideContentItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
