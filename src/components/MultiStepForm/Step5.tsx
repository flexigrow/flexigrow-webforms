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
    <div className="py-8 sm:py-12 lg:py-20 sm:px-8 lg:px-10">
      {/* Welcome Header */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <StepHeading className="text-[32px] sm:text-[40px] lg:text-[56px] font-semibold leading-[42px] sm:leading-[52px] lg:leading-[72px] mb-3 sm:mb-4">
          Hi {firstName}! Welcome to Flexigrow, we're{" "}
          <span className="text-primary">glad you're here!</span>
        </StepHeading>
        <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[150%] text-white">
          We are now looking at your insurance needs and will be in contact
          shortly, if you are looking for the business software only we can get
          started straight away - we just sent an email to you at {email}
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
              We have just sent you an email with the activation link.
            </p>
          </div>

          {/* Step 2: Start Using */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[22px] sm:leading-[26px] lg:leading-[30px] text-primary">
              2. Start using Flexigrow
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
