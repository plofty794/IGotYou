import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
    <section className="pt-52 flex flex-col items-center justify-center gap-4">
      <Alert className="w-max font-medium shadow border">
        <InfoCircledIcon className="mt-2 h-5 w-5" />
        <div className="ml-2 p-2 pb-0">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription className="text-xs text-zinc-500">
            We've noticed you don't have a username.
          </AlertDescription>
        </div>
      </Alert>
      <Dialog>
        <DialogTrigger className="text-xs py-2 px-3 font-medium rounded-md bg-[#222222] text-white">
          Click here to proceed
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
                    size="43"
                    speed="1.3"
                    color="black"
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
