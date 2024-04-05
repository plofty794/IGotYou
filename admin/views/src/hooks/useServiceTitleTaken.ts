import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useServiceTitleTaken() {
  return useMutation({
    mutationFn: async (serviceTitle: string) => {
      return axiosPrivateRoute.post("/api/listings/title-taken", {
        serviceTitle,
      });
    },
  });
}

export default useServiceTitleTaken;
