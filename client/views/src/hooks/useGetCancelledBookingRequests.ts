import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetCancelledBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["cancelled-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(
        `/api/cancelled-booking-requests/${pageParam}`
      );
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetCancelledBookingRequests;
