import { Button } from "@/components/ui/button";

interface Step5Props {
  firstName?: string;
  email?: string;
}

export function Step5({
  firstName = "there",
  email = "your email",
}: Step5Props) {
  return (
    <div className="text-center py-20">
      {/* Welcome Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          Hi {firstName}! Welcome to Flexigrow, we're{" "}
          <span className="text-[#cdfa00]">glad you're here!</span>
        </h1>
        <p className="text-xl text-white">
          Let's get started, we just sent an email to you at {email}
        </p>
      </div>

      {/* Next Steps Section */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Next steps</h2>

        <div className="space-y-8 text-left">
          {/* Step 1: Account Setup */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#cdfa00]">
              1. Your account is already set up
            </h3>
            <p className="text-lg text-white">
              You can get your password from the email we sent.
            </p>
          </div>

          {/* Step 2: Start Using */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#cdfa00]">
              2. Start using Flexigrow
            </h3>
            <p className="text-lg text-white">
              Log in to Flexigrow and start exploring the features.
            </p>
          </div>
        </div>

        {/* Login Button */}
        <div className="mt-12">
          <Button
            onClick={() => {
              // In a real app, this would redirect to the login page
              window.open("https://flexigrow.com/login", "_blank");
            }}
            className="bg-[#cdfa00] hover:bg-[#b8e600] text-black font-bold px-12 py-6 text-xl rounded-full transition-colors"
            size="lg"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
