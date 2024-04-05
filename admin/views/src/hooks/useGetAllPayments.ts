import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetSubscriptions() {
  return useInfiniteQuery({
    queryKey: ["subscriptions"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(`/api/subscriptions/${pageParam}`);
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetSubscriptions;
