import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { FirebaseError } from "firebase/app";
import { axiosPrivateRoute } from "@/api/axiosRoute";

type TUserUpdates = {
  address?: string;
  school?: string;
  work?: string;
  funFact?: string;
  emailVerified?: boolean;
};

function useVerifyEmail() {
  return useMutation({
    mutationFn: async (data: TUserUpdates) => {
      try {
        await sendEmailVerification(auth.currentUser!);
        axiosPrivateRoute.patch("/api/users/current-user/update/", {
          ...data,
        });
      } catch (err) {
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
      }
    },
    onSuccess: async () => {
      console.log("Success");
      toast({
        title: "Verification email has been sent",
        description:
          "Refresh this page then click the verify button again after verifying your email",
        className: "bg-[#FFF] text-[#222222]",
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
    onMutate: async () => {
      await auth.currentUser?.reload();
      await auth.updateCurrentUser(auth.currentUser);
    },
  });
}

export default useVerifyEmail;
