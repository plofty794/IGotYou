import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";
import { SocketContextProvider } from "@/context/SocketContext";
import { useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";

type TBookingRequest = {
  listingID: string;
  hostID: string;
  requestedBookingDateStartsAt?: Date;
  requestedBookingDateEndsAt?: Date;
  message: string;
  totalPrice: number;
};

function useSendBookingRequest() {
  const { toast } = useToast();
  const { socket } = useContext(SocketContextProvider);
  return useMutation({
    mutationFn: async (data: TBookingRequest) => {
      return await axiosPrivateRoute.post(
        `/api/guest-send-booking-request/${data.listingID}`,
        { ...data },
      );
    },
    onSuccess(data) {
      socket?.emit("send-bookingRequest", {
        newHostNotification: data.data.newHostNotification,
        receiverName: data.data.receiverName,
      });
      toast({
        title: "Success! 🎉",
        description: "Booking request has been sent.",
        className: "bg-white",
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

export default useSendBookingRequest;
