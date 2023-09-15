import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";

function Register() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <form className=" bg-neutral-900 flex flex-col gap-2 rounded-md py-5 w-full mx-auto">
          <Label className="text-xs" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            className="border-slate-700 bg-stone-950 text-xs"
            autoFocus
            autoComplete="username"
            type="text"
            // {...register("email")}
          />
          {/* {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
          )} */}
          <Label className="text-xs" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="border-slate-700 bg-stone-950 text-xs"
            autoFocus
            autoComplete="email"
            type="text"
            // {...register("email")}
          />
          {/* {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
          )} */}

          <Label className="text-xs" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="border-slate-700 bg-stone-950 text-xs"
            type="password"
            // {...register("password")}
          />
          {/* {errors.password && (
            <p className="text-red-600 text-xs">{errors.password.message}</p>
          )} */}
          <Label className="text-xs" htmlFor="confirmPassword">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            className="border-slate-700 bg-stone-950 text-xs"
            type="password"
            // {...register("password")}
          />
          {/* {errors.password && (
            <p className="text-red-600 text-xs">{errors.password.message}</p>
          )} */}
          <Label className="text-xs" htmlFor="mobileNumber">
            Phone number
          </Label>
          <Input
            id="mobileNumber"
            className="border-slate-700 bg-stone-950 text-xs"
            inputMode="tel"
            type="tel"
            // {...register("password")}
          />
          {/* {errors.password && (
            <p className="text-red-600 text-xs">{errors.password.message}</p>
          )} */}
          <Button className="bg-green-700 hover:bg-green-600 mt-3 text-xs">
            {/* {isLoading ? "Signing in..." : "Sign in"} */}
            Sign up
          </Button>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default Register;
