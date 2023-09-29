import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase config/config";

type TUserUpdates = {
  address?: string;
  school?: string;
  work?: string;
  funFact?: string;
  email_verified: boolean;
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
      await sendEmailVerification(auth.currentUser!);
      await auth.currentUser?.reload();
      await auth.updateCurrentUser(auth.currentUser);
      return axiosPrivate.patch(`/api/users/update/${ID}`, { ...data });
    },
    onSuccess: async (_, variables) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", ID && ID], (prevData: any) => {
        return { data: { ...prevData.data, ...variables } };
      });
      toast({
        title: "Verification email has been sent",
        description: "Reload this page after verifying your email",
        className: "bg-[#F2F2F2]",
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
