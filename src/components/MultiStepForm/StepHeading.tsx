interface StepHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function StepHeading({ children, className = "" }: StepHeadingProps) {
  return (
    <h1 className={`text-3xl font-semibold mb-8 text-white ${className}`}>
      {children}
    </h1>
  );
}
