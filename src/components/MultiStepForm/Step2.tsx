import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Radio } from "@/components/ui/radio";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";

export function Step2() {
  const form = useFormContext<UnifiedFormData>();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2 text-white">
        Enter your general liability details:
      </h1>

      <div className="mt-12">
        {/* Product Selection */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-8 text-white">
            Product Selection
          </h2>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="productSelection"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-4">
                      <Radio
                        id="public-liability"
                        value="public-liability"
                        checked={field.value === "public-liability"}
                        onChange={(e) => field.onChange(e.target.value)}
                        label="Public Liability"
                      />
                      <Radio
                        id="personal-accident"
                        value="personal-accident"
                        checked={field.value === "personal-accident"}
                        onChange={(e) => field.onChange(e.target.value)}
                        label="Personal Accident"
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
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-8 text-white">
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
                    <Input
                      placeholder="What activities does your business undertake?"
                      className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row 1: Prescribe Drugs, Medical Treatments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="prescribeDrugs"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Do you prescribe drugs? (Yes / No)"
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
                name="medicalTreatments"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Do you provide medical treatments? (Yes / No)"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Limit of Liability */}
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

            {/* Employ People */}
            <FormField
              control={form.control}
              name="employPeople"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Do you employ people? (Yes / No)"
                      className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row 2: Number of Employees, Number of Contractors, Total Wages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="numberOfEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Number of Employees"
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
                name="numberOfContractors"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Number of Contractors"
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
                name="totalWages"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Total Wages"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contractors Insurance */}
            <FormField
              control={form.control}
              name="contractorsInsurance"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Do your contractors have their own insurance? (Yes / No)"
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
