import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useVerifyIdentityPhoto() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      identityPhotoId,
      identityVerificationStatus,
      userId,
    }: {
      identityPhotoId: string;
      identityVerificationStatus: string;
      userId: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/identity-photo/verification/${identityPhotoId}`,
        {
          identityVerificationStatus,
          userId,
        }
      );
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "Pending identity request verification has been updated.",
        className: "bg-[#FFF]",
      });
      queryClient.invalidateQueries({
        queryKey: ["pending-identity-verifications"],
      });
    },
  });
}

export default useVerifyIdentityPhoto;
