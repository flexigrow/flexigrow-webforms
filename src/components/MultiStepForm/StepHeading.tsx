import { cn } from "@/lib/utils";

interface StepHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function StepHeading({ children, className }: StepHeadingProps) {
  return (
    <h1
      className={cn(
        "text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 text-white",
        className
      )}
    >
      {children}
    </h1>
  );
}
