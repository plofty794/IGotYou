import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useUserStore } from "@/store/userStore";
import { LoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

function useLogin() {
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await signInWithEmailAndPassword(auth, data.email, data.password);
    },
    onSuccess: async (res, variables) => {
      const { user } = res;
      try {
        const { data } = await axiosRoute.post("/api/users/login", {
          ...variables,
          providerId: user.providerData[0].providerId,
        });
        data.user.username &&
          toast({
            title: `Welcome, ${data.user.username} 👋`,
            className: "bg-[#FFF] text-[#222222]",
          });
        return setUser({ ...data.user });
      } catch (err) {
        const error = err as AxiosError;
        toast({
          title: "Oops! An error occurred.",
          description: (error.response as AxiosResponse).data.error,
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

export default useLogin;
