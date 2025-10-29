import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AddressSuggestion {
  id: string;
  fullAddress: string;
  canonicalAddressId: string;
  unit?: string;
  street?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

export interface AddressSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (address: AddressSuggestion) => void;
  placeholder?: string;
  className?: string;
}

const AddressSelect = React.forwardRef<HTMLButtonElement, AddressSelectProps>(
  (
    {
      value = "",
      onChange,
      onSelect,
      placeholder = "Select address...",
      className,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const debounceTimeoutRef = useRef<NodeJS.Timeout>();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const searchAddresses = async (keywords: string) => {
      if (!keywords.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/api/address?keywords=${encodeURIComponent(
            keywords
          )}&country=AU`,
          {
            method: "GET",
            headers: {
              "x-external-request": "true",
              "x-signature": config.apiSignature,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data || []);
        } else {
          console.error(
            "Failed to fetch address suggestions:",
            response.statusText
          );
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debouncedSearch = (keywords: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        searchAddresses(keywords);
      }, 300);
    };

    const handleSelect = async (suggestion: AddressSuggestion) => {
      // Fetch detailed address info using canonicalAddressId
      try {
        const response = await fetch(
          `${config.apiBaseUrl}/api/address/${suggestion.canonicalAddressId}`,
          {
            method: "GET",
            headers: {
              "x-external-request": "true",
              "x-signature": config.apiSignature,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const detailedAddress = await response.json();
          // Merge detailed address with suggestion
          const completeAddress = {
            ...suggestion,
            ...detailedAddress,
          };
          onChange?.(completeAddress.fullAddress);
          onSelect?.(completeAddress);
        } else {
          // Fallback to just the suggestion if detail fetch fails
          onChange?.(suggestion.fullAddress);
          onSelect?.(suggestion);
        }
      } catch (error) {
        console.error("Error fetching detailed address:", error);
        // Fallback to just the suggestion if detail fetch fails
        onChange?.(suggestion.fullAddress);
        onSelect?.(suggestion);
      }

      setOpen(false);
      setSearchValue("");
      setSelectedIndex(-1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      setSearchValue(search);
      debouncedSearch(search);
      setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open || suggestions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            handleSelect(suggestions[selectedIndex]);
          }
          break;
        case "Escape":
          setOpen(false);
          setSelectedIndex(-1);
          break;
      }
    };

    const handleBlur = () => {
      // Delay closing to allow for clicks on suggestions
      setTimeout(() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setOpen(false);
          setSelectedIndex(-1);
        }
      }, 150);
    };

    const handleFocus = () => {
      if (suggestions.length > 0) {
        setOpen(true);
      }
    };

    const handleButtonClick = () => {
      setOpen(!open);
      if (!open) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div ref={containerRef} className="relative w-full">
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          onClick={handleButtonClick}
          className={cn(
            "h-16 w-full justify-between bg-[#1a1a1a] border-0 text-white hover:bg-[#2a2a2a] hover:text-white rounded-2xl",
            !value && "text-gray-500",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{value || placeholder}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>

        {open && (
          <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-lg">
            <div className="p-3 border-b border-gray-700">
              <Input
                ref={inputRef}
                placeholder="Search addresses..."
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="h-12 bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl"
              />
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {isLoading ? (
                <div className="px-3 py-2 text-gray-400 text-center">
                  Searching addresses...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    className={cn(
                      "py-4 cursor-pointer text-white hover:bg-gray-800 transition-colors flex items-center gap-2",
                      index === selectedIndex && "bg-gray-800"
                    )}
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === suggestion.fullAddress
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{suggestion.fullAddress}</span>
                  </div>
                ))
              ) : searchValue.trim() && !isLoading ? (
                <div className="px-3 py-2 text-gray-400 text-center">
                  No addresses found
                </div>
              ) : (
                <div className="px-3 py-2 text-gray-400 text-center">
                  Start typing to search addresses...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

AddressSelect.displayName = "AddressSelect";

export { AddressSelect };
