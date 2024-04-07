import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  thumbnail_url: string;
  resource_type: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingAssets: TFileType[];
};

function useUploadListing() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TListing) => {
      return await axiosPrivateRoute.post("/api/listings/make-a-listing", {
        ...data,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile", id], exact: true });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError(err) {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}

export default useUploadListing;
