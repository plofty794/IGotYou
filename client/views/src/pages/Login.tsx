import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, ZodLoginSchema } from "@/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../node_modules/@geoapify/geocoder-autocomplete/styles/minimal.css";
import useLogin from "@/hooks/useLogin";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Register from "../partials/components/Register";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { useEffect } from "react";

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase config/config";

function Login() {
  useEffect(() => {
    document.title = "IGotYou - Sign in";
  }, []);

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
    // const {email, password} = data
    mutate(data);
  }

  return (
    <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
      <Link
        to={"/get-started"}
        className="font-medium absolute top-0 left-0 text-xs p-2 hover:underline"
      >
        Back to Homepage
      </Link>
      <div className="font-medium">
        <h1 className="text-lg text-center mb-2">
          Sign in to{" "}
          <span className="font-bold text-2xl text-[#222222]">IGotYou</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-2 border border-slate-300 rounded-md shadow px-4 py-5 w-80 mx-auto"
        >
          <Label className="text-xs font-semibold" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="border-slate-700 text-xs font-medium"
            autoFocus
            autoComplete="email"
            type="text"
            {...register("email")}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
          <Label className="text-xs font-semibold" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="border-slate-700 text-xs font-medium"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <Button className="bg-[#222222] hover:bg-[#2d2d2d] mt-3 text-xs">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="flex items-center justify-center border border-slate-300 shadow text-xs rounded py-4 px-8">
          <p className="font-semibold">New to IGotYou? </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="text-white ml-1 font-semibold bg-[#222222] hover:bg-[#2d2d2d]"
                variant={"secondary"}
                size={"sm"}
              >
                Create an account
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-slate-300 sm:max-w-[390px]">
              <DialogHeader>
                <DialogTitle className="text-lg text-center">
                  Sign up to{" "}
                  <span className="font-bold text-2xl text-[#222222]">
                    IGotYou
                  </span>
                </DialogTitle>
              </DialogHeader>
              <Register />
              <DialogFooter className="text-center text-xs font-medium">
                Sign up and become a part of the conversation. Share your
                thoughts, ideas, and feedback with us and connect with others
                who share your interests.
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Login;
