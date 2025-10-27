import * as z from "zod";

// Step enum to avoid magic numbers
export enum Step {
  YOUR_DETAILS = 1,
  GENERAL_LIABILITY = 2,
  DISCLOSURE_CLAIMS = 3,
  CONFIRMATION = 4,
}

// Step-specific validation schemas
export const step1Schema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().min(1, "Business name is required"),
  abn: z
    .string()
    .min(1, "ABN is required")
    .regex(/^\d+$/, "ABN must be only digits")
    .length(11, "ABN must be exactly 11 digits"),
  address: z.string().min(5, "Address is required"),
  unit: z.string().optional(),
  street: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
});

export const step2Schema = z.object({
  industry: z.string().min(1, "Industry is required"),
  annualTurnover: z.string().min(1, "Annual turnover is required"),
  numberOfEmployees: z.string().min(1, "Number of employees is required"),
});

export const step3Schema = z.object({
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
export const unifiedSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type UnifiedFormData = z.infer<typeof unifiedSchema>;

// Step schemas mapping for validation
export const stepSchemas = {
  [Step.YOUR_DETAILS]: step1Schema,
  [Step.GENERAL_LIABILITY]: step2Schema,
  [Step.DISCLOSURE_CLAIMS]: step3Schema,
};
