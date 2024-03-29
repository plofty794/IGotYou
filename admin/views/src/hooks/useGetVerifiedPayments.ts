import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetVerifiedPayments() {
  return useInfiniteQuery({
    queryKey: ["verified-payments"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/subscriptions/verified/${pageParam}`
      );
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetVerifiedPayments;
