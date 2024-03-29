import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useUpdateUserEmail() {
  const queryClient = useQueryClient();
  const id = auth.currentUser?.uid;
  return useMutation({
    mutationFn: async (email: string) => {
      return await axiosPrivateRoute.patch(
        "/api/users/current-user/update-email",
        { email, id },
      );
    },
    onSuccess(_, variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", id], (prevData: any) => {
        return {
          data: {
            activeListings: prevData.data.activeListings,
            user: {
              ...prevData.data.user,
              variables,
            },
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      toast.success("Your email has been updated.", {
        duration: 1000,
      });
    },
  });
}

export default useUpdateUserEmail;
