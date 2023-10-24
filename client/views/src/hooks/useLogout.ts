import { axiosPrivateRoute } from "@/axios/axiosRoute";
import { auth } from "@/firebase config/config";
import { useQueryClient } from "@tanstack/react-query";

function useLogOutUser() {
  const queryClient = useQueryClient();
  return async () => {
    try {
      await axiosPrivateRoute.delete("/api/users/current-user/logout");
      auth.signOut();
      localStorage.clear();
      queryClient.removeQueries(["profile"]);
      queryClient.removeQueries(["listings"]);
    } catch (error) {
      console.error(error);
    }
  };
}

export default useLogOutUser;
