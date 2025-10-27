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
    <div className="py-8 sm:py-12 lg:py-20 sm:px-8 sm:px-10">
      {/* Welcome Header */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <StepHeading className="text-[32px] sm:text-[40px] lg:text-[56px] font-semibold leading-[42px] sm:leading-[52px] lg:leading-[72px] mb-3 sm:mb-4">
          Hi {firstName}! Welcome to Flexigrow, we're{" "}
          <span className="text-primary">glad you're here!</span>
        </StepHeading>
        <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[100%] text-white">
          Let's get started, we just sent an email to you at {email}
        </p>
      </div>

      {/* Next Steps Section */}
      <div>
        <h2 className="text-[24px] sm:text-[32px] lg:text-[42px] font-semibold leading-[28px] sm:leading-[36px] lg:leading-[46px] text-white mb-6 sm:mb-8 lg:mb-12">
          Next steps
        </h2>

        <div className="space-y-6 sm:space-y-8 text-left">
          {/* Step 1: Account Setup */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[22px] sm:leading-[26px] lg:leading-[30px] text-primary">
              1. Your account is already set up
            </h3>
            <p className="text-[16px] sm:text-[18px] lg:text-[22px] font-normal leading-[20px] sm:leading-[23px] lg:leading-[27px] text-white">
              You can get your password from the email we sent.
            </p>
          </div>

          {/* Step 2: Start Using */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[22px] sm:leading-[26px] lg:leading-[30px] text-primary">
              2. Start using Flexigrow
            </h3>
            <p className="text-[16px] sm:text-[18px] lg:text-[22px] font-normal leading-[20px] sm:leading-[23px] lg:leading-[27px] text-white">
              Log in to Flexigrow and start exploring the features.
            </p>
          </div>
        </div>

        {/* Login Button */}
        <div className="mt-8 sm:mt-12">
          <Button
            onClick={() => {
              // In a real app, this would redirect to the login page
              window.open("https://portal.flexigrow.app/", "_blank");
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
