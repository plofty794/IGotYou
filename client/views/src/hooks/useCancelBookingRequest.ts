import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";
import { toast as sonnerToast } from "sonner";

function useCancelBookingRequest() {
  const { socket } = useContext(SocketContextProvider);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingRequestID,
      guestCancelReasons,
    }: {
      bookingRequestID: string;
      guestCancelReasons: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/guest-cancel-booking-request/${bookingRequestID}`,
        {
          guestCancelReasons,
        },
      );
    },
    onSuccess(data) {
      sonnerToast.success(data.data.message);
      socket?.emit("guest-cancel-bookingRequest", {
        receiverName: data.data.receiverName,
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-pending-booking-requests"],
      });
    },
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Uh oh! Request not sent.",
        description: response.data.error,
      });
    },
  });
}

export default useCancelBookingRequest;
