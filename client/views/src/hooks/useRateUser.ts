import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

function useRateUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { reservationID } = useParams();

  return useMutation({
    mutationFn: async ({
      reservationID,
      hostID,
      guestID,
      guestFeedback,
      hostFeedback,
      hostRating,
      guestRating,
    }: {
      reservationID: string;
      hostID: string;
      guestID: string;
      guestFeedback?: string;
      hostFeedback?: string;
      hostRating?: number;
      guestRating?: number;
    }) => {
      return await axiosPrivateRoute.post("/api/users/rate-user", {
        reservationID,
        hostID,
        guestID,
        guestFeedback,
        hostFeedback,
        hostRating,
        guestRating,
      });
    },
    onSuccess() {
      sonnerToast.success("Rating has been sent.");
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
    },
    onError(error) {
      toast({
        title: "Uh oh! Rating failed.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useRateUser;
