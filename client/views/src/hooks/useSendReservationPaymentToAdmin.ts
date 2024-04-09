import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

function useSendReservationPaymentToAdmin() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      paymentRefNo,
      paymentType,
      expectedPaymentAmount,
      paymentProofPhoto,
    }: {
      paymentRefNo?: string;
      paymentType?: string;
      expectedPaymentAmount?: string;
      paymentProofPhoto?: {
        public_id: string;
        secure_url: string;
        thumbnail_url: string;
      };
    }) => {
      return await axiosPrivateRoute.post(
        `/api/reservations/send-payment/${reservationID}`,
        {
          paymentRefNo,
          paymentType,
          expectedPaymentAmount,
          paymentProofPhoto,
        },
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
      sonnerToast.success(data.data.message);
    },
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Uh oh! Payment failed.",
        description: response.data.error,
      });
    },
  });
}

export default useSendReservationPaymentToAdmin;
