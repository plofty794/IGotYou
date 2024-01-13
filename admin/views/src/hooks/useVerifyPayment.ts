import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TData = {
  paymentStatus: "success" | "reject";
  _id: string;
};

function useVerifyPayment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TData) => {
      return await axiosPrivateRoute.patch(
        "/api/subscriptions/update-payment-status",
        { ...data }
      );
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "Pending payment has been updated.",
        className: "bg-[#FFF]",
      });
      queryClient.invalidateQueries({ queryKey: ["pending-payments"] });
    },
    onError(data) {
      console.log(data);
    },
  });
}

export default useVerifyPayment;
