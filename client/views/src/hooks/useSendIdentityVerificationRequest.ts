import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useSendIdentityVerificationRequest() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: string) => {
      return await axiosPrivateRoute.post("/api/identity-photo/verification", {
        identityPhoto: data,
      });
    },
    onSuccess() {
      sonnerToast.success("Identity photo has been sent.");
      queryClient.invalidateQueries({
        queryKey: ["profile", auth.currentUser?.uid],
      });
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

export default useSendIdentityVerificationRequest;
