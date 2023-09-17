import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema, ZodRegisterSchema } from "@/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/partials/ErrorMessage";
import { useRegister } from "@/hooks/useRegister";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { actionCodeSettings, auth } from "@/firebase config/config";
import { useAccessTokenStore } from "@/store/accessTokenStore";

function Register() {
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const { mutate, isLoading } = useRegister();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ZodRegisterSchema),
  });

  auth.currentUser?.getIdToken().then((res) => console.log(res));

  async function handleRegister(data: RegisterSchema) {
    const { email, password } = data;
    try {
      mutate({ email, password });
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(user, actionCodeSettings);
      user.getIdToken().then((token) => setAccessToken(token));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className=" bg-neutral-900 flex flex-col gap-2 rounded-md py-5 w-full mx-auto"
        >
          <Label className="text-xs" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="border-slate-700 bg-stone-950 text-xs"
            autoFocus
            autoComplete="username"
            type="text"
            {...register("email")}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
          <Label className="text-xs" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="border-slate-700 bg-stone-950 text-xs"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <Label className="text-xs" htmlFor="confirmPassword">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            className="border-slate-700 bg-stone-950 text-xs"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
          <div className="mt-2 flex flex-col">
            <Button className="bg-green-700 hover:bg-green-600 mt-1 text-xs">
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
