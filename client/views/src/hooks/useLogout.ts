import { axiosPrivateRoute } from "@/api/axiosRoute";
import { SocketContextProvider } from "@/context/SocketContext";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

function useLogOutUser() {
  const { socket } = useContext(SocketContextProvider);
  const { dispatch } = useContext(UserStateContextProvider);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await axiosPrivateRoute.delete("/api/users/current-user/logout");
    },
    onSuccess: async () => {
      socket?.emit("user-logout", auth.currentUser?.displayName);
      dispatch({ type: "USER_LOGOUT", payload: null });
      await auth.signOut();
      queryClient.removeQueries();
    },
    onSettled() {
      window.location.href = "/login";
    },
    onError: async (err) => {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        await auth.signOut();
        window.location.href = "/login";
      }
    },
  });
}

export default useLogOutUser;
