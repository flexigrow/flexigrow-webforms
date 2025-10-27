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
    ABN: formData.ABN,
    fullAddress: formData.fullAddress,
    website: formData.website || "",
    email: formData.email,
    phone: formData.phone,

    // Address components (from form fields)
    unit: formData.unit || "",
    street: formData.street || "",
    suburb: formData.suburb || "",
    state: formData.state || "",
    postcode: formData.postcode || "",
    country: formData.country || "Australia",

    // Data form object with all insurance-related fields
    dataForm: {
      limitOfLiability: formData.limitOfLiability
        ? Number(formData.limitOfLiability)
        : 0,
      claimInLast5Years: formData.claimInLast5Years,
      claimInLast5YearsDetails: formData.claimInLast5YearsDetails || "",

      // Situation address
      situationAddress: {
        unit: formData.situationUnit || "",
        street: formData.situationStreet || "",
        suburb: formData.situationSuburb || "",
        state: formData.situationState || "",
        postcode: formData.situationPostcode || "",
        fullAddress: formData.situationAddress || "",
        country: formData.situationCountry || "Australia",
      },

      // Group activities
      group1Activities: formData.group1Activities || [],
      group2Activities: formData.group2Activities || [],
      group3Activities: formData.group3Activities || [],
      group4Activities: formData.group4Activities || [],

      // Business details
      annualTurnover: formData.annualTurnover
        ? Number(formData.annualTurnover.replace(/[$,]/g, ""))
        : 0,
      yearsInBusiness: formData.yearsInBusiness
        ? Number(formData.yearsInBusiness)
        : 0,

      // Sub-contractors
      subContractorsUsed: formData.subContractorsUsed,
      totalAmountPaidToSubContractors: formData.totalAmountPaidToSubContractors
        ? Number(formData.totalAmountPaidToSubContractors.replace(/[$,]/g, ""))
        : 0,
      subContractorActivities: formData.subContractorActivities || "",
      subContractorsHoldInsurance: formData.subContractorsHoldInsurance || "",

      // Labour hire
      labourHireUsed: formData.labourHireUsed,
      totalAmountPaidToLabourHire: formData.totalAmountPaidToLabourHire
        ? Number(formData.totalAmountPaidToLabourHire.replace(/[$,]/g, ""))
        : 0,
      labourHireActivities: formData.labourHireActivities || "",
      labourHireHoldInsurance: formData.labourHireHoldInsurance || "",

      // Contractual
      lossOfKeysExtension: formData.lossOfKeysExtension
        ? Number(formData.lossOfKeysExtension)
        : 0,
      contractualHoldHarmlessAgreements:
        formData.contractualHoldHarmlessAgreements,
      contractualHoldHarmlessAgreementsDetails:
        formData.contractualHoldHarmlessAgreementsDetails || "",

      // Extra services
      extraServicesIncluded: formData.extraServicesIncluded || [],

      // Disclosure fields
      disclosureInsuranceDeclined: formData.disclosureInsuranceDeclined,
      disclosureInsuranceDeclinedDetails:
        formData.disclosureInsuranceDeclinedDetails || "",
      disclosureInsuranceRenewal: formData.disclosureInsuranceRenewal,
      disclosureInsuranceRenewalDetails:
        formData.disclosureInsuranceRenewalDetails || "",
      disclosureInsuranceExcess: formData.disclosureInsuranceExcess,
      disclosureInsuranceExcessDetails:
        formData.disclosureInsuranceExcessDetails || "",
      disclosureInsuranceRejected: formData.disclosureInsuranceRejected,
      disclosureInsuranceRejectedDetails:
        formData.disclosureInsuranceRejectedDetails || "",
      disclosureInsuranceBankrupt: formData.disclosureInsuranceBankrupt,
      disclosureInsuranceBankruptDetails:
        formData.disclosureInsuranceBankruptDetails || "",
      disclosureInsuranceCriminal: formData.disclosureInsuranceCriminal,
      disclosureInsuranceCriminalDetails:
        formData.disclosureInsuranceCriminalDetails || "",
      disclosureInsuranceClaims: formData.disclosureInsuranceClaims,
      disclosureInsuranceClaimsDetails:
        formData.disclosureInsuranceClaimsDetails || "",
      confirmDisclosure: formData.confirmDisclosure,
    },

    // Insurance type
    insuranceType: EInsuranceType.CLEANERS,
  };
}
