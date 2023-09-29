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
import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuth, auth } from "@/firebase config/config";
import { DotPulse } from "@uiball/loaders";

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

  async function handleGoogleSignIn() {
    const { user } = await signInWithPopup(auth, GoogleAuth);
    console.log(user);
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col gap-5 justify-center items-center">
      <Link
        to={"/get-started"}
        className="font-medium absolute top-0 left-0 text-xs p-2 hover:underline"
      >
        Back to Homepage
      </Link>
      <div className="flex gap-1 font-medium">
        <h1 className="text-lg text-center">Sign in to </h1>

        <CrumpledPaperIcon width={25} height={25} />
      </div>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white flex flex-col gap-2 border border-slate-300 rounded-md shadow px-4 py-5 w-80 mx-auto"
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
          <Button className="bg-[#222222] hover:bg-[#2d2d2d] mt-3 text-xs font-semibold">
            {isLoading ? (
              <DotPulse size={25} speed={1} color="white" />
            ) : (
              "Sign in"
            )}
          </Button>
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="text-[#222222] border border-black hover:bg-[#F2F2F2] mt-2 text-xs font-semibold"
          >
            <img
              width={20}
              height={20}
              className="mr-2"
              loading="lazy"
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              alt="Google logo"
            />{" "}
            Continue with Google
          </Button>
        </form>
        <div className="bg-white flex items-center justify-center border border-slate-300 shadow text-xs rounded py-4 px-8">
          <p className="font-semibold">New to IGotYou? </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="text-[#9D54FC] p-0 ml-1 font-semibold"
                variant={"link"}
                size={"sm"}
              >
                Create an account
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-slate-300 sm:max-w-[390px]">
              <DialogHeader>
                <DialogTitle className="text-lg text-center">
                  Sign up to{" "}
                  <CrumpledPaperIcon
                    className="inline-block"
                    width={25}
                    height={25}
                  />
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
