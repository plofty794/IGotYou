import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useUnSubscribeHosting() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async () => {
      return await axiosPrivateRoute.post(
        "/api/subscriptions/cancel-subscription",
      );
    },
    onSuccess(data) {
      sonnerToast.info(data.data.message as string);
      setTimeout(() => (window.location.href = "/"), 800);
    },
    onError(err) {
      const error = err as AxiosError;
      toast({
        title: "Oops! Unsubscribe cancelled.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}

export default useUnSubscribeHosting;
