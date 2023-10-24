import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosPrivateRoute } from "@/axios/axiosRoute";

function useGetListings() {
  return useInfiniteQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(`/api/users/`);
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    suspense: true,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetListings;
