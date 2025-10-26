import { Button } from "@/components/ui/button";
import { StepHeading } from "./StepHeading";

interface Step5Props {
  firstName?: string;
  email?: string;
}

export function Step5({
  firstName = "there",
  email = "your email",
}: Step5Props) {
  return (
    <div className="py-8 sm:py-12 lg:py-20">
      {/* Welcome Header */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <StepHeading className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Hi {firstName}! Welcome to Flexigrow, we're{" "}
          <span className="text-primary">glad you're here!</span>
        </StepHeading>
        <p className="text-base sm:text-lg lg:text-xl text-white">
          Let's get started, we just sent an email to you at {email}
        </p>
      </div>

      {/* Next Steps Section */}
      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 lg:mb-12">
          Next steps
        </h2>

        <div className="space-y-6 sm:space-y-8 text-left">
          {/* Step 1: Account Setup */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
              1. Your account is already set up
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white">
              You can get your password from the email we sent.
            </p>
          </div>

          {/* Step 2: Start Using */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
              2. Start using Flexigrow
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white">
              Log in to Flexigrow and start exploring the features.
            </p>
          </div>
        </div>

        {/* Login Button */}
        <div className="mt-8 sm:mt-12">
          <Button
            onClick={() => {
              // In a real app, this would redirect to the login page
              window.open("https://flexigrow.com/login", "_blank");
            }}
            className="bg-primary hover:bg-primary-hover text-black font-bold px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg lg:text-xl rounded-full transition-colors w-full sm:w-auto"
            size="lg"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
