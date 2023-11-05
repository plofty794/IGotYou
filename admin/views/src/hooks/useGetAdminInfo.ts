import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useGetAdminInfo() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
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
          localStorage.clear();
          queryClient.removeQueries({ queryKey: ["admin"] });
        }
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!localStorage.getItem("isAdmin"),
  });
}

export default useGetAdminInfo;
