import { axiosRoute } from "@/axios/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetListings() {
  return useInfiniteQuery({
    queryKey: ["listings"],
    queryFn: async ({ pageParam = 1 }) => {
      return await axiosRoute.get(`/api/listings/`);
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
