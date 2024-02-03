import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetReservationDetails from "@/hooks/useGetReservationDetails";
import Loader from "@/partials/loaders/Loader";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function PaymentDetails() {
  const { data, isPending } = useGetReservationDetails();

  useEffect(() => {
    document.title = "Transaction History - IGotYou";
  }, []);

  console.log(data?.data);

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
            <h1 className="text-2xl font-bold">Payment details</h1>
          </div>
          <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">
                  {data?.data.isHost ? "Payout details" : "Payment details"}
                </CardTitle>
                {data?.data.isHost && (
                  <>
                    <Avatar className="mx-auto h-max w-max">
                      <AvatarImage
                        className="h-16 w-16"
                        src={data?.data.reservationDetails.guestID.photoUrl}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardDescription className="text-center font-bold text-black">
                      {data?.data.reservationDetails.guestID.username}
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              {data?.data.isHost ? (
                <CardContent className="flex flex-col gap-2">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Reference no.
                    </p>
                    <p className="text-sm font-semibold ">
                      {data?.data.reservationDetails.paymentRefNo ?? "N/A"}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Amount
                    </p>
                    <p className="text-sm font-semibold ">
                      {data?.data.reservationDetails.paymentRefNo ?? "N/A"}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Payment type
                    </p>
                    <p className="text-sm font-semibold ">
                      {data?.data.isHost
                        ? data?.data.reservationDetails.paymentType
                          ? data?.data.reservationDetails.paymentType
                          : "N/A"
                        : data?.data.reservationDetails.paymentType ?? "N/A"}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full flex-col items-center gap-2">
                    <Badge>Payment proof photo</Badge>
                    <Card className="h-40 w-full">
                      Image will be shown here
                    </Card>
                  </div>
                </CardContent>
              ) : data?.data.reservationDetails.paymentStatus === "pending" ? (
                <CardContent className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-sm font-semibold">Pay with</p>{" "}
                    <img
                      src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_gcash.b8705e185f2ff5d047a01ecd97799c17.svg"
                      alt="Gcash"
                    />
                  </div>
                  <Badge
                    variant={"outline"}
                    className="mx-auto w-max font-bold"
                  >
                    Send the payment through this # +63907 925 1189
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="mx-auto w-96 gap-2"
                      >
                        Select payment type{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                          />
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      <div className="flex flex-col gap-2">
                        {" "}
                        <Button
                          size={"lg"}
                          variant={"outline"}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          Partial payment 50%
                        </Button>
                        <Button
                          size={"lg"}
                          variant={"outline"}
                          className="text-green-600 hover:text-green-500"
                        >
                          Full payment
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input className="font-medium" placeholder="Reference no." />
                  <Input className="font-medium" placeholder="Amount" />

                  <Button size={"sm"} variant={"outline"} className="gap-2">
                    Upload payment proof
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z" />
                      <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
                    </svg>
                  </Button>
                </CardContent>
              ) : (
                "View Payment method"
              )}

              <CardFooter>
                <div className="flex w-full flex-col gap-2">
                  {!data?.data.isHost && (
                    <Button className="w-full bg-gray-950" size={"lg"}>
                      Confirm and pay
                    </Button>
                  )}
                  <div className="flex w-full gap-2">
                    {" "}
                    <Button size={"sm"} className="w-full bg-gray-950">
                      Email{" "}
                      {data?.data.isHost
                        ? data?.data.reservationDetails.guestID.username
                        : data?.data.reservationDetails.hostID.username}
                    </Button>
                    <Button size={"sm"} className="w-full bg-gray-950">
                      Message
                    </Button>
                  </div>
                </div>
              </CardFooter>
              <div className="mx-auto w-max px-6 py-0 pb-4">
                <Badge variant={"destructive"}>
                  Payment must be fulfilled before the service ends
                </Badge>
              </div>
            </Card>
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Transaction history</CardTitle>
              </CardHeader>
              <CardContent>
                {data?.data.isHost
                  ? data.data.reservationDetails.paymentStatus === "pending"
                    ? "No transactions to show"
                    : data?.data.reservationDetails.paymentStatus ===
                        "partially-paid"
                      ? "Guest paid partially"
                      : "Guest has paid fully"
                  : "Pay to see your payment transactions"}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

export default PaymentDetails;
