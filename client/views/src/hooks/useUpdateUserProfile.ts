import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";

type TUserUpdates = {
  email?: string;
  username?: string;
  hostStatus?: boolean;
  work?: string;
  address?: string;
  funFact?: string;
  school?: string;
  emailVerified?: boolean;
  mobilePhone?: string;
  mobileVerified?: boolean;
};

function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const [ID, setID] = useState<string | null>(null);

  useEffect(() => {
    const ID = localStorage.getItem("ID");
    ID && setID(ID);
  }, []);

  return useMutation({
    mutationFn: async (data: TUserUpdates) => {
      return axiosPrivate.patch(`/api/users/update/${ID}`, { ...data });
    },
    onSuccess(_, variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", ID && ID], (prevData: any) => {
        return { data: { ...prevData.data, ...variables } };
      });
      toast({
        description: "Profile has been updated",
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

export default useUpdateUserProfile;
