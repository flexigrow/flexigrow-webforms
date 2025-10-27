import { type UnifiedFormData } from "./schemas";
import { EInsuranceType } from "./data";

/**
 * Transforms the unified form data into the API payload format
 * @param formData - The form data from React Hook Form
 * @returns The transformed payload ready for API submission
 */
export function transformFormDataToPayload(formData: UnifiedFormData) {
  return {
    // Top-level fields
    name: formData.name,
    businessName: formData.businessName,
    ABN: formData.abn,
    fullAddress: formData.address,
    website: formData.website || "",
    email: formData.email,
    phone: formData.phoneNumber,

    // Address components (from form fields)
    unit: formData.unit || "",
    street: formData.street || "",
    suburb: formData.suburb || "",
    state: formData.state || "",
    postcode: formData.postcode || "",
    country: formData.country || "Australia",

    // Data form object with all insurance-related fields
    dataForm: {
      // Step 2: General Liability
      industry: formData.industry,
      annualTurnover: formData.annualTurnover
        ? Number(formData.annualTurnover.replace(/[$,\s]/g, ""))
        : 0,
      numberOfEmployees: formData.numberOfEmployees
        ? Number(formData.numberOfEmployees.replace(/[,]/g, ""))
        : 0,

      // Step 3: Disclosure & Claims
      disclosureInsuranceDeclined: formData.insuranceDeclined,
      disclosureInsuranceDeclinedDetails: formData.insuranceDeclinedDetails,
      disclosureInsuranceRenewal: formData.renewalRefused,
      disclosureInsuranceRenewalDetails: formData.renewalRefusedDetails,
      disclosureInsuranceExcess: formData.specialExcessImposed,
      disclosureInsuranceExcessDetails: formData.specialExcessImposedDetails,
      disclosureInsuranceRejected: formData.claimRejected,
      disclosureInsuranceRejectedDetails: formData.claimRejectedDetails,
      disclosureInsuranceBankrupt: formData.bankruptcy,
      disclosureInsuranceBankruptDetails: formData.bankruptcyDetails,
      disclosureInsuranceCriminal: formData.criminalOffence,
      disclosureInsuranceCriminalDetails: formData.criminalOffenceDetails,
      disclosureInsuranceClaims: formData.claimsInLast5Years,
      disclosureInsuranceClaimsDetails: formData.claimsInLast5YearsDetails,
      confirmDisclosure: formData.confirmation,
    },

    // Insurance type
    insuranceType: EInsuranceType.GENERAL_BUSINESS,
  };
}
