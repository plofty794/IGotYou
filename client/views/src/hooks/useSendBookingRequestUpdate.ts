import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SocketContextProvider } from "@/context/SocketContext";
import { useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useSendBookingRequestUpdate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { socket } = useContext(SocketContextProvider);
  return useMutation({
    mutationFn: async (data: {
      bookingRequestID: string;
      receiverName: string;
    }) => {
      return await axiosPrivateRoute.post(
        `/api/host-send-booking-request-update/${data.bookingRequestID}`,
        {
          receiverName: data.receiverName,
        },
      );
    },
    onSuccess(data, { bookingRequestID }) {
      queryClient.invalidateQueries({
        queryKey: ["booking-request", bookingRequestID],
      });
      queryClient.invalidateQueries({
        queryKey: ["host-booking-requests"],
      });
      socket?.emit("send-bookingRequest-update", {
        newHostNotification: data.data.newHostNotification,
        receiverName: data.data.receiverName,
      });
      sonnerToast.success("Booking request has been updated.");
    },
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.error,
      });
    },
  });
}

export default useSendBookingRequestUpdate;
