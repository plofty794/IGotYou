import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema, ZodRegisterSchema } from "@/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { useRegister } from "@/hooks/useRegister";
import { dotPulse } from "ldrs";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
dotPulse.register();

function Register() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { mutate, isPending } = useRegister();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHidden2, setIsHidden2] = useState<boolean>(true);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ZodRegisterSchema),
  });

  async function handleRegister(data: RegisterSchema) {
    const { email, password } = data;
    try {
      mutate({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="ml-1 p-0 text-xs font-semibold text-gray-900 underline underline-offset-2"
              variant={"link"}
              size={"sm"}
            >
              Sign up
            </Button>
          </DialogTrigger>
          <DialogContent className="border border-slate-300 p-8 max-md:w-full">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center justify-center gap-4">
                <span className="h-20 w-20 max-lg:w-32 max-md:w-20">
                  <img
                    className="mx-auto block max-h-full max-w-full object-cover transition-all hover:scale-105"
                    loading="lazy"
                    src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                    alt="logo"
                  />
                </span>
                <span className="text-2xl font-semibold">
                  Sign up to IGotYou
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="mx-auto flex w-full flex-col gap-2 py-5"
              >
                <Label className="font-semibold text-gray-600" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  className="border-slate-400 font-medium"
                  autoComplete="off"
                  type="text"
                  {...register("email")}
                />
                {errors.email && (
                  <ErrorMessage message={errors.email.message} />
                )}
                <Label
                  className="font-semibold text-gray-600"
                  htmlFor="password"
                >
                  Password
                </Label>
                <span className="relative flex flex-col gap-2">
                  <Input
                    id="password"
                    className="border-slate-400 font-medium"
                    type={`${isHidden ? "password" : "text"}`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <ErrorMessage message={errors.password.message} />
                  )}
                  <div className="absolute right-0 top-0 flex w-max justify-between">
                    <Toggle
                      onPressedChange={(v) => setIsHidden(v)}
                      className="ml-auto rounded-full !bg-transparent p-2"
                      tabIndex={-1}
                    >
                      {isHidden ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </Toggle>
                  </div>
                </span>
                <Label
                  className="font-semibold text-gray-600"
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </Label>
                <span className="relative flex flex-col gap-2">
                  <Input
                    id="confirmPassword"
                    className="border-slate-400 font-medium"
                    type={`${isHidden2 ? "password" : "text"}`}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <ErrorMessage message={errors.confirmPassword.message} />
                  )}
                  <div className="absolute right-0 top-0 flex w-max justify-between">
                    <Toggle
                      onPressedChange={(v) => setIsHidden2(v)}
                      className="ml-auto rounded-full !bg-transparent p-2"
                      tabIndex={-1}
                    >
                      {isHidden2 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </Toggle>
                  </div>
                </span>
                <div className="mt-1 flex flex-col">
                  <Button
                    disabled={
                      isPending ||
                      !!errors.email?.message ||
                      !!errors.password?.message ||
                      !!errors.confirmPassword?.message
                    }
                    className="mt-1 rounded-full bg-gray-950 font-semibold"
                  >
                    {isPending ? (
                      <l-dot-pulse
                        size="30"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </div>
              </form>
            </div>
            <DialogFooter className="px-4 py-2 text-center text-xs font-semibold text-gray-600">
              Sign up and become a part of the conversation. Share your
              thoughts, ideas, and feedback with us and connect with others who
              share your interests.
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <DrawerRegister />
      )}
    </>
  );
}

function DrawerRegister() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useRegister();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHidden2, setIsHidden2] = useState<boolean>(true);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ZodRegisterSchema),
  });

  async function handleRegister(data: RegisterSchema) {
    const { email, password } = data;
    try {
      mutate({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="ml-1 p-0 text-xs font-semibold text-gray-900 underline underline-offset-2"
          variant={"link"}
          size={"sm"}
        >
          Sign up
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-10 text-left">
          <DrawerTitle>
            <span className="text-xl font-semibold">Sign up to IGotYou</span>
          </DrawerTitle>
          <DrawerDescription>
            Sign up and become a part of the conversation and connect with
            others who share your interests.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-10">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="mx-auto flex w-full flex-col gap-2 py-4"
          >
            <Label className="font-semibold text-gray-600" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="border-slate-400 font-medium"
              autoComplete="off"
              type="text"
              {...register("email")}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
            <Label className="font-semibold text-gray-600" htmlFor="password">
              Password
            </Label>
            <span className="relative flex flex-col gap-2">
              <Input
                id="password"
                className="border-slate-400 font-medium"
                type={`${isHidden ? "password" : "text"}`}
                {...register("password")}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
              <div className="absolute right-0 top-0 flex w-max justify-between">
                <Toggle
                  onPressedChange={(v) => setIsHidden(v)}
                  className="ml-auto rounded-full !bg-transparent p-2"
                  tabIndex={-1}
                >
                  {isHidden ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </Toggle>
              </div>
            </span>
            <Label
              className="font-semibold text-gray-600"
              htmlFor="confirmPassword"
            >
              Confirm password
            </Label>
            <span className="relative flex flex-col gap-2">
              <Input
                id="confirmPassword"
                className="border-slate-400 font-medium"
                type={`${isHidden2 ? "password" : "text"}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ErrorMessage message={errors.confirmPassword.message} />
              )}
              <div className="absolute right-0 top-0 flex w-max justify-between">
                <Toggle
                  onPressedChange={(v) => setIsHidden2(v)}
                  className="ml-auto rounded-full !bg-transparent p-2"
                  tabIndex={-1}
                >
                  {isHidden2 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </Toggle>
              </div>
            </span>
            <div className="mt-4 flex flex-col pb-0">
              <Button
                disabled={
                  isPending ||
                  !!errors.email?.message ||
                  !!errors.password?.message ||
                  !!errors.confirmPassword?.message
                }
                className="mt-1 rounded-full bg-gray-950 font-semibold"
              >
                {isPending ? (
                  <l-dot-pulse
                    size="30"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </div>
        <DrawerFooter className="px-10 pt-0">
          <DrawerClose asChild>
            <Button variant="outline" className="rounded-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Register;
