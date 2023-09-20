import { axiosRoute } from "@/axios/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetUserProfile(ID: string | null) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await axiosRoute.get(`/api/users/profile/${ID}`);
    },
    enabled: ID != null,
    keepPreviousData: true,
  });
}

export default useGetUserProfile;
