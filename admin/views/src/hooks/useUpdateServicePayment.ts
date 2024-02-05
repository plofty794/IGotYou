import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

type TUpdateServicePayment = {
  paymentType: string;
  paymentStatus: string;
  partialPaymentVerificationStatus: string;
  fullPaymentVerificationStatus: string;
  status: string;
  reservationID: string;
};

function useUpdateServicePayment() {
  return useMutation({
    mutationFn: async (data: TUpdateServicePayment) => {
      return await axiosPrivateRoute.patch(
        `/api/reservations/update-payment/${data.reservationID}`,
        {
          ...data,
        }
      );
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useUpdateServicePayment;
