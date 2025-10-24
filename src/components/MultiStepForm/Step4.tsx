import { useFormContext } from "react-hook-form";
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
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2 text-white">
        Enter your disclosure and claims details:
      </h1>

      <div className="mt-12">
        {/* Your disclosure details */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-8 text-white">
            Your disclosure details
          </h2>

          <div className="space-y-6">
            {/* Insurance Declined */}
            <div>
              <FormField
                control={form.control}
                name="insuranceDeclined"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you ever had insurance declined, refused, cancelled or
                special terms imposed?
              </p>
            </div>

            {/* If Yes, provide details */}
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

            {/* Renewal Refused */}
            <div>
              <FormField
                control={form.control}
                name="renewalRefused"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you ever had renewal refused or special terms imposed?
              </p>
            </div>

            {/* If Yes, provide details */}
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

            {/* Special Excess Imposed */}
            <div>
              <FormField
                control={form.control}
                name="specialExcessImposed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you ever had special excess imposed?
              </p>
            </div>

            {/* If Yes, provide details */}
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

            {/* Claim Rejected */}
            <div>
              <FormField
                control={form.control}
                name="claimRejected"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you ever had a claim rejected?
              </p>
            </div>

            {/* If Yes, provide details */}
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

            {/* Bankruptcy */}
            <div>
              <FormField
                control={form.control}
                name="bankruptcy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you ever been declared bankrupt or entered into any
                arrangement with creditors?
              </p>
            </div>

            {/* If Yes, provide details */}
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

            {/* Criminal Offence */}
            <div>
              <FormField
                control={form.control}
                name="criminalOffence"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you ever been charged with or convicted of any criminal
                offence?
              </p>
            </div>

            {/* If Yes, provide details */}
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
          </div>
        </div>

        {/* Your claims details */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-8 text-white">
            Your claims details
          </h2>

          <div className="space-y-6">
            {/* Claims in Last 5 Years */}
            <div>
              <FormField
                control={form.control}
                name="claimsInLast5Years"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
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
              <p className="text-sm text-gray-400 mt-2">
                Have you had any claims in the last 5 years?
              </p>
            </div>

            {/* If Yes, provide details */}
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
                      className="w-5 h-5 text-[#cdfa00] bg-[#1a1a1a] border-gray-600 rounded focus:ring-[#cdfa00] focus:ring-2"
                    />
                    <label
                      htmlFor="confirmation"
                      className="text-sm text-white cursor-pointer"
                    >
                      I confirm that the information provided is accurate and
                      complete
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
