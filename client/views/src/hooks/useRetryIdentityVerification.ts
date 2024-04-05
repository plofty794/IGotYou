import { axiosPrivateRoute } from "@/api/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useRetryIdentityVerification() {
  return useMutation({
    mutationFn: async (userID: string) => {
      return await axiosPrivateRoute.patch(
        `/api/users/retry-verification/${userID}`,
      );
    },

    onSuccess() {
      document.location.reload();
    },
    onError(error) {
      toast({
        title: "Oops! Re-attempt failed.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .message,
        variant: "destructive",
      });
    },
  });
}

export default useRetryIdentityVerification;
