import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import {
  limitOfIndemnities,
  typeOfCovers,
  scopeOfCovers,
  gender,
  benefitPeriods,
  waitingPeriods,
  step3SideContent,
} from "./data";
import { NumericFormat } from "react-number-format";
import { StepHeading } from "./StepHeading";
import { SideContent } from "./SideContent";

export function Step3() {
  const form = useFormContext<UnifiedFormData>();
  const surgeryOrPreExistingConditions = useWatch({
    control: form.control,
    name: "surgeryOrPreExistingConditions",
  });
  const sportingActivities = useWatch({
    control: form.control,
    name: "sportingActivities",
  });
  const weeklyCompensationExceedIncome = useWatch({
    control: form.control,
    name: "weeklyCompensationExceedIncome",
  });

  return (
    <div>
      <StepHeading>Enter your professional indemnity details:</StepHeading>

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24 sm:px-8 sm:px-10">
        <div className="col-span-12 xl:col-span-8">
          <div className="space-y-6">
            {/* Professional Indemnity */}
            <div>
              <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
                Professional Indemnity
              </h2>

              <div className="space-y-6">
                {/* Limit of Indemnity */}
                <FormField
                  control={form.control}
                  name="limitOfIndemnity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">Limit of Indemnity</option>
                          {limitOfIndemnities.map((option) => (
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
              </div>
            </div>

            {/* Individual Accident & Sickness */}
            <div>
              <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
                Individual Accident & Sickness
              </h2>

              <div className="space-y-6">
                {/* Row 1: Type of Cover, Scope of Cover, Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="typeOfCover"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Type of Cover</option>
                            {typeOfCovers.map((option) => (
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
                    name="scopeOfCover"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Scope of Cover</option>
                            {scopeOfCovers.map((option) => (
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Gender</option>
                            {gender.map((option) => (
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
                </div>

                {/* Row 2: Full Name, Date of Birth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullNameOfInsuredPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full Name of Insured Person"
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
                    name="dateOfBirthOfInsuredPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomDatePicker
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Date of Birth of Insured Person"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 3: Weekly Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="weeklySicknessBenefit"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumericFormat
                            customInput={Input}
                            placeholder="Weekly Sickness Benefit"
                            className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                            prefix="$"
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={0}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weeklyInjuryBenefit"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumericFormat
                            customInput={Input}
                            placeholder="Weekly Injury Benefit"
                            className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                            prefix="$"
                            thousandSeparator=","
                            allowNegative={false}
                            decimalScale={0}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lumpSumBenefit"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumericFormat
                            customInput={Input}
                            placeholder="Lump Sum Benefit"
                            className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                            prefix="$"
                            thousandSeparator=","
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

                {/* Row 4: Benefit Period, Waiting Period */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="benefitPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Benefit Period</option>
                            {benefitPeriods.map((option) => (
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
                    name="waitingPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select {...field}>
                            <option value="">Waiting Period</option>
                            {waitingPeriods.map((option) => (
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
                </div>

                {/* Surgery/Pre-existing conditions */}
                <FormField
                  control={form.control}
                  name="surgeryOrPreExistingConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Have you had surgery or pre-existing medical
                            conditions requiring treatment or medication? (Yes /
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

                {/* Surgery/Pre-existing conditions Details - Show only if Yes is selected */}
                {surgeryOrPreExistingConditions === "yes" && (
                  <FormField
                    control={form.control}
                    name="surgeryOrPreExistingConditionsDetails"
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

                {/* Sporting activities */}
                <FormField
                  control={form.control}
                  name="sportingActivities"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Do you engage in any amateur or professional
                            sporting activities? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sporting activities Details - Show only if Yes is selected */}
                {sportingActivities === "yes" && (
                  <FormField
                    control={form.control}
                    name="sportingActivitiesDetails"
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

                {/* Weekly compensation exceed income */}
                <FormField
                  control={form.control}
                  name="weeklyCompensationExceedIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field}>
                          <option value="">
                            Will the amount of your weekly compensation from
                            this policy and all other sources exceed your weekly
                            salary or income? (Yes / No)
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weekly compensation exceed income Details - Show only if Yes is selected */}
                {weeklyCompensationExceedIncome === "yes" && (
                  <FormField
                    control={form.control}
                    name="weeklyCompensationExceedIncomeDetails"
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
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <SideContent items={step3SideContent} />
        </div>
      </div>
    </div>
  );
}
