import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type TRegister = {
  username: string;
  password: string;
};

export function useRegister() {
  return useMutation({
    mutationFn: async (data: TRegister) => {
      return await axiosRoute.post("/api/users/register", { ...data });
    },
    onSuccess() {
      toast({ description: "User created successfully." });
    },
    onError(err) {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}
