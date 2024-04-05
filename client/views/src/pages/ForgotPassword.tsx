import Lottie from "lottie-react";
import forgotPassword from "../assets/forgot-password.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EmailSchema, ZodEmailSchema } from "@/zod/emailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/partials/components/ErrorMessage";
import usePasswordReset from "@/hooks/usePasswordReset";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { dotPulse } from "ldrs";

dotPulse.register();

function ForgotPassword() {
  const { mutate, isPending, isSuccess } = usePasswordReset();
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm<EmailSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ZodEmailSchema),
  });

  useEffect(() => {
    document.title = "Forgot Password - IGotYou";
  }, []);

  function handleFormSubmit(data: EmailSchema) {
    mutate(data);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F2F2F2] max-sm:gap-2">
      <Card className="flex items-center justify-center p-8 max-md:flex-col max-md:p-4 max-sm:w-5/6">
        <CardHeader>
          <Lottie
            animationData={forgotPassword}
            className="h-2/6 w-80 max-md:w-44"
          />
        </CardHeader>
        <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="flex h-full flex-col items-center gap-4 p-8 max-sm:p-4">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <span className="max-md:2xl text-3xl font-bold max-sm:text-xl">
                Forgot your password?
              </span>
              <Input
                {...register("email")}
                autoComplete="off"
                autoFocus
                placeholder="Enter your email"
                className="w-full text-sm font-medium max-sm:p-2 max-sm:text-xs"
              />
              {errors.email && <ErrorMessage message={errors.email?.message} />}
              <Button
                disabled={isPending || !!errors.email?.message}
                size={"lg"}
                className="w-full rounded-full bg-gray-950 px-8 text-sm font-semibold max-sm:text-xs"
              >
                {isPending ? (
                  // Default values shown
                  <l-dot-pulse
                    size="35"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  "Reset your password"
                )}
              </Button>
            </div>
            {isSuccess && (
              <Alert className="w-[400px] shadow-xl">
                <AlertTitle className="text-base font-bold text-[#00B6AC]">
                  Heads up!
                </AlertTitle>
                <AlertDescription className="w-full text-xs font-bold text-gray-600">
                  After changing your password from the provided password reset
                  link, you can now proceed to the login page.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </form>
      </Card>
      <Button size={"lg"} variant={"link"} className="font-bold text-gray-950">
        <Link to={"/login"} replace>
          Go back
        </Link>
      </Button>
    </div>
  );
}

export default ForgotPassword;
