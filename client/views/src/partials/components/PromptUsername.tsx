import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  PromptUsernameSchema,
  ZodPromptUsernameSchema,
} from "@/zod/promptUsernameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./ErrorMessage";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { dotPulse } from "ldrs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import wait from "../../assets/wait.json";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { useEffect } from "react";

dotPulse.register();

function PromptUsername() {
  const { mutate, isPending, isSuccess } = useUpdateUserProfile();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<PromptUsernameSchema>({
    mode: "onChange",
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(ZodPromptUsernameSchema),
  });

  async function usernameSubmit(data: PromptUsernameSchema) {
    mutate({ ...data });
  }

  useEffect(() => {
    if (isSuccess) {
      updateProfile(auth.currentUser!, { displayName: getValues("username") });
    }
  }, [getValues, isSuccess]);

  return (
    <section className="mt-16 flex flex-col items-center justify-center gap-2">
      <Card className="flex flex-col items-center border-0 shadow-none">
        <CardHeader>
          <Lottie animationData={wait} className="h-48 w-48" />
        </CardHeader>
        <CardContent>
          <h1 className="text-xl font-bold text-gray-600">
            Oops! You don't have a username yet.
          </h1>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-gray-950 p-6 text-lg font-semibold">
            Proceed
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Username</DialogTitle>
            <DialogDescription className="text-gray-600">
              Make your username here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(usernameSubmit)}>
            <div className="mt-4 flex flex-col gap-2">
              <Label htmlFor="username" className="font-semibold text-gray-600">
                Username
              </Label>
              <Input
                spellCheck="true"
                {...register("username")}
                id="username"
                autoComplete="off"
                className="col-span-3 capitalize"
              />
              {errors.username && (
                <ErrorMessage message={errors.username?.message} />
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button
                className="rounded-full bg-gray-950 text-sm font-medium"
                type="submit"
              >
                {isPending ? (
                  // Default values shown
                  <l-dot-pulse
                    size="30"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PromptUsername;
