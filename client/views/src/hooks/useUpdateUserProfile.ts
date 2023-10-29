import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/axios/axiosRoute";

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
  photoUrl?: string;
};

function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams();
  return useMutation({
    mutationFn: async (data: TUserUpdates) => {
      return await axiosPrivateRoute.patch(`/api/users/current-user/update`, {
        ...data,
      });
    },
    onSuccess(_, variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", id], (prevData: any) => {
        return { data: { user: { ...prevData.data.user, ...variables } } };
      });
      toast({
        description: "Profile has been updated",
        className: "bg-[#FFF] text-[#222222]",
        color: "#FFF",
      });
    },
    onError(err) {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.message,
        variant: "destructive",
      });
    },
  });
}

export default useUpdateUserProfile;
