import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

type TData = {
  paymentStatus: "success" | "reject";
  _id: string;
};

function useVerifyPayment() {
  return useMutation({
    mutationFn: async (data: TData) => {
      return await axiosPrivateRoute.patch(
        "/api/payments/update-payment-status",
        { ...data }
      );
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(data) {
      console.log(data);
    },
  });
}

export default useVerifyPayment;
