import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema, ZodRegisterSchema } from "@/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/partials/ErrorMessage";
import { useRegister } from "@/hooks/useRegister";

function Register() {
  const { mutate, isLoading } = useRegister();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ZodRegisterSchema),
  });

  async function handleRegister(data: RegisterSchema) {
    const { username, email, password } = data;
    try {
      mutate({ username, email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-2 py-5 w-full mx-auto"
        >
          <Label className="text-xs font-semibold" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            className="border-slate-700 text-xs font-medium"
            autoFocus
            autoComplete="username"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <ErrorMessage message={errors.username.message} />
          )}
          <Label className="text-xs font-semibold" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="border-slate-700 text-xs font-medium"
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
          <Label className="text-xs font-semibold" htmlFor="confirmPassword">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            className="border-slate-700 text-xs font-medium"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
          <div className="mt-1 flex flex-col">
            <Button className="bg-[#222222] hover:bg-[#2d2d2d] mt-1 text-xs">
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
