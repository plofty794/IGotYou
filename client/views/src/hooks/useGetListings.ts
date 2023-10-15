import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

function useGetListings() {
  const ID = localStorage.getItem("ID");
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["listings", ID && ID],
    queryFn: async () => {
      return await axiosPrivate.get(`/api/listings/${ID && ID}`);
    },
    enabled: ID != null,
    refetchOnMount: false,
    keepPreviousData: true,
  });
}

export default useGetListings;
