import * as z from "zod";

// Step enum to avoid magic numbers
export enum Step {
  YOUR_DETAILS = 1,
  GENERAL_LIABILITY = 2,
  PROFESSIONAL_INDEMNITY = 3,
  DISCLOSURE_CLAIMS = 4,
  CONFIRMATION = 5,
}

// Step-specific validation schemas
export const step1Schema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().min(1, "Business name is required"),
  ABN: z
    .string()
    .min(1, "ABN is required")
    .regex(/^\d+$/, "ABN must be only digits")
    .length(11, "ABN must be exactly 11 digits"),
  fullAddress: z.string().min(5, "Address is required"),
  unit: z.string().optional(),
  street: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
});

export const step2Schema = z.object({
  limitOfLiability: z.string().min(1, "Please select limit of liability"),
  claimInLast5Years: z.enum(["yes", "no"]).refine((val) => val !== undefined, {
    message: "Please answer this question",
  }),
  claimInLast5YearsDetails: z.string().optional(),
});

export const step3Schema = z.object({
  situationAddress: z.string().min(5, "Address is required"),
  situationUnit: z.string().optional(),
  situationStreet: z.string().optional(),
  situationSuburb: z.string().optional(),
  situationState: z.string().optional(),
  situationPostcode: z.string().optional(),
  situationCountry: z.string().optional(),
  group1Activities: z.array(z.string()).optional(),
  group2Activities: z.array(z.string()).optional(),
  group3Activities: z.array(z.string()).optional(),
  group4Activities: z.array(z.string()).optional(),
  annualTurnover: z.string().min(1, "Annual turnover is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  subContractorsUsed: z.string().min(1, "Please answer this question"),
  totalAmountPaidToSubContractors: z.string().optional(),
  subContractorActivities: z.string().optional(),
  subContractorsHoldInsurance: z.string().optional(),
  labourHireUsed: z.string().min(1, "Please answer this question"),
  totalAmountPaidToLabourHire: z.string().optional(),
  labourHireActivities: z.string().optional(),
  labourHireHoldInsurance: z.string().optional(),
  lossOfKeysExtension: z
    .string()
    .min(1, "Please select loss of keys extension"),
  contractualHoldHarmlessAgreements: z
    .string()
    .min(1, "Please answer this question"),
  contractualHoldHarmlessAgreementsDetails: z.string().optional(),
  extraServicesIncluded: z.array(z.string()).optional(),
});

export const step4Schema = z.object({
  disclosureInsuranceDeclined: z.enum(["yes", "no"]),
  disclosureInsuranceDeclinedDetails: z.string().optional(),
  disclosureInsuranceRenewal: z.enum(["yes", "no"]),
  disclosureInsuranceRenewalDetails: z.string().optional(),
  disclosureInsuranceExcess: z.enum(["yes", "no"]),
  disclosureInsuranceExcessDetails: z.string().optional(),
  disclosureInsuranceRejected: z.enum(["yes", "no"]),
  disclosureInsuranceRejectedDetails: z.string().optional(),
  disclosureInsuranceBankrupt: z.enum(["yes", "no"]),
  disclosureInsuranceBankruptDetails: z.string().optional(),
  disclosureInsuranceCriminal: z.enum(["yes", "no"]),
  disclosureInsuranceCriminalDetails: z.string().optional(),
  disclosureInsuranceClaims: z.enum(["yes", "no"]),
  disclosureInsuranceClaimsDetails: z.string().optional(),
  confirmDisclosure: z
    .boolean()
    .refine((val) => val === true, "Please confirm the application"),
});

// Combined schema for form data type
export const unifiedSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type UnifiedFormData = z.infer<typeof unifiedSchema>;

// Step schemas mapping for validation
export const stepSchemas = {
  [Step.YOUR_DETAILS]: step1Schema,
  [Step.GENERAL_LIABILITY]: step2Schema,
  [Step.PROFESSIONAL_INDEMNITY]: step3Schema,
  [Step.DISCLOSURE_CLAIMS]: step4Schema,
};
