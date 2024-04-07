import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

type TData = {
  listingID: string;
  listingDuration: number;
};
function useRenewListing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: TData) => {
      return await axiosPrivateRoute.patch(
        `/api/listings/renew-listing/${data.listingID}`,
        {
          listingDuration: data.listingDuration,
        },
      );
    },
    onSuccess(data) {
      sonnerToast.success(data.data.message + ".");
      queryClient.invalidateQueries({
        queryKey: ["host-listings"],
      });
    },
    onError(error) {
      toast({
        title: "Oops! Report submission failed",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useRenewListing;
