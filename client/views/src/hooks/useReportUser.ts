import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { TFileType } from "@/root layouts/BecomeAHostLayout";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast as sonnerToast } from "sonner";

function useReportUser() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      reportedUser,
      evidence,
      reason,
    }: {
      reportedUser?: string;
      evidence?: TFileType | null;
      reason?: string;
    }) => {
      return await axiosPrivateRoute.post(`/api/users/submit-report`, {
        reportedUser,
        evidence,
        reason,
      });
    },
    onSuccess(data) {
      sonnerToast.success(data.data.message);
    },
    onError(error) {
      toast({
        title: "Oops! Report submission failed",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useReportUser;
