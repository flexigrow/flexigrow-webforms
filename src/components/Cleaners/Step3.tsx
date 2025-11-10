import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AddressSelect } from "@/components/ui/address-select";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import {
  group1CleanerActivities,
  group2CleanerActivities,
  group3CleanerActivities,
  group4CleanerActivities,
  lossOfKeysExtensions,
  extraServices,
} from "./cleaner";
import { NumericFormat } from "react-number-format";
import { StepHeading } from "./StepHeading";

export function Step3() {
  const form = useFormContext<UnifiedFormData>();
  const contractualHoldHarmlessAgreements = useWatch({
    control: form.control,
    name: "contractualHoldHarmlessAgreements",
  });
  const subContractorsUsed = useWatch({
    control: form.control,
    name: "subContractorsUsed",
  });
  const labourHireUsed = useWatch({
    control: form.control,
    name: "labourHireUsed",
  });
  const group4Activities = useWatch({
    control: form.control,
    name: "group4Activities",
  });
  const showGroup4OtherDetails =
    group4Activities?.includes("Other (free text)") || false;

  return (
    <div>
      <StepHeading>Enter your professional indemnity details:</StepHeading>

      <div className="sm:px-10">
        <div>
          {/* Professional Indemnity */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Professional Indemnity
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <FormField
                control={form.control}
                name="situationAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AddressSelect
                        value={field.value}
                        onChange={field.onChange}
                        onSelect={(address) => {
                          field.onChange(address.fullAddress);
                          form.setValue("situationUnit", address.unit || "");
                          form.setValue(
                            "situationStreet",
                            address.street || ""
                          );
                          form.setValue(
                            "situationSuburb",
                            address.suburb || ""
                          );
                          form.setValue("situationState", address.state || "");
                          form.setValue(
                            "situationPostcode",
                            address.postcode || ""
                          );
                          form.setValue(
                            "situationCountry",
                            address.country || "Australia"
                          );
                        }}
                        placeholder="Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cover Type */}
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-4 text-white">
                  Cover Type
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Group 1 Activities */}
                  <FormField
                    control={form.control}
                    name="group1Activities"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect
                            options={group1CleanerActivities}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Group 1 Activities (Select all that are relevant)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Group 2 Activities */}
                  <FormField
                    control={form.control}
                    name="group2Activities"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect
                            options={group2CleanerActivities}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Group 2 Activities (Select all that are relevant)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Group 3 Activities */}
                  <FormField
                    control={form.control}
                    name="group3Activities"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect
                            options={group3CleanerActivities}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Group 3 Activities (Select all that are relevant)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Group 4 Activities */}
                  <FormField
                    control={form.control}
                    name="group4Activities"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect
                            options={group4CleanerActivities}
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Group 4 Activities (Select all that are relevant)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Group 4 Other Details - Show only if "Other (free text)" is selected */}
                  {showGroup4OtherDetails && (
                    <>
                      <div className="hidden md:block" />
                      <FormField
                        control={form.control}
                        name="group4ActivitiesOtherDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="If Other, please specify"
                                className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Business Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Annual Turnover */}
              <FormField
                control={form.control}
                name="annualTurnover"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        placeholder="Annual Turnover"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        prefix="$ "
                        thousandSeparator=","
                        allowNegative={false}
                        decimalScale={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Years in Business */}
              <FormField
                control={form.control}
                name="yearsInBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        placeholder="Years in Business"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        allowNegative={false}
                        decimalScale={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Sub-Contractors */}
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Sub-Contractors
            </h2>

            <div className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="subContractorsUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Are Sub-Contractors Used? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {subContractorsUsed === "yes" && (
                  <FormField
                    control={form.control}
                    name="totalAmountPaidToSubContractors"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumericFormat
                            customInput={Input}
                            placeholder="Total Amount paid to Sub Contractors"
                            className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                            prefix="$ "
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="subContractorActivities"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Activities performed by Sub Contractors"
                          className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subContractorsHoldInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Do Sub Contractors hold their own Insurance? (Yes /
                            No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Labour Hire */}
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Labour Hire
            </h2>

            <div className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="labourHireUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Are Labour Hire Personnel Used? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {labourHireUsed === "yes" && (
                  <FormField
                    control={form.control}
                    name="totalAmountPaidToLabourHire"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumericFormat
                            customInput={Input}
                            placeholder="Total Amount paid to Labour Hire Personnel"
                            className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                            prefix="$ "
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="labourHireActivities"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Activities performed by Labour Hire"
                          className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="labourHireHoldInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Do Labour Hire hold their own Insurance? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Contractual */}
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Contractual
            </h2>

            <div className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lossOfKeysExtension"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">Loss of Keys Extension</option>
                          {lossOfKeysExtensions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contractualHoldHarmlessAgreements"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Are there any Contractual or Hold Harmless
                            Agreements? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contractual Agreements Details - Show only if Yes is selected */}
              {contractualHoldHarmlessAgreements === "yes" && (
                <FormField
                  control={form.control}
                  name="contractualHoldHarmlessAgreementsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="If Yes, provide full details:"
                          className="min-h-[100px] bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 py-4 text-base resize-none"
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

          {/* Extra Services */}
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Extra Services
            </h2>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="extraServicesIncluded"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelect
                        options={extraServices}
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Are any of the following included?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
