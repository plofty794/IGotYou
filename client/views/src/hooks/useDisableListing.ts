import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useDisableListing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ listingID }: { listingID: string }) => {
      return await axiosPrivateRoute.patch(
        `/api/listings/disable-listing/${listingID}`,
      );
    },
    onSuccess(data) {
      sonnerToast.success(data.data.message);
      queryClient.invalidateQueries({
        queryKey: ["host-listings"],
      });
    },
    onError(error) {
      toast({
        title: "Reservations exist!",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useDisableListing;
