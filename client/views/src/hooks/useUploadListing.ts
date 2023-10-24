import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/axios/axiosRoute";

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: TFileType[];
};

function useUploadListing() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TListing) => {
      return await axiosPrivateRoute.post(
        `/api/users/current-user/make-a-listing`,
        {
          ...data,
        }
      );
    },
    onSuccess() {
      console.log("Success");
      queryClient.refetchQueries(["profile", id], { exact: true });
      queryClient.refetchQueries(["listings"], { exact: true });
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default useUploadListing;
