import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useSendFeedback() {
  return useMutation({
    mutationFn: async (feedback: string) => {
      return await axiosPrivateRoute.post("/api/users/write-a-feedback", {
        feedback,
      });
    },
    onSuccess() {
      toast.success("Feedback has been sent.");
    },
    onError() {
      toast.warning("You've already sent a feedback.");
    },
  });
}

export default useSendFeedback;
