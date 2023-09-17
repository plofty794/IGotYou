import { axiosRoute } from "@/axios/axiosRoute";
import { useMutation } from "@tanstack/react-query";

export function useVerifyToken() {
  return useMutation({
    mutationFn: async (accessToken: string) => {
      return await axiosRoute.post(
        "/token/verify",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    },
    onSuccess(res) {
      console.log(res.data);
    },
    onError(err) {
      console.log(err);
    },
  });
}
