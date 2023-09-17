import { axiosRoute } from "@/axios/axiosRoute";
import { useMutation } from "@tanstack/react-query";

export function useVerifyToken() {
  return useMutation({
    mutationFn: async (data: string) => {
      return await axiosRoute.post("/token/verify", { accessToken: data });
    },
    onSuccess(res) {
      console.log(res.data);
    },
    onError(err) {
      console.log(err);
    },
  });
}
