import { axiosPrivateRoute } from "@/axios/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { LoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

function useLogin() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await signInWithEmailAndPassword(auth, data.email, data.password);
    },
    onSuccess: async (res, variables) => {
      const { user } = res;
      try {
        const { data } = await axiosPrivateRoute.post("/api/users/login", {
          ...variables,
        });
        data.user.username &&
          toast({
            title: `Ahoy there, ${data.user.username}!`,
            description: "We're so glad to have you back. 👋",
            className: "font-medium bg-[#FFF] text-[#222222]",
          });
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
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
