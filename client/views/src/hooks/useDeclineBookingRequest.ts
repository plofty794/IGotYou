import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

function useDeclineBookingRequest() {
  const { socket } = useContext(SocketContextProvider);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation({
    mutationFn: async ({
      bookingRequestID,
      hostDeclineReasons,
    }: {
      bookingRequestID: string;
      hostDeclineReasons: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/host-decline-booking-request/${bookingRequestID}`,
        {
          hostDeclineReasons,
        },
      );
    },
    onSuccess(data) {
      sonnerToast.success(data.data.message);
      socket?.emit("host-decline-bookingRequest", {
        receiverName: data.data.receiverName,
      });
      queryClient.invalidateQueries({
        queryKey: ["host-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-request", id],
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

export default useDeclineBookingRequest;
