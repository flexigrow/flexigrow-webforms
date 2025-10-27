import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Radio } from "@/components/ui/radio";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import { generalLiabilityActivities, step2SideContent } from "./data";
import { NumericFormat } from "react-number-format";
import { StepHeading } from "./StepHeading";
import { SideContent } from "./SideContent";

export function Step2() {
  const form = useFormContext<UnifiedFormData>();
  const prescribeDrugs = useWatch({
    control: form.control,
    name: "prescribeDrugs",
  });
  const medicalTreatments = useWatch({
    control: form.control,
    name: "medicalTreatments",
  });

  return (
    <div>
      <StepHeading>Enter your general liability details:</StepHeading>

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24">
        <div className="col-span-12 xl:col-span-8">
          {/* Product Selection */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              Product Selection
            </h2>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="productSelection"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Radio
                          id="public-liability"
                          value="public-liability"
                          checked={field.value === "public-liability"}
                          onChange={(e) => field.onChange(e.target.value)}
                          label="Public Liability & Professional Indemnity (Required)"
                        />
                        <Radio
                          id="personal-accident"
                          value="personal-accident"
                          checked={field.value === "personal-accident"}
                          onChange={(e) => field.onChange(e.target.value)}
                          label="Personal Accident (Optional)"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* General Liability Questions */}
          <div className="mt-12 mb-12">
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              General Liability Questions
            </h2>

            <div className="space-y-6">
              {/* Activities */}
              <FormField
                control={form.control}
                name="activities"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelect
                        options={generalLiabilityActivities}
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Activities (Select all that are relevant)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Prescribe Drugs */}
              <FormField
                control={form.control}
                name="prescribeDrugs"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select {...field}>
                        <option value="">
                          Do you dispense or prescribe prescription drugs to
                          their clients? (Yes / No)
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Prescribe Drugs Details - Show only if Yes is selected */}
              {prescribeDrugs === "yes" && (
                <FormField
                  control={form.control}
                  name="prescribeDrugsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Provide full details"
                          className="min-h-[100px] bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 py-4 text-base resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Medical Treatments */}
              <FormField
                control={form.control}
                name="medicalTreatments"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select {...field}>
                        <option value="">
                          Does the Insured Person perform any medical treatments
                          or procedures that are required to be undertaken by a
                          qualified medical practitioner?
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Medical Treatments Details - Show only if Yes is selected */}
              {medicalTreatments === "yes" && (
                <FormField
                  control={form.control}
                  name="medicalTreatmentsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Provide full details"
                          className="min-h-[100px] bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 py-4 text-base resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Row: Limit of Liability, Employ People, Number of Employees */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="limitOfLiability"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">Limit of Liability</option>
                          <option value="1000000">$1,000,000</option>
                          <option value="2000000">$2,000,000</option>
                          <option value="5000000">$5,000,000</option>
                          <option value="10000000">$10,000,000</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Do you employ people? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfEmployees"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <NumericFormat
                          customInput={Input}
                          placeholder="Number of Employees? (Full & Part Time)"
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
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <SideContent items={step2SideContent} />
        </div>
      </div>
    </div>
  );
}
