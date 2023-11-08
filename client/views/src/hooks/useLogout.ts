import { axiosPrivateRoute } from "@/api/axiosRoute";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

function useLogOutUser() {
  const { dispatch } = useContext(UserStateContextProvider);
  const queryClient = useQueryClient();
  return async () => {
    try {
      await axiosPrivateRoute.delete("/api/users/current-user/logout");
      await auth.signOut();
      dispatch({ type: "USER_LOGOUT", payload: null });
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["listings"] });
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        await auth.signOut();
      }
    }
  };
}

export default useLogOutUser;
