import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { LoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";

function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await axiosRoute.post("/api/users/login", { ...data });
    },
    onSuccess() {
      toast({ description: "Logged in successfully." });
    },
    onError() {
      toast({
        title: "Oops! An error occurred.",
        description: "Email doesn't exist",
        variant: "destructive",
      });
    },
  });
}

export default useLogin;
