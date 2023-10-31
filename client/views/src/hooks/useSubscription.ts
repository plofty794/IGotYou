import { axiosPrivateRoute } from "@/axios/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

function useSubscription() {
  const { toast } = useToast();
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { subscriptionStatus: string }) => {
      return await axiosPrivateRoute.post("/api/users/subscription", {
        ...data,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(["profile", id]);
      console.log("Success");
    },
    onError: async (err) => {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        await auth.signOut();
        localStorage.clear();
        queryClient.removeQueries(["profile"]);
        queryClient.removeQueries(["listings"]);
        toast({
          title: "Oops! An error occurred.",
          description: "This resource requires an identifier.",
          variant: "destructive",
        });
      }
      if (error.response?.status === 401) {
        const token = await auth.currentUser?.getIdToken();
        localStorage.clear();
        token && localStorage.setItem("token", token);
      }
    },
  });
}

export default useSubscription;
