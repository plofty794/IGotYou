import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetHostReviews() {
  const { userID } = useParams();

  return useInfiniteQuery({
    queryKey: ["host-reviews", userID],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/ratings/${userID}/host-reviews/${pageParam}`,
      );
    },
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    retry: 1,
  });
}

export default useGetHostReviews;
