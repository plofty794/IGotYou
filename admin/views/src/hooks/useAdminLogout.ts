import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useAdminLogout() {
  return useMutation({
    mutationFn: async () => {
      return await axiosPrivateRoute.delete("/api/admin/logout");
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
}

export default useAdminLogout;
