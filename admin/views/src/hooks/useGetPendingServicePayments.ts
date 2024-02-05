import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetPendingServicePayments() {
  return useInfiniteQuery({
    queryKey: ["pending-service-payments"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/service-payments/pending/${pageParam}`
      );
    },
    getNextPageParam: (_, pages) => pages.length,
    initialPageParam: 1,
  });
}

export default useGetPendingServicePayments;
