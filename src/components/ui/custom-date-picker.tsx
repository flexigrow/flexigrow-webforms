import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDatePickerProps {
  value?: Date | string;
  onChange?: (date: Date | string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
  returnFormat?: "date" | "iso" | "yyyy-MM-dd";
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  returnFormat = "yyyy-MM-dd",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewMonth, setViewMonth] = React.useState(new Date().getMonth());
  const [viewYear, setViewYear] = React.useState(new Date().getFullYear());
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Convert string to Date if needed
  const dateValue = React.useMemo(() => {
    if (!value || value === "") return undefined;
    if (value instanceof Date) {
      // Check if it's a valid date
      return isNaN(value.getTime()) ? undefined : value;
    }
    // Try to parse string
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }, [value]);

  // Initialize view to selected date or current date
  React.useEffect(() => {
    if (dateValue) {
      setViewMonth(dateValue.getMonth());
      setViewYear(dateValue.getFullYear());
    }
  }, [dateValue]);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.composedPath
        ? event.composedPath()[0]
        : event.target;
      if (
        containerRef.current &&
        target instanceof Node &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use setTimeout to prevent immediate closure when opening
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleDateSelect = (date: Date) => {
    if (!date) {
      onChange?.(undefined);
      setIsOpen(false);
      return;
    }

    // Convert date based on returnFormat
    let formattedValue: Date | string | undefined;

    if (returnFormat === "date") {
      formattedValue = date;
    } else if (returnFormat === "iso") {
      formattedValue = date.toISOString();
    } else {
      // yyyy-MM-dd format
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      formattedValue = `${year}-${month}-${day}`;
    }

    onChange?.(formattedValue);
    setIsOpen(false);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const firstDay = getFirstDayOfMonth(viewMonth, viewYear);
    const days: (number | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isDateSelected = (day: number) => {
    if (!dateValue) return false;
    return (
      dateValue.getDate() === day &&
      dateValue.getMonth() === viewMonth &&
      dateValue.getFullYear() === viewYear
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  const formatDisplayDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePreviousMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const years = React.useMemo(() => {
    const yearArray = [];
    for (let i = toYear; i >= fromYear; i--) {
      yearArray.push(i);
    }
    return yearArray;
  }, [fromYear, toYear]);

  return (
    <div ref={containerRef} className="relative">
      {/* Input Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-full flex items-center justify-between text-left font-normal bg-[#1a1a1a] border-0 text-white hover:bg-[#252525] focus-visible:ring-0 focus-visible:outline-none rounded-2xl px-6 text-base",
          !dateValue && "text-gray-500",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <span>{dateValue ? formatDisplayDate(dateValue) : placeholder}</span>
        <CalendarIcon className="ml-2 h-4 w-4 flex-shrink-0" />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-[#252525] border border-[#444] rounded-lg shadow-lg p-3 w-72">
          {/* Header with Month/Year selectors */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="h-7 w-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#333] rounded-md transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {/* Month Selector */}
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="appearance-none bg-[#1a1a1a] text-white px-2 py-1 pr-6 rounded-md text-sm border border-[#444] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>
                    {month.substring(0, 3)}
                  </option>
                ))}
              </select>

              {/* Year Selector */}
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="appearance-none bg-[#1a1a1a] text-white px-2 py-1 pr-6 rounded-md text-sm border border-[#444] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="h-7 w-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#333] rounded-md transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="h-7 flex items-center justify-center text-gray-400 text-xs font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {generateCalendarDays().map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-8" />;
              }

              const selected = isDateSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    handleDateSelect(new Date(viewYear, viewMonth, day))
                  }
                  className={cn(
                    "h-8 w-full flex items-center justify-center text-sm rounded-md font-normal transition-colors",
                    selected
                      ? "bg-white text-black hover:bg-white"
                      : today
                      ? "bg-[#333] text-white hover:bg-[#444]"
                      : "text-white hover:bg-[#333]"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
