import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

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
  const axiosPrivate = useAxiosPrivate();
  const ID = localStorage.getItem("ID");
  return useMutation({
    mutationFn: async (data: TListing) => {
      return await axiosPrivate.post(`/api/users/${ID && ID}/make-a-listing`, {
        ...data,
      });
    },
    onSuccess(data) {
      console.log(data.data);
    },
  });
}

export default useUploadListing;
