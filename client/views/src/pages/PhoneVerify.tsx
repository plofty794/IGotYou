import { Button, buttonVariants } from "@/components/ui/button";
import OtpInput from "react-otp-input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { auth } from "@/firebase config/config";
import Lottie from "lottie-react";
import messageSent from "../assets/messageSent.json";
import sending from "../assets/sending.json";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

function VerifyPhone() {
  const [ID, setID] = useState<string | null>(null);
  const [mobilePhone, setMobilePhone] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [OTP, setOTP] = useState("");

  useEffect(() => {
    const ID = localStorage.getItem("ID");
    ID && setID(ID);
  }, []);

  async function sendOTP() {
    if (!mobilePhone)
      return toast({
        description: "Mobile phone is required",
        variant: "destructive",
      });
    try {
      const reCaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      const confirm = await signInWithPhoneNumber(
        auth,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        "+63" + mobilePhone,
        reCaptcha
      );
      setConfirmation(confirm);
    } catch (error) {
      setConfirmation(null);
      console.error(error);
    }
  }

  async function verifyOTP() {
    try {
      const User = await confirmation?.confirm(OTP);
      console.log(User);
      toast({
        title: "Success!",
        description: "Mobile phone has been verified.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Oops! An error occurred.",
        description: "OTP is expired",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <main className="bg-[#F2F2F2] min-h-screen flex flex-col gap-2 items-center justify-center">
        <section className="flex items-center"></section>
        {confirmation ? (
          <Card className="px-12 py-2">
            <CardHeader className="text-3xl font-semibold">
              We sent you a code
              <Lottie
                className="w-[100px] h-[100px] mx-auto"
                animationData={messageSent}
                loop={true}
              />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <Label className="font-medium text-sm">
                Enter OTP below to verify your mobile phone
              </Label>
              <OtpInput
                inputStyle={
                  "text-3xl mr-2 outline-none border-b-black border-b"
                }
                value={OTP}
                onChange={setOTP}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
              />
              <div className="flex gap-3 mt-4">
                <Button
                  className="bg-[#222222] text-white w-max font-medium"
                  onClick={verifyOTP}
                >
                  Verify OTP
                </Button>
                <Link
                  to={`/users/show/${ID}`}
                  className={`bg-[#222222] text-white w-max font-medium ${buttonVariants(
                    {}
                  )}`}
                >
                  Go back
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="px-8 py-2">
              <CardHeader className="text-2xl font-semibold p-4">
                Verify your mobile phone
                <Lottie
                  className="w-[120px] h-[120px] mx-auto"
                  animationData={sending}
                  loop={true}
                />
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-2">
                <Input
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  autoFocus
                  placeholder="Enter your mobile phone"
                />
                <div className="flex flex-col gap-3 mt-3">
                  <div id="recaptcha-container"></div>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      className="bg-[#222222] text-white w-max font-medium"
                      onClick={sendOTP}
                    >
                      Send OTP
                    </Button>
                    <Link
                      to={`/users/show/${ID}`}
                      className={`bg-[#222222] text-white w-max font-medium ${buttonVariants(
                        {}
                      )}`}
                    >
                      Go back
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </>
  );
}

export default VerifyPhone;

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}
