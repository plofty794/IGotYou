import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useSendReservationPaymentToAdmin() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();
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
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
    },
    onError(error?) {
      console.error(error);
    },
  });
}

export default useSendReservationPaymentToAdmin;
