import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { AxiosError } from "axios";
import { auth } from "@/firebase config/config";
import { useToast } from "@/components/ui/use-toast";

function useGetCurrentUserProfile() {
  const { toast } = useToast();
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      try {
        return await axiosPrivateRoute.get("/api/users/current-user/profile");
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          await auth.signOut();
          localStorage.clear();
          queryClient.removeQueries({ queryKey: ["profile"] });
          queryClient.removeQueries({ queryKey: ["listings"] });
          toast({
            title: "Oops! It looks like your session has expired.",
            description: "Please log in again.",
            variant: "destructive",
          });
        }
        if (error.response?.status === 401) {
          const token = await auth.currentUser?.getIdToken();
          localStorage.clear();
          token && localStorage.setItem("token", token);
        }
      }
    },
    enabled: id != null,
    retry: 2,
  });
}

export default useGetCurrentUserProfile;
