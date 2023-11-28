import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { axiosPrivateRoute } from "@/api/axiosRoute";
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
  const id = auth.currentUser?.uid;
  return useMutation({
    mutationFn: async (data: TUserUpdates) => {
      return await axiosPrivateRoute.patch(`/api/users/current-user/update`, {
        ...data,
      });
    },
    onSuccess(_, variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", id], (prevData: any) => {
        return {
          data: {
            activeListings: prevData.data.activeListings,
            user: {
              ...prevData.data.user,
              ...variables,
            },
          },
        };
      });
      toast({
        title: "Your profile has been updated successfully",
        className: "bg-[#FFF] text-[#222222]",
        color: "#FFF",
      });
    },
    onError: async (err) => {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        await auth.signOut();
        localStorage.clear();
        queryClient.removeQueries({ queryKey: ["profile"] });
        queryClient.removeQueries({ queryKey: ["listings"] });
        toast({
          title: "Oops! An error occurred.",
          description: "This resource requires an identifier.",
          variant: "destructive",
        });
      }
      if (error.response?.status === 409) {
        toast({
          title: "Oops! An error occurred.",
          description: (error.response as AxiosResponse).data.error,
          variant: "destructive",
        });
      }
    },
  });
}

export default useUpdateUserProfile;
