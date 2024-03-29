import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useChangeAvailability() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sortedDates }: { sortedDates: Date[] }) => {
      if (!sortedDates.length) return;
      return axiosPrivateRoute.post(`/api/users/host-change-availability`, {
        sortedDates,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["blocked-dates"],
      });
      sonnerToast.success(data?.data.message, {
        duration: 1000,
      });
    },
    onError(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useChangeAvailability;
