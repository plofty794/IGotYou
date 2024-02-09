import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetAdminOverview() {
  const dateFrom = location.search
    ? location.search
        .split("?")[1]
        .split("&")[0]
        .split("=")[1]
        .split("+")
        .join(" ")
    : "";

  const dateTo = location.search
    ? location.search
        .split("?")[1]
        .split("&")[1]
        .split("=")[1]
        .split("+")
        .join(" ")
    : "";

  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(`/api/admin/overview`, {
        params: {
          dateFrom,
          dateTo,
        },
      });
    },
  });
}

export default useGetAdminOverview;
