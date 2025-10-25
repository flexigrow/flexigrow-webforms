import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AddressSelect } from "@/components/ui/address-select";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type UnifiedFormData } from "./schemas";
import { StepHeading } from "./StepHeading";
import { SideContent } from "./SideContent";
import gearIconUrl from "./images/icons/gear.svg";

const sideContentItems = [
  {
    icon: gearIconUrl,
    heading: "Simplify your financial workflow",
    subheading:
      "Automate invoicing and payment reminders to get paid faster with less effort.",
  },
  {
    icon: gearIconUrl,
    heading: "Cut down on paper clutter",
    subheading:
      "Easily scan and upload receipts for smarter, hassle-free expense tracking.",
  },
];

export function Step1() {
  const form = useFormContext<UnifiedFormData>();
  return (
    <div>
      <StepHeading>Enter your contact details:</StepHeading>

      {/* Your details section */}

      <div className="grid grid-cols-12 gap-12 xl:gap-24">
        <div className="col-span-12 md:col-span-8">
          <h2 className="text-xl font-medium mb-8 text-white">Your details</h2>

          <div className="space-y-6">
            {/* Row 1: Name and Business Name */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Your Name */}
              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Business Name (Including Trading Name)"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: ABN and Address */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ABN */}
              <FormField
                control={form.control}
                name="abn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="ABN"
                        maxLength={11}
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AddressSelect
                        placeholder="Address"
                        value={field.value}
                        onChange={field.onChange}
                        onSelect={(address) => {
                          field.onChange(address.fullAddress);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Website, Email, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Website"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
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

        <div className="col-span-12 md:col-span-4">
          <SideContent items={sideContentItems} />
        </div>
      </div>
    </div>
  );
}
