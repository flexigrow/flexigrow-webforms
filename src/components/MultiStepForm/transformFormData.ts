import { type UnifiedFormData } from "./schemas";
import { EInsuranceType } from "./data";

/**
 * Transforms the unified form data into the API payload format
 * @param formData - The form data from React Hook Form
 * @returns The transformed payload ready for API submission
 */
export function transformFormDataToPayload(formData: UnifiedFormData) {
  // Map productSelection to productType
  const productTypeMap = {
    "public-liability": "Public Liability & Professional Indemnity",
    "personal-accident": "Personal Accident",
  };

  // Handle array of product selections - join multiple selections or use first one
  const productSelectionArray = Array.isArray(formData.productSelection)
    ? formData.productSelection
    : [formData.productSelection];
  const productType = productSelectionArray
    .map(
      (selection) =>
        productTypeMap[selection as keyof typeof productTypeMap] || selection
    )
    .join(", ");

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
      productType: productType || productSelectionArray[0] || "",
      activities: formData.activities,
      dispensePrescribeDrugs: formData.prescribeDrugs,
      prescribeDrugsDetails: formData.prescribeDrugsDetails,
      medicalProcedures: formData.medicalTreatments,
      medicalTreatmentsDetails: formData.medicalTreatmentsDetails,
      limitOfLiability: formData.limitOfLiability
        ? Number(formData.limitOfLiability)
        : 0,
      isEmployPeople: formData.employPeople,
      numberOfEmployees: formData.numberOfEmployees
        ? Number(formData.numberOfEmployees)
        : 0,
      limitOfIndemnity: formData.limitOfIndemnity
        ? Number(formData.limitOfIndemnity)
        : 0,
      typeOfCover: formData.typeOfCover,
      scopeOfCover: formData.scopeOfCover,
      gender: formData.gender,
      fullNameOfInsuredPerson: formData.fullNameOfInsuredPerson,
      dateOfBirthOfInsuredPerson: formData.dateOfBirthOfInsuredPerson,
      weeklySicknessBenefit: formData.weeklySicknessBenefit
        ? Number(formData.weeklySicknessBenefit.replace(/[$,]/g, ""))
        : 0,
      weeklyInjuryBenefit: formData.weeklyInjuryBenefit
        ? Number(formData.weeklyInjuryBenefit.replace(/[$,]/g, ""))
        : 0,
      lumpSumBenefit: formData.lumpSumBenefit
        ? Number(formData.lumpSumBenefit.replace(/[$,]/g, ""))
        : 0,
      benefitPeriod: formData.benefitPeriod,
      waitingPeriod: formData.waitingPeriod,
      medicalConditions: formData.surgeryOrPreExistingConditions,
      medicalConditionsDetails: formData.surgeryOrPreExistingConditionsDetails,
      sportingActivities: formData.sportingActivities,
      sportingActivitiesDetails: formData.sportingActivitiesDetails,
      weeklyCompensation: formData.weeklyCompensationExceedIncome,
      weeklyCompensationDetails: formData.weeklyCompensationExceedIncomeDetails,
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
    insuranceType: EInsuranceType.ALLIED_HEALTH_AND_NDIS,
  };
}
