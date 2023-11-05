import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { AdminLoginSchema } from "@/zod/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";

function useAdminLogin() {
  const { dispatch } = useContext(UserStateContextProvider);
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: AdminLoginSchema) => {
      return await axiosPrivateRoute.post("/api/admin/login", { ...data });
    },
    onSuccess(data) {
      dispatch({ type: "ADMIN_LOGIN", payload: data.data.adminExist.isAdmin });
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
      dispatch({ type: "ADMIN_LOGOUT", payload: null });
    },
  });
}

export default useAdminLogin;
