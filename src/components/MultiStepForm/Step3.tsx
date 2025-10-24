import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
} from "./data";

export function Step3() {
  const form = useFormContext<UnifiedFormData>();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2 text-white">
        Enter your professional indemnity details:
      </h1>

      <div className="mt-12">
        {/* Professional Indemnity */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-8 text-white">
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
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-8 text-white">
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
                      <Input
                        type="date"
                        placeholder="Date of Birth of Insured Person"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
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
                      <Input
                        placeholder="Weekly Sickness Benefit"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        onKeyDown={(e) => {
                          // Allow: backspace, delete, tab, escape, enter
                          if (
                            [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                            (e.keyCode === 65 && e.ctrlKey === true) ||
                            (e.keyCode === 67 && e.ctrlKey === true) ||
                            (e.keyCode === 86 && e.ctrlKey === true) ||
                            (e.keyCode === 88 && e.ctrlKey === true)
                          ) {
                            return;
                          }
                          // Ensure that it is a number and stop the keypress
                          if (
                            (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                            (e.keyCode < 96 || e.keyCode > 105)
                          ) {
                            e.preventDefault();
                          }
                        }}
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
                      <Input
                        placeholder="Weekly Injury Benefit"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        onKeyDown={(e) => {
                          // Allow: backspace, delete, tab, escape, enter
                          if (
                            [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                            (e.keyCode === 65 && e.ctrlKey === true) ||
                            (e.keyCode === 67 && e.ctrlKey === true) ||
                            (e.keyCode === 86 && e.ctrlKey === true) ||
                            (e.keyCode === 88 && e.ctrlKey === true)
                          ) {
                            return;
                          }
                          // Ensure that it is a number and stop the keypress
                          if (
                            (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                            (e.keyCode < 96 || e.keyCode > 105)
                          ) {
                            e.preventDefault();
                          }
                        }}
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
                      <Input
                        placeholder="Lump Sum Benefit"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        onKeyDown={(e) => {
                          // Allow: backspace, delete, tab, escape, enter
                          if (
                            [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                            (e.keyCode === 65 && e.ctrlKey === true) ||
                            (e.keyCode === 67 && e.ctrlKey === true) ||
                            (e.keyCode === 86 && e.ctrlKey === true) ||
                            (e.keyCode === 88 && e.ctrlKey === true)
                          ) {
                            return;
                          }
                          // Ensure that it is a number and stop the keypress
                          if (
                            (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                            (e.keyCode < 96 || e.keyCode > 105)
                          ) {
                            e.preventDefault();
                          }
                        }}
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
                        <option value="2-years">2 Years</option>
                        <option value="5-years">5 Years</option>
                        <option value="to-age-65">To Age 65</option>
                        <option value="to-age-70">To Age 70</option>
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
                        <option value="7-days">7 Days</option>
                        <option value="14-days">14 Days</option>
                        <option value="30-days">30 Days</option>
                        <option value="60-days">60 Days</option>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Additional Questions */}
        <div className="mb-12">
          <div className="space-y-6">
            {/* Surgery/Pre-existing conditions */}
            <FormField
              control={form.control}
              name="surgeryOrPreExistingConditions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Have you had surgery or pre-existing medical conditions requiring treatment or medication? (Yes / No)"
                      className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sporting activities */}
            <FormField
              control={form.control}
              name="sportingActivities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Do you engage in any amateur or professional sporting activities? (Yes / No)"
                      className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weekly compensation exceed income */}
            <FormField
              control={form.control}
              name="weeklyCompensationExceedIncome"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Will the amount of your weekly compensation from this policy and all other sources exceed your weekly salary or income? (Yes / No)"
                      className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
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
  );
}
