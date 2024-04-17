import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetEarnings() {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: async () => {
      return axiosPrivateRoute.get("/api/reservations/total-earnings");
    },
  });
}

export default useGetEarnings;
