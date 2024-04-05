import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetIdentityVerificationRequests() {
  return useInfiniteQuery({
    queryKey: ["identity-verification-requests"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/admin/users-identity-verifications/${pageParam}`
      );
    },
    getNextPageParam: (_, page) => page.length + 1,
    getPreviousPageParam: (_, page) => page.length - 1,
    initialPageParam: 1,
  });
}

export default useGetIdentityVerificationRequests;
