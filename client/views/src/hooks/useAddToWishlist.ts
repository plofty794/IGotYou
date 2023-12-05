import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

function useAddToWishlist() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (listingID: string) => {
      return await axiosPrivateRoute.post(
        "/api/users/current-user/add-listing-wishlist",
        {
          listingID,
        }
      );
    },
    onSuccess() {
      toast({
        title: "Success!",
        description: "Listing added to wishlist",
        className: "bg-#FFF",
      });
    },
    onError(error) {
      console.log(error);
      toast({
        title: "Oops! An error occurred.",
        description: "Try again",
        variant: "destructive",
      });
    },
  });
}

export default useAddToWishlist;
