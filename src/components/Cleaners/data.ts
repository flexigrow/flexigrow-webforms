export const generalLiabilityActivities = [
  {
    label: "Residential cleaning",
    value: "Residential cleaning",
  },
  {
    label: "Commercial cleaning",
    value: "Commercial cleaning",
  },
  {
    label: "Office cleaning",
    value: "Office cleaning",
  },
  {
    label: "Window cleaning",
    value: "Window cleaning",
  },
  {
    label: "Carpet cleaning",
    value: "Carpet cleaning",
  },
  {
    label: "End of lease cleaning",
    value: "End of lease cleaning",
  },
  {
    label: "Construction cleaning",
    value: "Construction cleaning",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export enum EInsuranceType {
  ALLIED_HEALTH_AND_NDIS = "allied_health_and_ndis",
  CLEANERS = "cleaners",
  GENERAL_BUSINESS = "general_business",
}

export const limitOfLiabilities = [
  { label: "$ 5,000,000", value: 5000000 },
  { label: "$ 10,000,000", value: 10000000 },
  { label: "$ 20,000,000", value: 20000000 },
];
export const limitOfIndemnities = [
  { label: "$ 500,000", value: 500000 },
  { label: "$ 1,000,000", value: 1000000 },
];

export const scopeOfCovers = [
  { value: "24 Hours", label: "24 Hours" },
  {
    value: "Working Hours (NO Commuting)",
    label: "Working Hours (NO Commuting)",
  },
  {
    value: "Working Hours (incl Commuting)",
    label: "Working Hours (incl Commuting)",
  },
  { value: "Outside Working Hours", label: "Outside Working Hours" },
];

export const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const typeOfCovers = [
  { label: "Accident Only", value: "Accident Only" },
  { label: "Accident & Sickness", value: "Accident & Sickness" },
];

export const benefitPeriods = [
  { label: "52 Weeks", value: "52 Weeks" },
  { label: "104 Weeks", value: "104 Weeeks" },
];

export const waitingPeriods = [
  { label: "7 Days", value: "7 Days" },
  { label: "14 Days", value: "14 Days" },
  { label: "21 Days", value: "21 Days" },
  { label: "28 Days", value: "28 Days" },
];

// Professional Indemnity Activity Groups
export const group1Activities = [
  { label: "Domestic Cleaning", value: "Domestic Cleaning" },
  { label: "Office Cleaning", value: "Office Cleaning" },
];

export const group2Activities = [
  { label: "Builders Cleaning", value: "Builders Cleaning" },
  { label: "Domestic Cleaning", value: "Domestic Cleaning" },
];

export const group3Activities = [
  { label: "Builders Cleaning", value: "Builders Cleaning" },
];

export const group4Activities = [
  { label: "Chimney Sweeping", value: "Chimney Sweeping" },
  { label: "School/College Cleaning", value: "School/College Cleaning" },
];

export const lossOfKeysExtensions = [
  { label: "$ 5,000", value: "5000" },
  { label: "$ 10,000", value: "10000" },
  { label: "$ 25,000", value: "25000" },
  { label: "$ 50,000", value: "50000" },
];

export const extraServices = [
  {
    label: "Cleaning - Carpet/Upholstery",
    value: "Cleaning - Carpet/Upholstery",
  },
  {
    label: "Cleaning - High Pressure Water",
    value: "Cleaning - High Pressure Water",
  },
  { label: "Cleaning - Windows", value: "Cleaning - Windows" },
];

// Side content items for each step
// Note: Empty icon strings will use the inline fallback gear icon in SideContent component
export const step1SideContent = [
  {
    icon: "",
    heading: "Quick & easy set up",
    subheading:
      "Get your cleaning business insurance up and running — in less than 5 minutes.",
  },
  {
    icon: "",
    heading: "Built for cleaning businesses",
    subheading:
      "Designed specifically to support residential and commercial cleaning services.",
  },
];

export const step2SideContent = [
  {
    icon: "",
    heading: "Comprehensive coverage",
    subheading:
      "Protect your cleaning business with public liability and professional indemnity insurance.",
  },
  {
    icon: "",
    heading: "Flexible options",
    subheading:
      "Choose coverage limits that match your business size and cleaning services.",
  },
];

export const step3SideContent = [
  {
    icon: "",
    heading: "Personal accident cover",
    subheading:
      "Optional coverage to protect you and your team while on the job.",
  },
  {
    icon: "",
    heading: "Customizable benefits",
    subheading:
      "Select benefit periods and waiting periods that work for your business.",
  },
];

export const step4SideContent = [
  {
    icon: "",
    heading: "Fast approval process",
    subheading:
      "Get your insurance certificate quickly after completing the application.",
  },
  {
    icon: "",
    heading: "Expert support",
    subheading:
      "Our team is here to help you with any questions about your coverage.",
  },
];

// Form default values
export const formDefaultValues = {
  // Step 1
  name: "",
  businessName: "",
  ABN: "",
  fullAddress: "",
  unit: "",
  street: "",
  suburb: "",
  state: "",
  postcode: "",
  country: "Australia",
  website: "",
  email: "",
  phone: "",
  // Step 2
  limitOfLiability: "",
  claimInLast5Years: undefined as "yes" | "no" | undefined,
  claimInLast5YearsDetails: "",
  // Step 3
  situationAddress: "",
  situationUnit: "",
  situationStreet: "",
  situationSuburb: "",
  situationState: "",
  situationPostcode: "",
  situationCountry: "Australia",
  group1Activities: [],
  group2Activities: [],
  group3Activities: [],
  group4Activities: [],
  annualTurnover: "",
  yearsInBusiness: "",
  subContractorsUsed: "",
  totalAmountPaidToSubContractors: "",
  subContractorActivities: "",
  subContractorsHoldInsurance: "",
  labourHireUsed: "",
  totalAmountPaidToLabourHire: "",
  labourHireActivities: "",
  labourHireHoldInsurance: "",
  lossOfKeysExtension: "",
  contractualHoldHarmlessAgreements: "",
  contractualHoldHarmlessAgreementsDetails: "",
  extraServicesIncluded: [],
  // Step 4
  disclosureInsuranceDeclined: undefined as "yes" | "no" | undefined,
  disclosureInsuranceDeclinedDetails: "",
  disclosureInsuranceRenewal: undefined as "yes" | "no" | undefined,
  disclosureInsuranceRenewalDetails: "",
  disclosureInsuranceExcess: undefined as "yes" | "no" | undefined,
  disclosureInsuranceExcessDetails: "",
  disclosureInsuranceRejected: undefined as "yes" | "no" | undefined,
  disclosureInsuranceRejectedDetails: "",
  disclosureInsuranceBankrupt: undefined as "yes" | "no" | undefined,
  disclosureInsuranceBankruptDetails: "",
  disclosureInsuranceCriminal: undefined as "yes" | "no" | undefined,
  disclosureInsuranceCriminalDetails: "",
  disclosureInsuranceClaims: undefined as "yes" | "no" | undefined,
  disclosureInsuranceClaimsDetails: "",
  confirmDisclosure: false,
};
