import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { EmailSchema } from "@/zod/emailSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { toast as sonnerToast } from "sonner";
import { FirebaseError } from "firebase/app";

function usePasswordReset() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: EmailSchema) => {
      return await axiosPrivateRoute.post(
        "/api/users/email-check",
        {
          ...data,
        },
        {},
      );
    },
    onSuccess: async (_, variables) => {
      try {
        await sendPasswordResetEmail(auth, variables.email);
        sonnerToast.info("Password reset email sent.", {
          description:
            "Please check your email for a link to reset your password.",
        });
      } catch (error) {
        const err = error as FirebaseError;
        const message = (
          err.code.split("/")[1].slice(0, 1).toUpperCase() +
          err.code.split("/")[1].slice(1)
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
    onError: async (err) => {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}

export default usePasswordReset;
