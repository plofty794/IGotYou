import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { FirebaseError } from "firebase/app";

type TUserUpdates = {
  address?: string;
  school?: string;
  work?: string;
  funFact?: string;
  emailVerified?: boolean;
};

function useVerifyEmail() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const [ID, setID] = useState<string | null>(null);

  useEffect(() => {
    const ID = localStorage.getItem("ID");
    ID && setID(ID);
  }, []);

  return useMutation({
    mutationFn: async (data: TUserUpdates) => {
      try {
        await sendEmailVerification(auth.currentUser!);
        await auth.currentUser?.reload();
        await auth.updateCurrentUser(auth.currentUser);
        return axiosPrivate.patch(`/api/users/update/${ID}`, { ...data });
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
    onSuccess: async (_, variables) => {
      console.log("Success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", ID && ID], (prevData: any) => {
        return { data: { ...prevData.data, ...variables } };
      });
      toast({
        title: "Verification email has been sent",
        description: "Reload this page after verifying your email",
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
  });
}

export default useVerifyEmail;
