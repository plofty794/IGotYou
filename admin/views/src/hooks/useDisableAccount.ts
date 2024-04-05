import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDisableAccount() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userUID: string) => {
      return await axiosPrivateRoute.patch(
        `/api/admin/disable-user/${userUID}`
      );
    },
    onSuccess(data) {
      toast({
        title: "Success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["verified-payments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-reports"],
      });
    },
  });
}

export default useDisableAccount;
