import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { FunFactSchema, ZodFunFactSchema } from "@/zod/funFactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RocketIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { QueryState, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { useParams } from "react-router-dom";

type TData = {
  user: {
    email: string;
    username: string;
    userStatus: string;
    work?: string;
    address?: string;
    funFact?: string;
    school: string;
  };
};

function FunFact() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FunFactSchema>({
    defaultValues: {
      funFact: "",
    },
    resolver: zodResolver(ZodFunFactSchema),
  });
  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfile();
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TData>>(["profile", id]);

  function handleFunFactSubmit(data: FunFactSchema) {
    mutate({ funFact: data.funFact });
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full border font-medium hover:bg-[#e9e9e9] ${
          data?.data?.user.funFact ? "text-xs" : "text-sm"
        }
           flex items-center justify-start rounded py-8 pl-4 pr-6 shadow-md`}
      >
        <span className="mr-2">
          <RocketIcon color="black" width={25} height={25} />
        </span>
        <p className="text-zinc-500">
          {data?.data?.user.funFact
            ? `Fun Fact about you: ${data?.data?.user.funFact}`
            : "My Fun Fact"}
        </p>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#222222]">
            {data?.data?.user.funFact
              ? "Fun fact about you"
              : "What's a fun fact about you?"}
          </DialogTitle>
        </DialogHeader>
        {data?.data?.user.funFact ? (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">
              {data?.data?.user.funFact}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => mutate({ funFact: "" })}
                className="rounded-full bg-[#222222] font-medium text-white"
                size={"lg"}
                variant={"secondary"}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleFunFactSubmit)} className="mt-4">
            <Label className="text-sm font-medium" htmlFor="funFact">
              Your Fun Fact
            </Label>
            <Input
              autoComplete="off"
              {...register("funFact")}
              type="text"
              id="funFact"
              className="mb-2"
            />
            {errors.funFact && (
              <ErrorMessage message={errors.funFact.message} />
            )}
            <div className="flex items-center gap-2 pt-2">
              <Button
                className="rounded-full bg-[#222222] font-medium text-white"
                size={"lg"}
                variant={"secondary"}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FunFact;
