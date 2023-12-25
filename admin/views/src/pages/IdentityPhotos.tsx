import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useGetPendingIdentityVerificationRequests from "@/hooks/useGetPendingIdentityVerificationRequests";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import noPendingPayment from "../assets/no-pending-payments.json";
import useVerifyIdentityPhoto from "@/hooks/useVerifyIdentityPhoto";
import { useEffect } from "react";

function IdentityPhotos() {
  const { data, isPending } = useGetPendingIdentityVerificationRequests();
  const verifyIdentityPhoto = useVerifyIdentityPhoto();

  useEffect(() => {
    document.title = "Identity Photos - IGotYou";
  }, []);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4 overflow-clip">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-2xl">ID Verification Requests</h1>
          <Button className="bg-gray-950">
            <Link to={"/verified-identities"}>View verified ID requests</Link>
          </Button>
        </div>
        {data?.pages[0].data.pendingIdentityVerificationRequests.length > 0 ? (
          <div key={"1234"} className="grid grid-cols-4 gap-2">
            {isPending
              ? "Loading..."
              : data?.pages.flatMap((page) =>
                  page.data.pendingIdentityVerificationRequests.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (v: any) => (
                      <>
                        {v.identityVerificationStatus === "pending" && (
                          <Card key={v._id}>
                            <CardHeader className="p-0">
                              <Dialog>
                                <DialogTrigger className="overflow-hidden rounded-md">
                                  <img
                                    className="aspect-square object-cover hover:scale-105 transition-transform"
                                    src={v.identityPhoto}
                                    alt=""
                                    loading="lazy"
                                  />
                                </DialogTrigger>
                                <DialogContent className="h-screen p-0">
                                  <img
                                    className="aspect-square object-cover h-full rounded-md "
                                    src={v.identityPhoto}
                                    alt=""
                                    loading="lazy"
                                  />
                                </DialogContent>
                              </Dialog>

                              <Badge className="w-max mx-auto text-xs font-bold bg-gray-950">
                                Identity photo
                              </Badge>
                            </CardHeader>
                            <CardContent className="p-2">
                              <CardDescription className="text-gray-600 font-medium text-sm">
                                Username: {v.user.username}
                              </CardDescription>
                              <CardDescription className="text-gray-600 font-medium text-sm">
                                Sent at:{" "}
                                {new Date(v.createdAt).toLocaleString()}
                              </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2 max-lg:flex-col p-2">
                              <Button
                                disabled={verifyIdentityPhoto.isPending}
                                type="button"
                                onClick={() =>
                                  verifyIdentityPhoto.mutate({
                                    identityPhotoId: v._id,
                                    identityVerificationStatus: "reject",
                                    userId: v.user._id,
                                  })
                                }
                                className="bg-red-600 w-full"
                              >
                                Reject
                              </Button>
                              <Button
                                disabled={verifyIdentityPhoto.isPending}
                                className="w-full"
                                type="button"
                                onClick={() =>
                                  verifyIdentityPhoto.mutate({
                                    identityPhotoId: v._id,
                                    identityVerificationStatus: "success",
                                    userId: v.user._id,
                                  })
                                }
                              >
                                Verify
                              </Button>
                            </CardFooter>
                          </Card>
                        )}
                      </>
                    )
                  )
                )}
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-2 justify-center items-center">
            <Lottie
              loop={false}
              animationData={noPendingPayment}
              className="w-56 h-56"
            />
            <span className="text-gray-600 font-semibold text-lg">
              No pending ID verification requests.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default IdentityPhotos;
