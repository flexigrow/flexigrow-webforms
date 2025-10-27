import { useFormContext, useWatch } from "react-hook-form";
import { Radio } from "@/components/ui/radio";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import { step4SideContent } from "./data";
import { StepHeading } from "./StepHeading";
import { SideContent } from "./SideContent";

export function Step4() {
  const form = useFormContext<UnifiedFormData>();
  const disclosureInsuranceDeclined = useWatch({
    control: form.control,
    name: "disclosureInsuranceDeclined",
  });
  const disclosureInsuranceRenewal = useWatch({
    control: form.control,
    name: "disclosureInsuranceRenewal",
  });
  const disclosureInsuranceExcess = useWatch({
    control: form.control,
    name: "disclosureInsuranceExcess",
  });
  const disclosureInsuranceRejected = useWatch({
    control: form.control,
    name: "disclosureInsuranceRejected",
  });
  const disclosureInsuranceBankrupt = useWatch({
    control: form.control,
    name: "disclosureInsuranceBankrupt",
  });
  const disclosureInsuranceCriminal = useWatch({
    control: form.control,
    name: "disclosureInsuranceCriminal",
  });
  const disclosureInsuranceClaims = useWatch({
    control: form.control,
    name: "disclosureInsuranceClaims",
  });

  return (
    <div>
      <StepHeading className="mb-2">
        Enter your disclosure and claims details:
      </StepHeading>

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24 sm:px-10">
        <div className="col-span-12 xl:col-span-8">
          <div className="mt-12">
            {/* Your disclosure details */}
            <div className="mb-12">
              <h2 className="text-base sm:text-lg font-medium mb-6 sm:mb-8 text-white">
                Your disclosure details
              </h2>

              <div className="space-y-6">
                {/* Insurance Declined */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Has the Insured ever had insurance declined or special terms
                    imposed in the last 5 years?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceDeclined"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="insurance-declined-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="insurance-declined-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceDeclined === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceDeclinedDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Renewal Refused */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Had an insurer refuse or not invite renewal?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceRenewal"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="renewal-refused-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="renewal-refused-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceRenewal === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceRenewalDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Special Excess Imposed */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Had a special excess imposed on a policy?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceExcess"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="special-excess-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="special-excess-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceExcess === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceExcessDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Claim Rejected */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Had a claim rejected under a policy?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceRejected"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="claim-rejected-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="claim-rejected-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceRejected === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceRejectedDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Bankruptcy */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Been declared bankrupt or put into receivership/liquidation?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceBankrupt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="bankruptcy-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="bankruptcy-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceBankrupt === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceBankruptDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Criminal Offence */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Been charged with or convicted of a criminal offence?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceCriminal"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="criminal-offence-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="criminal-offence-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceCriminal === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceCriminalDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            {/* Your claims details */}
            <div className="mb-12">
              <h2 className="text-base sm:text-lg font-medium mb-6 sm:mb-8 text-white">
                Your claims details
              </h2>

              <div className="space-y-6">
                {/* Claims in Last 5 Years */}
                <div>
                  <p className="text-sm text-white mb-4">
                    Have you or anyone to be insured under this policy had any
                    claims in the last 5 years for any of the insured risks?
                  </p>
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceClaims"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-6 w-fit">
                            <Radio
                              id="claims-last-5-years-yes"
                              value="yes"
                              checked={field.value === "yes"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="Yes"
                            />
                            <Radio
                              id="claims-last-5-years-no"
                              value="no"
                              checked={field.value === "no"}
                              onChange={(e) => field.onChange(e.target.value)}
                              label="No"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* If Yes, provide details */}
                {disclosureInsuranceClaims === "yes" && (
                  <FormField
                    control={form.control}
                    name="disclosureInsuranceClaimsDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="If Yes, provide details"
                            className="h-24 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            {/* Confirmation */}
            <div className="mb-12">
              <FormField
                control={form.control}
                name="confirmDisclosure"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="confirmation"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-5 h-5 text-primary bg-[#1a1a1a] border-gray-600 rounded focus:ring-primary focus:ring-2"
                        />
                        <label
                          htmlFor="confirmation"
                          className="text-sm text-white cursor-pointer"
                        >
                          I confirm that I am submitting this application for
                          myself, and that all information provided is true,
                          accurate, and complete to the best of my knowledge and
                          belief.
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <SideContent items={step4SideContent} />
        </div>
      </div>
    </div>
  );
}
