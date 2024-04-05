import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetServicePayments() {
  return useInfiniteQuery({
    queryKey: ["service-payments"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/admin/service-payments/${pageParam}`
      );
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetServicePayments;
