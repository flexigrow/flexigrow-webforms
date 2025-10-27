import { useFormContext, useWatch } from "react-hook-form";
import { Select } from "@/components/ui/select";
import { Radio } from "@/components/ui/radio";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import { limitOfLiabilities, step2SideContent } from "./data";
import { StepHeading } from "./StepHeading";
import { SideContent } from "./SideContent";

export function Step2() {
  const form = useFormContext<UnifiedFormData>();
  const claimInLast5Years = useWatch({
    control: form.control,
    name: "claimInLast5Years",
  });

  return (
    <div>
      <StepHeading>Enter your general liability details:</StepHeading>

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-12 gap-8 sm:gap-12 xl:gap-24 sm:px-10">
        <div className="col-span-12 xl:col-span-8">
          {/* General Liability */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              General Liability
            </h2>

            <div className="space-y-6">
              {/* Limit of Liability */}
              <FormField
                control={form.control}
                name="limitOfLiability"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select {...field}>
                        <option value="">Limit of Liability</option>
                        {limitOfLiabilities.map((option) => (
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

              {/* Has the Insured had any Liability Claims in the last 5 years */}
              <FormField
                control={form.control}
                name="claimInLast5Years"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <p className="text-white text-base">
                          Has the Insured had any Liability Claims in the last 5
                          years
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Radio
                            id="claims-yes"
                            value="yes"
                            checked={field.value === "yes"}
                            onChange={(e) => field.onChange(e.target.value)}
                            label="Yes"
                          />
                          <Radio
                            id="claims-no"
                            value="no"
                            checked={field.value === "no"}
                            onChange={(e) => field.onChange(e.target.value)}
                            label="No"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Claims Details - Show only if Yes is selected */}
              {claimInLast5Years === "yes" && (
                <FormField
                  control={form.control}
                  name="claimInLast5YearsDetails"
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
        </div>

        <div className="col-span-12 xl:col-span-4">
          <SideContent items={step2SideContent} />
        </div>
      </div>
    </div>
  );
}
