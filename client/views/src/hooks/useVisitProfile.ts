import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useVisitProfile() {
  const { id } = useParams();

  return useQuery({
    queryKey: ["visit-profile", id],
    queryFn: async () =>
      await axiosPrivateRoute.get(`/api/users/profile/visit/${id}`),
    enabled: id != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useVisitProfile;
