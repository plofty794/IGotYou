import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetDeclinedBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["declined-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(
        `/api/declined-booking-requests/${pageParam}`
      );
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetDeclinedBookingRequests;
