import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useSearchBookingRequests(search: string) {
  return useQuery({
    queryKey: ["booking-requests", search],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        `/api/booking-requests?search=${search}`
      );
    },
    enabled: search.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useSearchBookingRequests;
