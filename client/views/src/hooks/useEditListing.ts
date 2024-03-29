import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { TFileType } from "@/root layouts/BecomeAHostLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

type TEditListing = {
  _id?: string | undefined;
  serviceType?: string;
  serviceDescription?: string | undefined;
  serviceTitle?: string;
  listingAssets?: TFileType[];
  price?: number;
  serviceLocation?: string;
  cancellationPolicy?: string;
  status?: string | undefined;
  reservedDates?: [] | undefined;
  availableAt?: string;
  endsAt?: string;
};

function useEditListing() {
  const { listingID } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: TEditListing) => {
      return await axiosPrivateRoute.patch(`/api/listings/edit/${listingID}`, {
        ...data,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["listing", listingID],
      });
      sonnerToast.success("Listing has been updated", {
        duration: 1000,
      });
    },
    onError(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useEditListing;
