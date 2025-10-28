import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "lucide-react";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select options...",
      className,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openUpward, setOpenUpward] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Merge forwarded ref with local ref
    React.useImperativeHandle(
      forwardedRef,
      () => containerRef.current as HTMLDivElement
    );

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOptions = options.filter((option) =>
      value.includes(option.value)
    );

    // Check if dropdown should open upward based on available space
    React.useEffect(() => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dropdownHeight = 400; // Approximate height of dropdown (max-h-80 + search input)
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Open upward if there's not enough space below but more space above
        setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
      }
    }, [isOpen]);

    const handleToggle = (optionValue: string) => {
      if (disabled) return;

      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];

      onChange(newValue);
    };

    const handleRemove = (optionValue: string) => {
      if (disabled) return;
      onChange(value.filter((v) => v !== optionValue));
    };

    const handleClearAll = () => {
      if (disabled) return;
      onChange([]);
    };

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        {/* Main input field */}
        <div
          className={cn(
            "flex h-16 w-full items-center justify-between rounded-2xl border-0 bg-[#1a1a1a] px-6 text-base text-white placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex-1 flex items-center gap-2 min-w-0 overflow-hidden">
            {selectedOptions.length === 0 ? (
              <span className="text-gray-500 truncate">{placeholder}</span>
            ) : (
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                {selectedOptions.map((option, index) => {
                  // Show ellipsis if we're at the limit of visible items
                  const maxVisibleItems = 3;
                  const shouldShowEllipsis =
                    index === maxVisibleItems &&
                    selectedOptions.length > maxVisibleItems;

                  if (shouldShowEllipsis) {
                    return (
                      <span
                        key="ellipsis"
                        className="inline-flex items-center px-2 py-1 bg-gray-600 rounded-md text-sm text-white font-medium"
                      >
                        +{selectedOptions.length - maxVisibleItems} more
                      </span>
                    );
                  }

                  if (index >= maxVisibleItems) {
                    return null;
                  }

                  return (
                    <span
                      key={option.value}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-md text-sm text-white max-w-[200px]"
                    >
                      <span className="truncate">{option.label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(option.value);
                        }}
                        className="hover:bg-gray-600 rounded-full p-0.5 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedOptions.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="hover:bg-gray-700 rounded-full p-1"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={cn(
              "absolute left-0 right-0 z-50 bg-[#1a1a1a] border border-gray-700 shadow-lg overflow-hidden",
              openUpward ? "bottom-full mb-1" : "top-full mt-1"
            )}
          >
            {/* Search input */}
            <div className="p-3 border-b border-gray-700 bg-[#1a1a1a]">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Options list */}
            <div className="max-h-80 overflow-y-auto bg-[#1a1a1a]">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-gray-400 text-sm">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleToggle(option.value)}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-4 h-4 border-2 rounded flex-shrink-0",
                        value.includes(option.value)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-500"
                      )}
                    >
                      {value.includes(option.value) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-white text-sm flex-1">
                      {option.label}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Backdrop to close dropdown */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
