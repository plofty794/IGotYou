import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetUsers() {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(`/api/admin/users/${pageParam}`);
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetUsers;
