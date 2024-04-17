import useGetPendingServicePayments from "@/hooks/useGetPendingServicePayments";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import noPendingPayment from "../assets/no-pending-payments.json";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useUpdateServicePayment from "@/hooks/useUpdateServicePayment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";

function Payments() {
  const { data, isPending } = useGetPendingServicePayments();
  const { mutate } = useUpdateServicePayment();

  useEffect(() => {
    document.title = "Payments - Admin IGotYou";
  }, []);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4 overflow-clip">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-3xl">Service payments</h1>
          <Button className="bg-gray-950">
            <Link to={"/all-service-payments"}>View all payments</Link>
          </Button>
        </div>
        {data?.pages[0].data.pendingServicePayments.length > 0 ? (
          <div key={"1234"} className="grid grid-cols-3 gap-2">
            {isPending
              ? "Loading..."
              : data?.pages.flatMap((page) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  page.data.pendingServicePayments.map((v: any) => (
                    <>
                      {v.paymentType === "partial-payment" ? (
                        v.fullPaymentVerificationStatus === "pending" ? (
                          <>
                            <Card>
                              <Tabs defaultValue="payment-1" className="p-2">
                                <TabsList className="w-full gap-2 bg-white">
                                  <TabsTrigger
                                    asChild
                                    className="w-full border"
                                    value="payment-1"
                                  >
                                    <Button variant={"ghost"}>
                                      Payment #1
                                    </Button>
                                  </TabsTrigger>
                                  <TabsTrigger
                                    asChild
                                    className="w-full border"
                                    value="payment-2"
                                  >
                                    <Button variant={"ghost"}>
                                      Payment #2
                                    </Button>
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                  className="w-full"
                                  value="payment-1"
                                >
                                  <CardContent className="mt-4 flex flex-col gap-2">
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Sent by
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {v.guestID.username ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        To
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {v.hostID.username ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Reference no.
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {v.partialPaymentRefNo ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Amount sent
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {formatValue({
                                          value: String(v.partialPaymentAmount),
                                          intlConfig: {
                                            locale: "ph",
                                            currency: "php",
                                          },
                                        }) ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Payment type
                                      </p>
                                      <p className="text-sm font-semibold capitalize">
                                        {v.paymentType.split("-").join(" ") ??
                                          "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Date & time of payment
                                      </p>
                                      <p className="text-xs font-semibold">
                                        {format(
                                          new Date(v.partialPaymentDate),
                                          "PP p"
                                        )}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        From
                                      </p>
                                      <p className="text-xs font-semibold">
                                        {v.guestID.username}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full flex-col items-center gap-2">
                                      <Badge>Payment proof photo</Badge>
                                      <Link
                                        to={
                                          v.partialPaymentProofPhoto?.secure_url
                                        }
                                        target="_blank"
                                      >
                                        <img
                                          loading="lazy"
                                          alt="Partial payment photo"
                                          className="h-60 w-full object-cover hover:scale-105 transition-transform"
                                          src={
                                            v.partialPaymentProofPhoto
                                              ?.secure_url
                                          }
                                        />
                                      </Link>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="flex justify-between gap-2 max-lg:flex-col p-2">
                                    <Button
                                      onClick={() =>
                                        mutate({
                                          fullPaymentVerificationStatus:
                                            v.fullPaymentVerificationStatus,
                                          partialPaymentVerificationStatus:
                                            v.partialPaymentVerificationStatus,
                                          paymentStatus: v.paymentStatus,
                                          paymentType: v.paymentType,
                                          reservationID: v._id,
                                          status: "rejected",
                                        })
                                      }
                                      type="button"
                                      variant={"destructive"}
                                      className="w-full"
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        mutate({
                                          fullPaymentVerificationStatus:
                                            v.fullPaymentVerificationStatus,
                                          partialPaymentVerificationStatus:
                                            v.partialPaymentVerificationStatus,
                                          paymentStatus: v.paymentStatus,
                                          paymentType: v.paymentType,
                                          reservationID: v._id,
                                          status: "success",
                                        })
                                      }
                                      className="w-full"
                                      type="button"
                                    >
                                      Verify
                                    </Button>
                                  </CardFooter>
                                </TabsContent>
                                <TabsContent value="payment-2">
                                  <CardContent className="mt-4 flex flex-col gap-2">
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Sent by
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {v.guestID.username ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        To
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {v.hostID.username ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Reference no.
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {v.fullPaymentRefNo ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Amount sent
                                      </p>
                                      <p className="text-sm font-semibold ">
                                        {formatValue({
                                          value: String(v.partialPaymentAmount),
                                          intlConfig: {
                                            locale: "ph",
                                            currency: "php",
                                          },
                                        }) ?? "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Payment type
                                      </p>
                                      <p className="text-sm font-semibold capitalize">
                                        {v.paymentType.split("-").join(" ") ??
                                          "N/A"}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        Date & time of payment
                                      </p>
                                      <p className="text-xs font-semibold">
                                        {format(
                                          new Date(v.fullPaymentDate),
                                          "PP p"
                                        )}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm font-semibold text-gray-600">
                                        From
                                      </p>
                                      <p className="text-xs font-semibold">
                                        {v.guestID.username}
                                      </p>
                                    </div>
                                    <Separator />
                                    <div className="flex w-full flex-col items-center gap-2">
                                      <Badge>Payment proof photo</Badge>
                                      <Link
                                        to={v.fullPaymentProofPhoto?.secure_url}
                                        target="_blank"
                                      >
                                        <img
                                          loading="lazy"
                                          alt="Partial payment photo"
                                          className="h-60 w-full object-cover hover:scale-105 transition-transform"
                                          src={
                                            v.fullPaymentProofPhoto.secure_url
                                          }
                                        />
                                      </Link>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="flex justify-between gap-2 max-lg:flex-col p-2">
                                    <Button
                                      disabled={
                                        v.partialPaymentVerificationStatus ===
                                        "pending"
                                      }
                                      onClick={() =>
                                        mutate({
                                          fullPaymentVerificationStatus:
                                            v.fullPaymentVerificationStatus,
                                          partialPaymentVerificationStatus:
                                            v.partialPaymentVerificationStatus,
                                          paymentStatus: v.paymentStatus,
                                          paymentType: v.paymentType,
                                          reservationID: v._id,
                                          status: "rejected",
                                        })
                                      }
                                      type="button"
                                      variant={"destructive"}
                                      className="w-full"
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      disabled={
                                        v.partialPaymentVerificationStatus ===
                                        "pending"
                                      }
                                      onClick={() =>
                                        mutate({
                                          fullPaymentVerificationStatus:
                                            v.fullPaymentVerificationStatus,
                                          partialPaymentVerificationStatus:
                                            v.partialPaymentVerificationStatus,
                                          paymentStatus: v.paymentStatus,
                                          paymentType: v.paymentType,
                                          reservationID: v._id,
                                          status: "success",
                                        })
                                      }
                                      className="w-full"
                                      type="button"
                                    >
                                      Verify
                                    </Button>
                                  </CardFooter>
                                </TabsContent>
                              </Tabs>
                            </Card>
                          </>
                        ) : (
                          <Card key={v._id}>
                            <CardHeader className="p-0 overflow-hidden">
                              <Link
                                to={v.partialPaymentProofPhoto.secure_url}
                                target="_blank"
                              >
                                <img
                                  className="h-60 w-full object-cover hover:scale-105 transition-transform"
                                  src={v.partialPaymentProofPhoto.secure_url}
                                  loading="lazy"
                                />
                              </Link>

                              <Badge className="w-max mx-auto text-xs font-bold bg-gray-950">
                                Proof of payment
                              </Badge>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 p-4">
                              <div className="flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  Reference no.
                                </p>
                                <p className="text-sm font-semibold ">
                                  {v.partialPaymentRefNo ?? "N/A"}
                                </p>
                              </div>
                              <Separator />
                              <div className="flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  Amount sent
                                </p>
                                <p className="text-sm font-semibold ">
                                  {formatValue({
                                    value: String(v.partialPaymentAmount),
                                    intlConfig: {
                                      locale: "ph",
                                      currency: "php",
                                    },
                                  }) ?? "N/A"}
                                </p>
                              </div>
                              <Separator />
                              <div className="flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  Payment type
                                </p>
                                <p className="text-sm font-semibold capitalize">
                                  {v.paymentType.split("-").join(" ") ?? "N/A"}
                                </p>
                              </div>
                              <Separator />
                              <div className="flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  Date & time of payment
                                </p>
                                <p className="text-xs font-semibold">
                                  {format(
                                    new Date(v.partialPaymentDate),
                                    "PP p"
                                  )}
                                </p>
                              </div>
                              <Separator />
                              <div className="flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  From
                                </p>
                                <p className="text-xs font-semibold">
                                  {v.guestID.username}
                                </p>
                              </div>
                              <Separator />
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2 max-lg:flex-col p-2">
                              <Button
                                onClick={() =>
                                  mutate({
                                    fullPaymentVerificationStatus:
                                      v.fullPaymentVerificationStatus,
                                    partialPaymentVerificationStatus:
                                      v.partialPaymentVerificationStatus,
                                    paymentStatus: v.paymentStatus,
                                    paymentType: v.paymentType,
                                    reservationID: v._id,
                                    status: "rejected",
                                  })
                                }
                                type="button"
                                variant={"destructive"}
                                className="w-full"
                              >
                                Reject
                              </Button>
                              <Button
                                onClick={() =>
                                  mutate({
                                    fullPaymentVerificationStatus:
                                      v.fullPaymentVerificationStatus,
                                    partialPaymentVerificationStatus:
                                      v.partialPaymentVerificationStatus,
                                    paymentStatus: v.paymentStatus,
                                    paymentType: v.paymentType,
                                    reservationID: v._id,
                                    status: "success",
                                  })
                                }
                                className="w-full"
                                type="button"
                              >
                                Verify
                              </Button>
                            </CardFooter>
                          </Card>
                        )
                      ) : (
                        <Card key={v._id}>
                          <CardHeader className="p-0 overflow-hidden">
                            <Link
                              to={v.fullPaymentProofPhoto.secure_url}
                              target="_blank"
                            >
                              <img
                                className="h-60 w-full object-cover hover:scale-105 transition-transform"
                                src={v.fullPaymentProofPhoto.secure_url}
                                alt=""
                                loading="lazy"
                              />
                            </Link>

                            <Badge className="w-max mx-auto text-xs font-bold bg-gray-950">
                              Proof of payment
                            </Badge>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-2 p-4">
                            <div className="flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Service status
                              </p>
                              <p className="text-sm font-semibold capitalize">
                                {v.status ?? "N/A"}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Reference no.
                              </p>
                              <p className="text-sm font-semibold ">
                                {v.fullPaymentRefNo ?? "N/A"}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Amount sent
                              </p>
                              <p className="text-sm font-semibold ">
                                {formatValue({
                                  value: String(v.fullPaymentAmount),
                                  intlConfig: {
                                    locale: "ph",
                                    currency: "php",
                                  },
                                }) ?? "N/A"}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Payment type
                              </p>
                              <p className="text-sm font-semibold capitalize">
                                {v.paymentType.split("-").join(" ") ?? "N/A"}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Date & time of payment
                              </p>
                              <p className="text-xs font-semibold">
                                {format(new Date(v.fullPaymentDate), "PP p")}
                              </p>
                            </div>
                            <Separator />
                            <div className="flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                From
                              </p>
                              <p className="text-xs font-semibold">
                                {v.guestID.username}
                              </p>
                            </div>
                            <Separator />
                          </CardContent>
                          <CardFooter className="flex justify-between gap-2 max-lg:flex-col p-2">
                            <Button
                              onClick={() =>
                                mutate({
                                  fullPaymentVerificationStatus:
                                    v.fullPaymentVerificationStatus,
                                  partialPaymentVerificationStatus:
                                    v.partialPaymentVerificationStatus,
                                  paymentStatus: v.paymentStatus,
                                  paymentType: v.paymentType,
                                  reservationID: v._id,
                                  status: "rejected",
                                })
                              }
                              type="button"
                              variant={"destructive"}
                              className="w-full"
                            >
                              Reject
                            </Button>
                            <Button
                              onClick={() =>
                                mutate({
                                  fullPaymentVerificationStatus:
                                    v.fullPaymentVerificationStatus,
                                  partialPaymentVerificationStatus:
                                    v.partialPaymentVerificationStatus,
                                  paymentStatus: v.paymentStatus,
                                  paymentType: v.paymentType,
                                  reservationID: v._id,
                                  status: "success",
                                })
                              }
                              className="w-full"
                              type="button"
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

export default Payments;
