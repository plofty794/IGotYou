import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

function useServiceCancellationRequestApproval() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      reservationID,
      hostCancellationReason,
    }: {
      reservationID?: string;
      hostCancellationReason: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/reservations/service-cancellation-request-approval/${reservationID}`,
        {
          hostCancellationReason,
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
      sonnerToast.success("Service has been cancelled.");
    },
    onError(error) {
      toast({
        title: "Oops! Something went wrong",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useServiceCancellationRequestApproval;
