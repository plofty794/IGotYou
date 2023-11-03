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
    document.title = "IGotYou - Forgot Password";
  }, []);

  function handleFormSubmit(data: EmailSchema) {
    mutate(data);
  }

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex flex-col gap-4 items-center justify-center">
      <Card className="flex items-center justify-center p-8">
        <CardHeader>
          <Lottie
            animationData={forgotPassword}
            className="w-[300px] h-[300px]"
          />
        </CardHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="flex flex-col items-center gap-4 h-full p-8">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-2xl font-bold text-[#222222]">
                Forgot your password?
              </span>
              <Input
                {...register("email")}
                autoFocus
                placeholder="Enter your email"
                className="border-black text-xs font-medium"
              />
              {errors.email && <ErrorMessage message={errors.email?.message} />}
              <Button
                disabled={isPending || !!errors.email?.message}
                size={"lg"}
                className="px-8 w-full text-xs font-semibold bg-gray-950 text-white rounded-full"
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
              <Alert className="shadow-xl">
                <AlertTitle className="text-sm font-bold text-[#00B6AC]">
                  Heads up!
                </AlertTitle>
                <AlertDescription className="w-[400px] text-xs font-medium text-zinc-700">
                  After changing your password from the provided password reset
                  link, you can now proceed to the login page.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </form>
      </Card>
      <Button
        size={"lg"}
        variant={"link"}
        className="text-[#222222] font-semibold"
      >
        <Link to={"/login"} replace>
          Go back
        </Link>
      </Button>
    </div>
  );
}

export default ForgotPassword;
