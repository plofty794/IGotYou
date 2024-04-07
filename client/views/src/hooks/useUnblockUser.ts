import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useUnblockUser() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ blockedID }: { blockedID: string }) => {
      return await axiosPrivateRoute.patch(
        `/api/blocked-users/unblock-user/${blockedID}`,
      );
    },
    onSuccess() {
      sonnerToast.success("User has been unblocked.");
      setTimeout(() => document.location.reload(), 1500);
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

export default useUnblockUser;
