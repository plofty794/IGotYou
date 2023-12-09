import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useCreateConversation() {
  return useMutation({
    mutationFn: async (receiverID: string) => {
      return await axiosPrivateRoute.post(
        "/api/users/current-user/conversations/create",
        { receiverID }
      );
    },
  });
}

export default useCreateConversation;
