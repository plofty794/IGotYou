import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, ZodLoginSchema } from "@/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/useLogin";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Register from "./Register";
import ErrorMessage from "@/partials/ErrorMessage";

function Login() {
  const { mutate, isLoading } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(ZodLoginSchema),
  });

  function handleLogin(data: LoginSchema) {
    mutate(data);
  }

  return (
    <div className="text-white min-h-screen flex flex-col gap-5 justify-center items-center bg-[#0C1015]">
      <Link
        to={"/"}
        className="text-white absolute top-0 left-0 text-xs p-2 hover:underline"
      >
        Back to Homepage
      </Link>
      <h1 className="text-xl text-center">
        Sign in to <span className="text-lg font-pacifico">IGotYou</span>
      </h1>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="border border-slate-700 bg-[#161B22] flex flex-col gap-2 rounded-md px-4 py-5 w-80 mx-auto"
        >
          <Label className="text-xs" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="border-slate-700 bg-[#0D1117] text-xs"
            autoFocus
            autoComplete="email"
            type="text"
            {...register("email")}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
          <Label className="text-xs" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="border-slate-700 bg-[#0D1117] text-xs"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <Button className=" bg-[#7E44C5] hover:bg-[#8b53ce] mt-3 text-xs">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="border border-slate-700 text-xs rounded py-4 px-8">
          <p>
            New to IGotYou?{" "}
            <span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="font-bold ml-1"
                    variant={"outline"}
                    size={"sm"}
                  >
                    Create an account
                  </Button>
                </DialogTrigger>
                <DialogContent className="text-white border border-slate-700 bg-neutral-900 sm:max-w-[390px]">
                  <DialogHeader>
                    <DialogTitle>
                      <header className="font-normal text-xl text-center">
                        Sign up to{" "}
                        <span className="font-bold text-lg font-pacifico">
                          IGotYou
                        </span>
                      </header>
                    </DialogTitle>
                  </DialogHeader>
                  <Register />
                  <DialogFooter className="text-center text-xs text-white">
                    Sign up and become a part of the conversation. Share your
                    thoughts, ideas, and feedback with us and connect with
                    others who share your interests.
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
