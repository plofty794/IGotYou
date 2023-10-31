import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/axios/axiosRoute";
import { auth } from "@/firebase config/config";

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
    onError: async (err) => {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        await auth.signOut();
        localStorage.clear();
        queryClient.removeQueries(["profile"]);
        queryClient.removeQueries(["listings"]);
        toast({
          title: "Oops! An error occurred.",
          description: "This resource requires an identifier.",
          variant: "destructive",
        });
      }
    },
  });
}

export default useUpdateUserProfile;
