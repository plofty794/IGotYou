import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminLoginSchema, ZodAdminLoginSchema } from "@/zod/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/partials/ErrorMessage";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useAdminLogin from "@/hooks/useAdminLogin";
import { dotPulse } from "ldrs";
import { useEffect } from "react";
dotPulse.register();

function Login() {
  const { mutate, isPending } = useAdminLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(ZodAdminLoginSchema),
  });

  useEffect(() => {
    document.title = "IGotYou - Admin Login";
  }, []);

  async function handleFormSubmit(data: AdminLoginSchema) {
    mutate(data);
  }

  return (
    <>
      <main className="bg-hero-image min-h-screen flex items-center justify-center p-8">
        <section className="flex w-2/6 max-md:w-2/4 max-sm:w-full">
          <Card className="flex flex-col gap-12 py-12 w-full">
            <div className="flex flex-col items-center justify-center gap-6 px-4">
              <span>
                <img
                  className="w-[40px] h-[40px]"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
              <h1 className="font-semibold text-2xl text-gray-800">
                Sign in to IGotYou - Admin
              </h1>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <CardContent className="flex flex-col gap-2 px-6">
                <Label className="font-semibold text-zinc-600">Username</Label>
                <Input
                  {...register("username")}
                  autoFocus
                  className="border-gray-300"
                />
                {errors.username && (
                  <ErrorMessage message={errors.username?.message} />
                )}
                <Label className="font-semibold text-zinc-600">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  className="border-gray-300"
                />
                {errors.password && (
                  <ErrorMessage message={errors.password?.message} />
                )}
              </CardContent>
              <CardFooter className="pb-4">
                <Button
                  disabled={
                    !!errors.password?.message || !!errors.username?.message
                  }
                  size={"lg"}
                  className="w-full rounded-full bg-gray-950"
                >
                  {isPending ? (
                    <l-dot-pulse
                      size="35"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    "Sign in as Admin"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </section>
      </main>
    </>
  );
}

export default Login;
