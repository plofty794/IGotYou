import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import success from "../../assets/success.json";
import Lottie from "lottie-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

function PaymentSuccessful() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <div
      className={`${
        isFadingIn ? "opacity-0" : "opacity-100"
      } px-24 py-12 transition-opacity max-md:px-0 max-md:py-4`}
    >
      <Card className="mx-auto flex w-full flex-col items-center justify-center border-0 shadow-none">
        <CardHeader className="max-md:p-0">
          <Lottie
            animationData={success}
            className="mx-auto h-[130px] w-2/3 max-md:h-28"
          />
          <CardDescription className="text-center text-4xl font-bold text-[#3ABC5E] max-md:text-2xl">
            Payment Successful!
          </CardDescription>
        </CardHeader>
        <CardContent className="w-2/3 px-12 text-center max-md:hidden max-md:w-full">
          <p className="text-lg font-bold text-gray-600 max-md:text-xs">
            Thank you for your subscription payment. We are processing your
            payment and it will be activated within 3-5 minutes.
          </p>
        </CardContent>
        <Alert className="w-full border-0 text-center max-md:px-2">
          <AlertTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto h-8 w-8 max-sm:h-6  max-sm:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </AlertTitle>
          <p className="text-sm font-semibold text-gray-600 max-sm:text-xs">
            In the meantime, you can continue browsing our website.
            <br /> Once your subscription payment has been checked, you will
            receive an email.
          </p>
          <span className="mt-1 block text-sm font-bold text-amber-600 underline underline-offset-2 max-sm:text-xs">
            Note: Check your spam if you haven't receive any emails from your
            inbox.
          </span>
        </Alert>
      </Card>
    </div>
  );
}

export default PaymentSuccessful;
