import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useBlockUser() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      blockedID,
      reason,
    }: {
      blockedID: string;
      reason: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/blocked-users/block-user/${blockedID}`,
        { reason },
      );
    },
    onSuccess() {
      sonnerToast.success("User has been blocked.");
      setTimeout(() => window.location.reload(), 1500);
    },
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Uh oh! Request not sent.",
        description: response.data.error,
      });
    },
  });
}

export default useBlockUser;
