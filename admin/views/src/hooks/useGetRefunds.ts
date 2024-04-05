import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetRefunds() {
  return useInfiniteQuery({
    queryKey: ["user-refunds"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(`/api/admin/refunds/${pageParam}`);
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetRefunds;
