import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: Date | string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
  returnFormat?: "date" | "iso" | "yyyy-MM-dd";
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  returnFormat = "yyyy-MM-dd",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Convert string to Date if needed
  const dateValue = React.useMemo(() => {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    return new Date(value);
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
    } else {
      // Convert date based on returnFormat
      if (returnFormat === "date") {
        onChange?.(date);
      } else if (returnFormat === "iso") {
        onChange?.(date.toISOString());
      } else {
        // yyyy-MM-dd format
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        onChange?.(`${year}-${month}-${day}`);
      }
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-16 w-full justify-start text-left font-normal bg-[#1a1a1a] border-0 text-white hover:bg-[#252525] hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base",
            !dateValue && "text-gray-500",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateValue ? format(dateValue, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-[#252525] border border-[#444] rounded-lg shadow-lg"
        align="start"
      >
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={fromYear}
          toYear={toYear}
          disabled={disabled}
          initialFocus
          className="p-4 bg-[#252525]"
          classNames={{
            months: "space-y-4",
            month: "space-y-4 w-full",
            nav: "flex items-center justify-between",
            button_previous:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
            button_next:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white",
            month_caption: "flex justify-center items-center h-10 relative",
            caption_label: "text-sm font-medium text-white",
            dropdowns: "flex gap-2 items-center",
            dropdown_root: "relative",
            dropdown:
              "appearance-none bg-[#1a1a1a] text-white px-3 py-1 pr-8 rounded-md text-sm border border-[#444] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white",
            table: "w-full border-collapse mt-4",
            weekdays: "flex",
            weekday: "text-gray-400 w-9 font-normal text-xs",
            week: "flex w-full mt-1",
            day: "h-9 w-9 text-center text-sm p-0 relative",
            day_button:
              "h-9 w-9 p-0 font-normal text-white hover:bg-[#333] rounded-md transition-colors data-[selected-single=true]:bg-white data-[selected-single=true]:text-black data-[selected-single=true]:hover:bg-white data-[selected-single=true]:hover:text-black",
            today: "bg-[#333] rounded-md",
            outside: "text-gray-600",
            disabled: "text-gray-700 opacity-50",
            hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
