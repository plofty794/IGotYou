import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetPayments() {
  return useInfiniteQuery({
    queryKey: ["payments"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(`/api/payments/${pageParam}`);
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetPayments;
