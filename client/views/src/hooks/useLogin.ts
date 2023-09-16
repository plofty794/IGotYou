import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { LoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await axiosRoute.post("/api/users/login", { ...data });
    },
    onSuccess() {
      toast({ description: "Logged in successfully." });
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

export default useLogin;