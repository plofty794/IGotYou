import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";

type TRegister = {
  username: string;
  email: string;
  password: string;
};

export function useRegister() {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: TRegister) => {
      return await axiosRoute.post("/api/users/register", { ...data });
    },
    onSuccess(res, variables) {
      toast({ description: "User created successfully.", variant: "default" });
      createUserWithEmailAndPassword(
        auth,
        variables.email,
        variables.password
      ).then((value) => setUser({ ...res.data.user, uid: value.user.uid }));
    },
    onError(err) {
      const error = err as AxiosError;
      console.log(err);
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}
