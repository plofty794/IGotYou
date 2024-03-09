import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useGetPendingPayments from "@/hooks/useGetPendingPayments";
import useVerifyPayment from "@/hooks/useVerifyPayment";
import Lottie from "lottie-react";
import noPendingPayment from "../assets/no-pending-payments.json";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

function Subscriptions() {
  const { data, isPending } = useGetPendingPayments();
  const verifyPayment = useVerifyPayment();

  useEffect(() => {
    document.title = "Subscriptions - Admin IGotYou";
  }, []);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4 overflow-clip">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-3xl">Subscriptions</h1>
          <Button className="bg-gray-950">
            <Link to={"/verified-payments"}>View verified payments</Link>
          </Button>
        </div>
        {data?.pages[0].data.pendingPayments ? (
          <div key={"1234"} className="grid grid-cols-4 gap-2">
            {isPending
              ? "Loading..."
              : data?.pages.flatMap((page) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  page.data.pendingPayments.map((v: any) => (
                    <>
                      {v.paymentStatus === "pending" && (
                        <Card key={v._id}>
                          <CardHeader className="p-0">
                            <Dialog>
                              <DialogTrigger className="overflow-hidden rounded-md ">
                                <img
                                  className="aspect-square object-cover hover:scale-105 transition-transform"
                                  src={v.paymentProofPhoto}
                                  alt=""
                                  loading="lazy"
                                />
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl w-max h-max max-h-[70%] p-0">
                                <img
                                  className="object-cover rounded-md"
                                  src={v.paymentProofPhoto}
                                  alt=""
                                  loading="lazy"
                                />
                              </DialogContent>
                            </Dialog>

                            <Badge className="w-max mx-auto text-xs font-bold bg-gray-950">
                              Proof of payment
                            </Badge>
                          </CardHeader>
                          <CardContent className="p-2">
                            <CardDescription className="text-gray-600 font-medium text-sm">
                              Username: {v.user.username}
                            </CardDescription>
                            <CardDescription className="text-gray-600 font-medium text-sm">
                              Sent at: {new Date(v.createdAt).toLocaleString()}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="flex justify-between gap-2 max-lg:flex-col p-2">
                            <Button
                              disabled={verifyPayment.isPending}
                              type="button"
                              variant={"destructive"}
                              onClick={() =>
                                verifyPayment.mutate({
                                  _id: v._id,
                                  paymentStatus: "reject",
                                })
                              }
                              className="w-full"
                            >
                              Reject
                            </Button>
                            <Button
                              disabled={verifyPayment.isPending}
                              className="w-full"
                              type="button"
                              onClick={() =>
                                verifyPayment.mutate({
                                  _id: v._id,
                                  paymentStatus: "success",
                                })
                              }
                            >
                              Verify
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                    </>
                  ))
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
              No pending payments.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Subscriptions;
