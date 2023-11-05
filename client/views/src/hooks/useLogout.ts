import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

function useLogOutUser() {
  const queryClient = useQueryClient();
  return async () => {
    try {
      await axiosPrivateRoute.delete("/api/users/current-user/logout");
      await auth.signOut();
      localStorage.clear();
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
