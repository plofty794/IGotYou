import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OtpInput from "react-otp-input";
import { Label } from "@radix-ui/react-label";
import { auth } from "@/firebase config/config";
import Lottie from "lottie-react";
import messageSent from "../assets/messageSent.json";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  linkWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Link, useLoaderData } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";
import { DotPulse } from "@uiball/loaders";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";

type TLoaderData = {
  user: {
    mobilePhone: string;
  };
};

function VerifyPhone() {
  const { mutate } = useUpdateUserProfile();
  const { data } = useLoaderData() as UseQueryResult<TLoaderData>;
  const mobilePhone = data?.user.mobilePhone;
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [OTP, setOTP] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = "IGotYou - Verify Phone";
    const Timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(Timeout);
  }, []);

  async function sendOTP() {
    try {
      const reCaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      const confirm = await linkWithPhoneNumber(
        auth.currentUser!,
        mobilePhone!,
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
      await confirmation?.confirm(OTP);
      mutate({ mobileVerified: true });
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
      {isLoaded ? (
        <main className="bg-[#F2F2F2] min-h-screen flex flex-col gap-2 items-center justify-center">
          <Link
            to={"/"}
            className={`bg-[#222222] text-white font-medium mx-auto ${buttonVariants(
              { size: "sm" }
            )}`}
          >
            Go back
          </Link>
          <section>
            {!confirmation ? (
              <Tabs defaultValue="send" className="w-[450px]">
                <TabsList className="grid w-full grid-cols-2 bg-[#e9e7e7]">
                  <TabsTrigger value="send">Send OTP</TabsTrigger>
                </TabsList>
                <TabsContent value="send">
                  <Card>
                    <CardHeader>
                      <CardDescription>
                        Send OTP to your mobile phone here. Click Send when
                        you're ready.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 pb-2">
                      <div className="space-y-1 text-center">
                        <Label
                          className="text-sm font-medium"
                          htmlFor="mobilePhone"
                        >
                          Mobile phone
                        </Label>
                        <p id="mobilePhone" className="text-lg font-medium">
                          {mobilePhone}
                        </p>
                      </div>
                      <div
                        id="recaptcha-container"
                        className="mx-auto w-max"
                      ></div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={sendOTP}
                        className="bg-[#222222] text-white p-6 font-medium mx-auto text-xl"
                      >
                        Send OTP
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="w-[450px]">
                <CardHeader>
                  <CardDescription>
                    Enter the OTP sent to your mobile phone here. Click Verify
                    when you're done.
                  </CardDescription>
                  <Lottie
                    className="w-[100px] h-[100px] mx-auto"
                    animationData={messageSent}
                  />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 flex flex-col items-center">
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={verifyOTP}
                    size={"lg"}
                    className="bg-[#222222] text-white font-medium mx-auto"
                  >
                    Verify OTP
                  </Button>
                </CardFooter>
              </Card>
            )}
          </section>
        </main>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <DotPulse color="#222222" size={50} />
        </div>
      )}
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
