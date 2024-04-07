import { axiosPrivateRoute } from "@/api/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TUpdateServicePayment = {
  paymentType: string;
  paymentStatus: string;
  partialPaymentVerificationStatus: string;
  fullPaymentVerificationStatus: string;
  status: string;
  reservationID: string;
};

function useUpdateServicePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TUpdateServicePayment) => {
      return await axiosPrivateRoute.patch(
        `/api/reservations/update-payment/${data.reservationID}`,
        {
          ...data,
        }
      );
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "Pending service payment has been updated.",
        className: "bg-[#FFF]",
      });
      queryClient.invalidateQueries({
        queryKey: ["service-payments"],
      });
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useUpdateServicePayment;
