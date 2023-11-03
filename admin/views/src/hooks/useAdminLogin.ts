import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { AdminLoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useAdminLogin() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: AdminLoginSchema) => {
      return await axiosPrivateRoute.post("/api/admin/login", { ...data });
    },
    onSuccess(data) {
      console.log(data.data);
      toast({
        title: "Admin login complete.",
        description: "The world is your oyster.",
      });
    },
    onError(err) {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}

export default useAdminLogin;
