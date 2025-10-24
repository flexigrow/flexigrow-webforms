import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center justify-between h-16 w-full rounded-2xl border-0 bg-[#1a1a1a] px-6 py-2 text-base text-white cursor-pointer hover:bg-[#252525] transition-colors">
        <span className="text-gray-300">{label}</span>
        <input
          type="radio"
          className={cn(
            "w-5 h-5 text-white bg-transparent border-2 border-gray-500 focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white appearance-none rounded-full relative after:content-[''] after:absolute after:inset-0 after:rounded-full checked:after:bg-white checked:after:scale-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);
Radio.displayName = "Radio";

export { Radio };
