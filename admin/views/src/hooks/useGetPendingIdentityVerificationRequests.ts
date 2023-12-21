import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetPendingIdentityVerificationRequests() {
  return useInfiniteQuery({
    queryKey: ["pending-identity-verifications"],
    queryFn: async () => {
      return await axiosPrivateRoute.get("/api/identity-photo/pending");
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}

export default useGetPendingIdentityVerificationRequests;
