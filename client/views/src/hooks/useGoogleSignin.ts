import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuth, auth } from "@/firebase config/config";
import { FirebaseError } from "firebase/app";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";

function useGoogleSignin() {
  const setUser = useUserStore((state) => state.setUser);
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: async () => {
      return await signInWithPopup(auth, GoogleAuth);
    },
    onSuccess: async (res) => {
      const { user } = res;
      const { data } = await axiosPrivate.post("/api/users/login/google", {
        username: user.displayName,
        email: user.email,
        providerId: user.providerData[0].providerId,
        emailVerified: user.emailVerified,
      });
      return setUser({ ...data.user });
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

export default useGoogleSignin;
