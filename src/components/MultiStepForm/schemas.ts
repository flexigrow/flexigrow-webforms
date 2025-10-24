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
  yourName: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name is required"),
  abn: z
    .string()
    .min(11, "ABN must be 11 digits")
    .max(11, "ABN must be 11 digits"),
  address: z.string().min(5, "Address is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const step2Schema = z.object({
  productSelection: z.enum(["public-liability", "personal-accident"]),
  activities: z.array(z.string()).min(1, "Please select at least one activity"),
  prescribeDrugs: z.string().min(1, "Please answer this question"),
  prescribeDrugsDetails: z.string().optional(),
  medicalTreatments: z.string().min(1, "Please answer this question"),
  medicalTreatmentsDetails: z.string().optional(),
  limitOfLiability: z.string().min(1, "Please select limit of liability"),
  employPeople: z.string().min(1, "Please answer this question"),
  numberOfEmployees: z.string().optional(),
});

export const step3Schema = z.object({
  limitOfIndemnity: z.string().min(1, "Please select limit of indemnity"),
  typeOfCover: z.string().min(1, "Please select type of cover"),
  scopeOfCover: z.string().min(1, "Please select scope of cover"),
  gender: z.string().min(1, "Please select gender"),
  fullNameOfInsuredPerson: z.string().min(2, "Full name is required"),
  dateOfBirthOfInsuredPerson: z.string().min(1, "Date of birth is required"),
  weeklySicknessBenefit: z.string().optional(),
  weeklyInjuryBenefit: z.string().optional(),
  lumpSumBenefit: z.string().optional(),
  benefitPeriod: z.string().min(1, "Please select benefit period"),
  waitingPeriod: z.string().min(1, "Please select waiting period"),
  surgeryOrPreExistingConditions: z
    .string()
    .min(1, "Please answer this question"),
  sportingActivities: z.string().min(1, "Please answer this question"),
  weeklyCompensationExceedIncome: z
    .string()
    .min(1, "Please answer this question"),
});

export const step4Schema = z.object({
  insuranceDeclined: z.enum(["yes", "no"]),
  insuranceDeclinedDetails: z.string().optional(),
  renewalRefused: z.enum(["yes", "no"]),
  renewalRefusedDetails: z.string().optional(),
  specialExcessImposed: z.enum(["yes", "no"]),
  specialExcessImposedDetails: z.string().optional(),
  claimRejected: z.enum(["yes", "no"]),
  claimRejectedDetails: z.string().optional(),
  bankruptcy: z.enum(["yes", "no"]),
  bankruptcyDetails: z.string().optional(),
  criminalOffence: z.enum(["yes", "no"]),
  criminalOffenceDetails: z.string().optional(),
  claimsInLast5Years: z.enum(["yes", "no"]),
  claimsInLast5YearsDetails: z.string().optional(),
  confirmation: z
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
