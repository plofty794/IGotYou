import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { FilePondFile } from "filepond";

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: FilePondFile[];
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
    retry: 3,
    retryDelay: 3000,
  });
}

export default useUploadListing;
