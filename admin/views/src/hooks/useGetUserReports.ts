import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetUserReports() {
  return useInfiniteQuery({
    queryKey: ["user-reports"],
    queryFn: async ({ pageParam = 1 }) => {
      return await axiosPrivateRoute.get(
        `/api/admin/users-reports/${pageParam}`
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}

export default useGetUserReports;
