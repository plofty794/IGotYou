import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";

function useGetAdminInfo() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useContext(UserStateContextProvider);

  return useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      try {
        return await axiosPrivateRoute.get("/api/admin");
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          toast({
            title: "Oops an error occurred!",
            description: (error.response as AxiosResponse).data.error,
            variant: "destructive",
          });
          document.location.reload();
          localStorage.clear();
          queryClient.removeQueries();
          dispatch({ type: "ADMIN_LOGOUT", payload: null });
        }
      }
    },

    retry: 2,
    enabled: !!localStorage.getItem("isAdmin"),
  });
}

export default useGetAdminInfo;
