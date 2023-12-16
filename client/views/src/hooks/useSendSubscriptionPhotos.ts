import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { TSubscriptionPhotos } from "@/root layouts/SubscriptionLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

function useSendSubscriptionPhotos() {
  const { toast } = useToast();
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TSubscriptionPhotos) => {
      return await axiosPrivateRoute.post(
        "/api/payments/send-subscription-photos",
        {
          paymentProofPhoto: data.payment_proof.secure_url,
          identityCredential: data.government_id.secure_url,
          subscriptionStatus: "pending",
          paymentStatus: "pending",
        }
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
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
      if (error.response?.status === 401) {
        const token = await auth.currentUser?.getIdToken();
        localStorage.clear();
        token && localStorage.setItem("token", token);
      }
    },
  });
}

export default useSendSubscriptionPhotos;
