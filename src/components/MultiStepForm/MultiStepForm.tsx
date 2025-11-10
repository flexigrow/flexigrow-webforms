import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { config } from "@/lib/config";
import { formDefaultValues } from "./data";
import { MultiStepNavigation } from "./MultiStepNavigation";
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
import { transformFormDataToPayload } from "./transformFormData";

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(Step.YOUR_DETAILS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Single form instance for all steps
  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(unifiedSchema),
    mode: "onTouched", // Only validate after user interacts with field
    defaultValues: formDefaultValues as Partial<UnifiedFormData>,
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

    // Get fields to validate
    let fieldsToValidate = Object.keys(
      currentStepSchema.shape
    ) as (keyof UnifiedFormData)[];

    // For Step 3, conditionally handle Individual Accident & Sickness fields
    // based on whether personal-accident is selected
    if (currentStep === Step.PROFESSIONAL_INDEMNITY) {
      const productSelection = form.getValues("productSelection");
      const hasPersonalAccident =
        productSelection?.includes("personal-accident") ?? false;

      const personalAccidentFields: (keyof UnifiedFormData)[] = [
        "typeOfCover",
        "scopeOfCover",
        "gender",
        "fullNameOfInsuredPerson",
        "dateOfBirthOfInsuredPerson",
        "weeklySicknessBenefit",
        "weeklyInjuryBenefit",
        "lumpSumBenefit",
        "benefitPeriod",
        "waitingPeriod",
        "surgeryOrPreExistingConditions",
        "surgeryOrPreExistingConditionsDetails",
        "sportingActivities",
        "sportingActivitiesDetails",
        "weeklyCompensationExceedIncome",
        "weeklyCompensationExceedIncomeDetails",
      ];

      if (!hasPersonalAccident) {
        // Exclude Individual Accident & Sickness fields from validation
        fieldsToValidate = fieldsToValidate.filter(
          (field) => !personalAccidentFields.includes(field)
        );
      } else {
        // Include all fields, but we need to manually validate personal accident fields
        // since they're optional in the schema but required when personal-accident is selected
        // First validate the base fields
        const baseFields = fieldsToValidate.filter(
          (field) => !personalAccidentFields.includes(field)
        );
        const baseIsValid = await form.trigger(baseFields);

        if (!baseIsValid) {
          return; // Stop here if base fields are invalid
        }

        // Now manually validate personal accident fields
        const formData = form.getValues();
        let hasErrors = false;

        // Required fields validation
        const requiredFields: Array<{
          field: keyof UnifiedFormData;
          message: string;
        }> = [
          { field: "typeOfCover", message: "Please select type of cover" },
          { field: "scopeOfCover", message: "Please select scope of cover" },
          { field: "gender", message: "Please select gender" },
          {
            field: "fullNameOfInsuredPerson",
            message: "Full name is required",
          },
          {
            field: "dateOfBirthOfInsuredPerson",
            message: "Date of birth is required",
          },
          { field: "benefitPeriod", message: "Please select benefit period" },
          { field: "waitingPeriod", message: "Please select waiting period" },
          {
            field: "surgeryOrPreExistingConditions",
            message: "Please answer this question",
          },
          {
            field: "sportingActivities",
            message: "Please answer this question",
          },
          {
            field: "weeklyCompensationExceedIncome",
            message: "Please answer this question",
          },
        ];

        for (const { field, message } of requiredFields) {
          const value = formData[field];
          if (!value || (typeof value === "string" && value.trim() === "")) {
            form.setError(field, { type: "manual", message });
            hasErrors = true;
          } else {
            form.clearErrors(field);
          }
        }

        // Validate fullNameOfInsuredPerson length
        const fullName = formData.fullNameOfInsuredPerson;
        if (
          fullName &&
          typeof fullName === "string" &&
          fullName.trim().length < 2
        ) {
          form.setError("fullNameOfInsuredPerson", {
            type: "manual",
            message: "Full name must be at least 2 characters",
          });
          hasErrors = true;
        }

        if (hasErrors) {
          return; // Stop if there are validation errors
        }
      }
    }

    // Validate only the relevant fields (if we haven't already validated above)
    let isValid = true;
    if (
      currentStep !== Step.PROFESSIONAL_INDEMNITY ||
      !form.getValues("productSelection")?.includes("personal-accident")
    ) {
      isValid = await form.trigger(fieldsToValidate);
      if (!isValid) {
        return;
      }
    }

    // If we reach here, validation passed
    if (currentStep === Step.DISCLOSURE_CLAIMS) {
      // Submit all form data to API
      setIsSubmitting(true);
      const formData = form.getValues();
      await submitToAPI(formData);
      setIsSubmitting(false);
    }
    setCurrentStep(currentStep + 1);
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

          {/* Global Navigation - Left side only */}
          <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24 mt-6 sm:mt-12">
            <div className="col-span-12 xl:col-span-8">
              <MultiStepNavigation
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
