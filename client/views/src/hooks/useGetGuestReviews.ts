import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetGuestReviews() {
  const { userID } = useParams();

  return useInfiniteQuery({
    queryKey: ["guest-reviews", userID],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/ratings/${userID}/guest-reviews/${pageParam}`,
      );
    },
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    retry: 1,
  });
}

export default useGetGuestReviews;
