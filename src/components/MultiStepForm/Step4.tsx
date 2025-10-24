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

export function Step4() {
  const form = useFormContext<UnifiedFormData>();
  const insuranceDeclined = useWatch({
    control: form.control,
    name: "insuranceDeclined",
  });
  const renewalRefused = useWatch({
    control: form.control,
    name: "renewalRefused",
  });
  const specialExcessImposed = useWatch({
    control: form.control,
    name: "specialExcessImposed",
  });
  const claimRejected = useWatch({
    control: form.control,
    name: "claimRejected",
  });
  const bankruptcy = useWatch({
    control: form.control,
    name: "bankruptcy",
  });
  const criminalOffence = useWatch({
    control: form.control,
    name: "criminalOffence",
  });
  const claimsInLast5Years = useWatch({
    control: form.control,
    name: "claimsInLast5Years",
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2 text-white">
        Enter your disclosure and claims details:
      </h1>

      <div className="mt-12">
        {/* Your disclosure details */}
        <div className="mb-12">
          <h2 className="text-lg font-medium mb-8 text-white">
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
                name="insuranceDeclined"
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
            {insuranceDeclined === "yes" && (
              <FormField
                control={form.control}
                name="insuranceDeclinedDetails"
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
                name="renewalRefused"
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
            {renewalRefused === "yes" && (
              <FormField
                control={form.control}
                name="renewalRefusedDetails"
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
                name="specialExcessImposed"
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
            {specialExcessImposed === "yes" && (
              <FormField
                control={form.control}
                name="specialExcessImposedDetails"
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
                name="claimRejected"
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
            {claimRejected === "yes" && (
              <FormField
                control={form.control}
                name="claimRejectedDetails"
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
                name="bankruptcy"
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
            {bankruptcy === "yes" && (
              <FormField
                control={form.control}
                name="bankruptcyDetails"
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
                name="criminalOffence"
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
            {criminalOffence === "yes" && (
              <FormField
                control={form.control}
                name="criminalOffenceDetails"
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
          <h2 className="text-lg font-medium mb-8 text-white">
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
                name="claimsInLast5Years"
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
            {claimsInLast5Years === "yes" && (
              <FormField
                control={form.control}
                name="claimsInLast5YearsDetails"
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
            name="confirmation"
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
  );
}
