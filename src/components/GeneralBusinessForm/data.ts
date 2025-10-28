export const generalLiabilityActivities = [
  {
    label: "General household tasks and gardening",
    value: "General household tasks and gardening",
  },
  {
    label: "Personal care activities",
    value: "Personal care activities",
  },
  {
    label: "Sleepover support ",
    value: "Sleepover support ",
  },
  {
    label: "Transport",
    value: "Transport",
  },
  {
    label: "Meal preparation",
    value: "Meal preparation",
  },
  {
    label: "Grocery shopping/Errands",
    value: "Grocery shopping/Errands",
  },
  {
    label: "Community Activities",
    value: "Community Activities",
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

// Side content items for each step
// Note: Empty icon strings will use the inline fallback gear icon in SideContent component
export const step1SideContent = [
  {
    icon: "",
    heading: "Quick & easy set up",
    subheading:
      "Get your business account up and running — in less than 5 minutes.",
  },
  {
    icon: "",
    heading: "Built for General Business",
    subheading:
      "Designed specifically to support care providers and support coordinators.",
  },
];

export const step2SideContent = [
  {
    icon: "",
    heading: "Simplify your financial workflow",
    subheading:
      "Automate invoicing and payment reminders to get paid faster with less effort.",
  },
  {
    icon: "",
    heading: "Cut down on paper clutter",
    subheading:
      "Easily scan and upload receipts for smarter, hassle-free expense tracking.",
  },
];

export const step3SideContent = [
  {
    icon: "",
    heading: "Secure and NDIS-Ready",
    subheading:
      "Use built-in NDIS templates and keep data protected with industry-grade security.",
  },
  {
    icon: "",
    heading: "Smart financial tracking",
    subheading:
      "Monitor your income and expenses with quick and easy reports based on real-time data.",
  },
];

export const step4SideContent = [
  {
    icon: "",
    heading: "Access anytime, anywhere",
    subheading:
      "Manage your finances on desktop or mobile, wherever your work takes you.",
  },
  {
    icon: "",
    heading: "Flexibility as you grow",
    subheading:
      "For solo practitioners to expanding teams, Flexigrow scales with you.",
  },
];

// Form default values
export const formDefaultValues = {
  // Step 1: Your Details
  name: "",
  businessName: "",
  abn: "",
  address: "",
  unit: "",
  street: "",
  suburb: "",
  state: "",
  postcode: "",
  country: "Australia",
  website: "",
  email: "",
  phoneNumber: "",
  // Step 2: General Liability
  industry: "",
  annualTurnover: "",
  numberOfEmployees: "",
  // Step 3: Disclosure & Claims
  insuranceDeclined: undefined as "yes" | "no" | undefined,
  insuranceDeclinedDetails: "",
  renewalRefused: undefined as "yes" | "no" | undefined,
  renewalRefusedDetails: "",
  specialExcessImposed: undefined as "yes" | "no" | undefined,
  specialExcessImposedDetails: "",
  claimRejected: undefined as "yes" | "no" | undefined,
  claimRejectedDetails: "",
  bankruptcy: undefined as "yes" | "no" | undefined,
  bankruptcyDetails: "",
  criminalOffence: undefined as "yes" | "no" | undefined,
  criminalOffenceDetails: "",
  claimsInLast5Years: undefined as "yes" | "no" | undefined,
  claimsInLast5YearsDetails: "",
  confirmation: false,
};
