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
import { DotPulse } from "@uiball/loaders";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ForgotPassword() {
  const { mutate, isLoading, isSuccess } = usePasswordReset();
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
    <div className="bg-[#F2F2F2] min-h-screen flex items-center justify-center">
      <Link
        className="absolute top-0 left-0 text-xs font-medium hover:underline underline-offset-2 m-2"
        to={"/login"}
        replace
      >
        Back to Login
      </Link>
      <Card className="flex items-center justify-center p-8">
        <CardHeader>
          <Lottie
            animationData={forgotPassword}
            className="w-[300px] h-[300px]"
          />
        </CardHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="flex flex-col items-center gap-4 h-full p-8">
            <div className="flex flex-col items-center justify-center gap-2">
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
            </div>
            <Button className="w-full text-xs font-semibold bg-[#222222] text-white rounded-full ">
              {isLoading ? (
                <DotPulse size={15} color="#FFF" />
              ) : (
                "Reset your password"
              )}
            </Button>
            {isSuccess && (
              <Alert>
                <AlertTitle className="text-xs font-semibold">
                  Heads up!
                </AlertTitle>
                <AlertDescription className="text-xs font-medium text-zinc-700">
                  After changing your password you can now proceed to the login
                  page.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
