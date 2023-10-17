import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

function useGetUserListings() {
  const ID = localStorage.getItem("ID");
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["listings", ID && ID],
    queryFn: async () => {
      return await axiosPrivate.get(`/api/listings/${ID && ID}`);
    },
    enabled: ID != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    suspense: true,
  });
}

export default useGetUserListings;
