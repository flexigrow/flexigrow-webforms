import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface AddressSuggestion {
  id: string;
  fullAddress: string;
  canonicalAddressId: string;
}

export interface AddressAutocompleteProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onSelect"
  > {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (address: AddressSuggestion) => void;
  placeholder?: string;
  className?: string;
}

const AddressAutocomplete = React.forwardRef<
  HTMLInputElement,
  AddressAutocompleteProps
>(
  (
    {
      value = "",
      onChange,
      onSelect,
      placeholder = "Address",
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout>();

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    const searchAddresses = async (keywords: string) => {
      if (!keywords.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `https://dev.flexigrowapi.com/api/address?keywords=${encodeURIComponent(
            keywords
          )}&country=AU`,
          {
            method: "GET",
            headers: {
              "x-external-request": "true",
              "x-signature": "TENoYn1lzjFpm94sIhLmVrm1gbGwdYn7ljiRtX3ep+8=",
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);

      if (newValue.trim()) {
        setIsOpen(true);
        debouncedSearch(newValue);
      } else {
        setIsOpen(false);
        setSuggestions([]);
      }

      setSelectedIndex(-1);
    };

    const handleSelect = (suggestion: AddressSuggestion) => {
      const fullAddress = suggestion.fullAddress;
      onChange?.(fullAddress);
      onSelect?.(suggestion);
      setIsOpen(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || suggestions.length === 0) return;

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
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    };

    const handleBlur = () => {
      // Delay closing to allow for clicks on suggestions
      setTimeout(() => {
        if (!dropdownRef.current?.contains(document.activeElement)) {
          setIsOpen(false);
          setSelectedIndex(-1);
        }
      }, 150);
    };

    const handleFocus = () => {
      if (suggestions.length > 0) {
        setIsOpen(true);
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
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={cn(
            "h-16 bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-6 text-base",
            className
          )}
          {...props}
        />

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
          >
            {isLoading ? (
              <div className="px-6 py-4 text-gray-400 text-center">
                Searching addresses...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className={cn(
                    "px-6 py-4 cursor-pointer text-white hover:bg-gray-800 transition-colors",
                    index === selectedIndex && "bg-gray-800",
                    index === 0 && "rounded-t-2xl",
                    index === suggestions.length - 1 && "rounded-b-2xl"
                  )}
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="font-medium">{suggestion.fullAddress}</div>
                </div>
              ))
            ) : value.trim() && !isLoading ? (
              <div className="px-6 py-4 text-gray-400 text-center">
                No addresses found
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

AddressAutocomplete.displayName = "AddressAutocomplete";

export { AddressAutocomplete };
