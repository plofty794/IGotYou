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

dotPulse.register();

function PromptUsername() {
  const { mutate, isPending } = useUpdateUserProfile();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PromptUsernameSchema>({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(ZodPromptUsernameSchema),
  });

  function usernameSubmit(data: PromptUsernameSchema) {
    mutate({ ...data });
  }

  return (
    <section className="mt-12 flex flex-col items-center justify-center gap-4">
      <Card className="flex flex-col items-center">
        <CardHeader>
          <Lottie animationData={wait} className="w-40 h-40" />
        </CardHeader>
        <CardContent>
          <h1 className="text-base font-semibold text-gray-500">
            Oops! We noticed you don't have a username yet.
          </h1>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-xs font-semibold bg-gray-950 text-white">
            Click here to proceed
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Add Username</DialogTitle>
            <DialogDescription>
              Make your username here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(usernameSubmit)}>
            <div className="mt-4 flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                id="username"
                className="col-span-3"
              />
              {errors.username && (
                <ErrorMessage message={errors.username?.message} />
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button
                className="text-xs font-medium bg-[#222222] text-white"
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
