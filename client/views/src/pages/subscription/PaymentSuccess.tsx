import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import success from "../../assets/success.json";
import Lottie from "lottie-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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
      } transition-opacity py-12 px-24`}
    >
      <Card className="w-full mx-auto flex flex-col items-center justify-center shadow-none border-0 mb-12">
        <CardHeader>
          <Lottie
            animationData={success}
            className="w-[130px] h-[130px] mx-auto"
          />
          <CardDescription className="text-center text-3xl font-bold text-[#3ABC5E]">
            Payment Successful!
          </CardDescription>
        </CardHeader>
        <CardContent className="px-12 pb-8 ">
          <span className="text-center text-sm font-bold text-gray-600">
            Thank you for your subscription payment. We are processing your
            payment and it will be activated within 5-10 minutes.
          </span>
        </CardContent>
        <Alert className="w-max text-center p-4">
          <AlertTitle>
            <InfoCircledIcon className="w-[25px] h-[25px] mx-auto" />
          </AlertTitle>
          <AlertDescription className="text-xs font-semibold text-gray-600">
            In the meantime, you can continue browsing our website or using our
            app.
            <br /> Once your subscription is activated, you will receive a
            confirmation email.
          </AlertDescription>
        </Alert>
      </Card>
    </div>
  );
}

export default PaymentSuccessful;
