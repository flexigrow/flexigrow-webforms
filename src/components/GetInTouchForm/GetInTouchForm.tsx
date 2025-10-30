import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string().email(),
  lastName: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  phone: z.string().min(4, "Required"),
  preferredContactMethod: z.union([z.enum(["Email", "Phone"]), z.literal("")]),
  existingClient: z.union([z.enum(["Yes", "No"]), z.literal("")]),
  productTypes: z.union([
    z.enum(["General", "Professional", "Cyber"]),
    z.literal(""),
  ]),
  inquiryType: z.union([
    z.enum(["General Enquiry", "Quote", "Support"]),
    z.literal(""),
  ]),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema> & { documents?: FileList };

export function GetInTouchForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      lastName: "",
      firstName: "",
      phone: "",
      preferredContactMethod: "",
      existingClient: "",
      productTypes: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    try {
      setSubmitting(true);
      const res = await fetch("/wp-json/flexigrow/v1/get-in-touch", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to submit");
      form.reset();
      formRef.current.reset();
      alert("Thanks! Your message has been sent.");
    } catch (err) {
      console.error(err);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#080808] text-white p-4 sm:p-8 lg:p-12">
      <div className="text-left text-white mb-6 sm:mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-tight lg:leading-[72px] mb-3">
          Get in <span className="text-[#C6FF00]">touch.</span>
        </h1>
        <p className="text-lg sm:text-xl font-normal leading-[100%] text-white/80">
          We’ll get back to you shortly.
        </p>
      </div>

      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="">
          {/* Single grid for all fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone"
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
              name="preferredContactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="" disabled>
                        Preferred contact method
                      </option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="existingClient"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="" disabled>
                        Are you an existing FlexiGrow client?
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productTypes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="" disabled>
                        Product types
                      </option>
                      <option value="General">General</option>
                      <option value="Professional">Professional</option>
                      <option value="Cyber">Cyber</option>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="" disabled>
                        Choose inquiry type
                      </option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Quote">Quote</option>
                      <option value="Support">Support</option>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormControl>
                    <Textarea
                      placeholder="Message"
                      className="min-h-[120px] h-auto bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 py-4 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* File input and submit - full width row */}
            <div className="lg:col-span-2">
              <Input name="documents" type="file" multiple />
            </div>

            <div className="lg:col-span-2 flex justify-end mt-4">
              <Button type="submit" disabled={submitting} size="lg">
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
