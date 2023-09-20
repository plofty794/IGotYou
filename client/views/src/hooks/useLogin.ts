import { axiosRoute } from "@/axios/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useUserStore } from "@/store/userStore";
import { LoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";

function useLogin() {
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await axiosRoute.post("/api/users/login", { ...data });
    },
    onSuccess(res, variables) {
      signInWithEmailAndPassword(
        auth,
        variables.email,
        variables.password
      ).then((value) => {
        setUser({ ...res.data.user, isAnonymous: value.user.isAnonymous });
        toast({
          title: `Welcome, ${res.data.user.username} 👋`,
          className: "bg-[#F2F2F2]",
        });
      });
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
