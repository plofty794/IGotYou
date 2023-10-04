import { axiosPrivate } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

type TRegister = {
  email: string;
  password: string;
};

export function useRegister() {
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: TRegister) => {
      return await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    },
    onSuccess: async (res, variables) => {
      const { user } = res;
      try {
        const { data } = await axiosPrivate.post("/api/users/register", {
          ...variables,
          providerId: user.providerData[0].providerId,
        });
        return setUser({ ...data.user });
      } catch (err) {
        const error = err as AxiosError;
        toast({
          title: "Oops! An error occurred.",
          description: (error.response as AxiosResponse).data.message,
          variant: "destructive",
        });
      }
    },
    onError(err) {
      const error = err as FirebaseError;
      const message = (
        error.code.split("/")[1].slice(0, 1).toUpperCase() +
        error.code.split("/")[1].slice(1)
      )
        .split("-")
        .join(" ");
      toast({
        title: "Oops! An error occurred.",
        description: message,
        variant: "destructive",
      });
    },
  });
}
