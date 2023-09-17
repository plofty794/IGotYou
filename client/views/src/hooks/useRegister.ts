import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type TRegister = {
  email: string;
  password: string;
};

export function useRegister() {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: TRegister) => {
      return await axiosRoute.post("/api/users/register", { ...data });
    },
    onSuccess(res) {
      toast({ description: "User created successfully.", variant: "default" });
      toast({
        description: "An email verification has been sent to your email",
        variant: "default",
      });
      setUser(res.data.user);
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
