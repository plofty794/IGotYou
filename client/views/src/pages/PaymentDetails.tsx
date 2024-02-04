import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetReservationDetails from "@/hooks/useGetReservationDetails";
import Loader from "@/partials/loaders/Loader";
import { useEffect } from "react";
import { TUser } from "./Home";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import GuestPaymentDetails from "@/partials/components/GuestPaymentDetails";
import HostPayoutDetails from "@/partials/components/HostPayoutDetails";
import { Separator } from "@/components/ui/separator";
import { formatValue } from "react-currency-input-field";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

function PaymentDetails() {
  const { data, isPending } = useGetReservationDetails();

  useEffect(() => {
    document.title = "Transaction History - IGotYou";
  }, []);

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <section className="flex flex-col gap-8 p-6">
          <div className="flex w-max items-center justify-center gap-2">
            <Button
              onClick={() => history.back()}
              variant={"ghost"}
              className="rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </Button>
            <h1 className="text-2xl font-bold">Payment</h1>
          </div>
          <div className="mx-auto flex w-full max-w-5xl gap-6">
            {data?.data.isHost ? (
              <HostPayoutDetails
                reservationDetails={
                  data?.data.reservationDetails as TReservationDetails
                }
              />
            ) : (
              <GuestPaymentDetails
                reservationDetails={
                  data?.data.reservationDetails as TReservationDetails
                }
              />
            )}
            <Card className="h-max w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Transaction history</CardTitle>
              </CardHeader>
              <CardContent>
                {(data?.data.reservationDetails as TReservationDetails)
                  .partialPaymentVerificationStatus ? (
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Payment type
                      </p>
                      <p className="text-sm font-semibold capitalize">
                        {(
                          data?.data.reservationDetails as TReservationDetails
                        ).paymentType
                          .split("-")
                          .join(" ")}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Amount paid
                      </p>
                      <p className="text-sm font-semibold">
                        {formatValue({
                          value: String(
                            (
                              data?.data
                                .reservationDetails as TReservationDetails
                            ).partialPaymentAmount,
                          ),
                          intlConfig: {
                            locale: "ph",
                            currency: "php",
                          },
                        })}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Reference no.
                      </p>
                      <p className="text-sm font-semibold">
                        {
                          (data?.data.reservationDetails as TReservationDetails)
                            .partialPaymentRefNo
                        }
                      </p>
                    </div>
                    <Separator />
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Date & time of payment
                      </p>
                      <p className="text-xs font-semibold">
                        {format(
                          new Date(data?.data.reservationDetails.updatedAt),
                          "PP p",
                        )}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Payment proof photo
                      </p>
                      <img
                        loading="lazy"
                        alt="Partial payment photo"
                        className="rounded-lg border object-cover shadow-lg"
                        src={
                          (data?.data.reservationDetails as TReservationDetails)
                            .partialPaymentProofPhoto.thumbnail_url
                        }
                      />
                    </div>
                    <Separator />
                    {data?.data.reservationDetails
                      .partialPaymentVerificationStatus === "success" && (
                      <>
                        {" "}
                        <div className="mt-4 flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Remaining balance
                          </p>
                          <p className="text-sm font-semibold">
                            {formatValue({
                              value: String(
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).balance,
                              ),
                              intlConfig: {
                                locale: "ph",
                                currency: "php",
                              },
                            })}
                          </p>
                        </div>
                        <Separator />
                      </>
                    )}
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-semibold text-gray-600">
                        Payment verification status
                      </p>
                      <Badge>
                        {
                          (data?.data.reservationDetails as TReservationDetails)
                            .partialPaymentVerificationStatus
                        }
                      </Badge>
                    </div>
                  </div>
                ) : (data?.data.reservationDetails as TReservationDetails)
                    .fullPaymentVerificationStatus ? (
                  <>
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">
                          Payment type
                        </p>
                        <p className="text-sm font-semibold capitalize">
                          {(
                            data?.data.reservationDetails as TReservationDetails
                          ).paymentType
                            .split("-")
                            .join(" ")}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">
                          Amount paid
                        </p>
                        <p className="text-sm font-semibold">
                          {formatValue({
                            value: String(
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).fullPaymentAmount,
                            ),
                            intlConfig: {
                              locale: "ph",
                              currency: "php",
                            },
                          })}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">
                          Reference no.
                        </p>
                        <p className="text-sm font-semibold">
                          {
                            (
                              data?.data
                                .reservationDetails as TReservationDetails
                            ).fullPaymentRefNo
                          }
                        </p>
                      </div>
                      <Separator />
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">
                          Date & time of payment
                        </p>
                        <p className="text-xs font-semibold">
                          {format(
                            new Date(
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).fullPaymentDate,
                            ),
                            "PP p",
                          )}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">
                          Payment proof photo
                        </p>
                        <img
                          loading="lazy"
                          alt="Partial payment photo"
                          className="rounded-lg border object-cover shadow-lg"
                          src={
                            (
                              data?.data
                                .reservationDetails as TReservationDetails
                            ).fullPaymentProofPhoto.thumbnail_url
                          }
                        />
                      </div>
                      <Separator />
                      {(data?.data.reservationDetails as TReservationDetails)
                        .fullPaymentVerificationStatus === "success" && (
                        <>
                          {" "}
                          <div className="mt-4 flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Remaining balance
                            </p>
                            <p className="text-sm font-semibold">
                              {formatValue({
                                value: String(
                                  (
                                    data?.data
                                      .reservationDetails as TReservationDetails
                                  ).balance,
                                ),
                                intlConfig: {
                                  locale: "ph",
                                  currency: "php",
                                },
                              })}
                            </p>
                          </div>
                          <Separator />
                        </>
                      )}
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">
                          Payment verification status
                        </p>
                        <Badge>
                          {
                            (
                              data?.data
                                .reservationDetails as TReservationDetails
                            ).fullPaymentVerificationStatus
                          }
                        </Badge>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-lg font-semibold text-gray-600">
                    No transactions to show
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

export default PaymentDetails;

export type TReservationDetails = {
  _id: string;
  bookingStartsAt: string;
  bookingEndsAt: string;
  paymentStatus: string;
  paymentAmount: number;
  partialPaymentRefNo: string;
  fullPaymentRefNo: string;
  paymentType: "full-payment" | "partial-payment";
  status: string;
  createdAt: string;
  updatedAt: string;
  guestID: TUser;
  hostID: TUser;
  listingID: TListing;
  partialPaymentDate: string;
  fullPaymentDate: string;
  partialPaymentProofPhoto: {
    public_id: string;
    secure_url: string;
    thumbnail_url: string;
  };
  fullPaymentProofPhoto: {
    public_id: string;
    secure_url: string;
    thumbnail_url: string;
  };
  fullPaymentAmount: number;
  partialPaymentAmount: number;
  partialPaymentVerificationStatus: "pending" | "success" | "rejected";
  fullPaymentVerificationStatus: "pending" | "success" | "rejected";
  balance: number;
};
