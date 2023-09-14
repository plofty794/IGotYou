import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, ZodLoginSchema } from "@/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/useLogin";
import { Toaster } from "@/components/ui/toaster";

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
    <div className="text-white min-h-screen flex flex-col gap-5 justify-center items-center bg-neutral-950">
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
          className="border border-slate-700 bg-neutral-900 flex flex-col gap-2 rounded-md px-4 py-5 w-80 mx-auto"
        >
          <Label htmlFor="email">Email</Label>
          <Input
            className="border-slate-700 bg-stone-950 text-xs"
            autoFocus
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
          )}
          <Label htmlFor="password">Password</Label>
          <Input
            className="border-slate-700 bg-stone-950 text-xs"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-xs">{errors.password.message}</p>
          )}
          <Button className="bg-green-700 hover:bg-green-600 mt-3 text-xs">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="border border-slate-700 text-xs rounded py-4 px-12">
          <p>
            New to GitHub?{" "}
            <span>
              <Link className="text-blue-600 hover:underline" to={"/register"}>
                Create an account.
              </Link>
            </span>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
