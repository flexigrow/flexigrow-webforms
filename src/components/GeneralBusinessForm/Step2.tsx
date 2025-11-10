import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import { NumericFormat } from "react-number-format";
import { StepHeading } from "./StepHeading";

export function Step2() {
  const form = useFormContext<UnifiedFormData>();

  return (
    <div>
      <StepHeading>Enter your general liability details:</StepHeading>

      <div className="sm:px-10">
        <div>
          {/* General Liability */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 text-white">
              General Liability
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Industry */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Industry name"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        thousandSeparator=","
                        prefix="$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number of Employees */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
