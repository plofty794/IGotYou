import { useEffect, useState } from "react";
import sendMoney from "../../assets/send-money.json";
import Lottie from "lottie-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

function SubscriptionPayment() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <div
      className={`${
        isFadingIn ? "opacity-0" : "opacity-100"
      } flex w-full items-center justify-evenly transition-opacity max-md:flex-col`}
    >
      <Lottie
        animationData={sendMoney}
        className="h-[420px] w-[420px] max-w-full max-md:h-52 max-md:w-52"
      />
      <Card className="w-2/4 border-0 shadow-none">
        <CardHeader className="w-full text-center max-md:p-0">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-semibold max-md:text-lg">
              Send your payment to{" "}
            </span>
            <img
              className="block h-[50px] max-h-full w-[50px] max-w-full object-cover"
              loading="lazy"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetcash.ph%2Fwp-content%2Fuploads%2F2021%2F01%2FTransparent-1280-x-720.png&f=1&nofb=1&ipt=33a2060d0cc021ca3c2c7219f24a31fb9d179ffd57aace81159c48c11a8adc41&ipo=images"
              alt=""
            />
          </div>
          <CardDescription className="text-lg font-semibold text-gray-600 max-md:hidden">
            You can send your payment through Express Send or through scanning
            our QR code via GCash.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-0">
          <div className="flex items-center justify-center gap-6 max-md:flex-col max-md:gap-2">
            <div className="overflow-hidden rounded-lg border shadow">
              <img
                src="/QRCode.jpg"
                className="h-[150px] w-[150px] object-cover max-md:h-20 max-md:w-20"
              />
            </div>
            <span className="text-sm font-semibold">OR</span>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <PaperPlaneIcon width={25} height={25} color="#005FE7" />
                <span className="text-xl font-semibold max-md:text-sm">
                  +639079251189
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SubscriptionPayment;
