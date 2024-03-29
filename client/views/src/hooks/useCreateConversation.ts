import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast as sonnerToast } from "sonner";

function useCreateConversation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (receiverName: string) => {
      return await axiosPrivateRoute.post(
        "/api/users/current-user/conversations/create",
        { receiverName },
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      sonnerToast.success("Conversation has been created.", {
        duration: 1000,
      });
      navigate(`/messages/conversation/${data.data.newConversation[0]._id}`);
    },
    onError(err) {
      const error = err as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Oops! An error occurred.",
        description: response.data.error,
      });
    },
  });
}

export default useCreateConversation;
