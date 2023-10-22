import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/axios/axiosRoute";

function useGetCurrentUserProfile() {
  const { id } = useParams();

  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () =>
      await axiosPrivateRoute.get(`/api/users/current-user-profile/`),
    enabled: id != null,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    suspense: true,
  });
}

export default useGetCurrentUserProfile;
