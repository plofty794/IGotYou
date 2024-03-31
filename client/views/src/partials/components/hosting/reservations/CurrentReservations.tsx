import useGetCurrentReservations from "@/hooks/useGetCurrentReservations";
import noReservations from "../../../../assets/no-pending-payments.json";
import Lottie from "lottie-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { formatValue } from "react-currency-input-field";
import MessageGuest from "../../messages/MessageGuest";
import { useMediaQuery } from "usehooks-ts";

function CurrentReservations() {
  const { data, isPending } = useGetCurrentReservations();
  const matches = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.data.currentReservation.length > 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.data.currentReservation.map((v: any) => (
          <Card className="w-full" key={v._id}>
            <CardHeader className="flex-row justify-between p-4 max-md:justify-normal">
              <div className="flex items-center gap-2">
                <CardTitle className="m-0">
                  <Badge className="rounded-full text-sm">
                    {v.guestID.username}
                  </Badge>
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MessageGuest id={v.guestID._id} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Chat {v.guestID.username}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button variant={"link"} className="p-0 text-xs">
                  <Link to={`/users/visit/show/${v.guestID._id}`}>
                    View profile
                  </Link>
                </Button>
              </div>
              <Badge
                className={`rounded-full font-bold uppercase max-md:ml-auto ${
                  v.status === "scheduled"
                    ? "text-blue-600"
                    : v.status === "ongoing"
                      ? "text-yellow-600"
                      : v.status === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                }`}
                variant={"outline"}
              >
                {v.status}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="flex w-full justify-between p-4">
              <div className="flex gap-2">
                <div className="h-44 w-44 overflow-hidden rounded-md max-md:w-full">
                  <img
                    src={v.listingID.listingAssets[0]?.secure_url}
                    alt="Image"
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold max-md:hidden">
                    {v.listingID.serviceTitle}
                  </span>
                  <span className="text-sm font-semibold max-md:hidden">
                    {v.listingID.serviceType}
                  </span>
                  <span className="text-sm font-semibold max-md:hidden">
                    Requested dates:{" "}
                    {format(new Date(v.bookingStartsAt), "iii MMMM do")} -{" "}
                    {format(new Date(v.bookingEndsAt), "iii MMMM do")}
                  </span>
                  <Badge
                    variant={"outline"}
                    className={`w-max font-bold max-md:hidden ${
                      v.listingID.cancellationPolicy === "Flexible"
                        ? "text-green-600"
                        : v.listingID.cancellationPolicy === "Moderate"
                          ? "text-amber-600"
                          : v.listingID.cancellationPolicy === "Non-refundable"
                            ? "text-red-600"
                            : " text-red-800"
                    }`}
                  >
                    Cancellation policy - {v.listingID.cancellationPolicy}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-2">
                <div className="flex h-full flex-col items-end justify-between ">
                  <div className="flex flex-col">
                    <Badge
                      variant={"secondary"}
                      className="text-base font-bold max-md:text-sm max-sm:text-xs"
                    >
                      Total:{" "}
                      {formatValue({
                        value: String(v.paymentAmount),
                        intlConfig: {
                          locale: "PH",
                          currency: "php",
                        },
                      })}
                    </Badge>
                  </div>
                </div>
                {v.status !== "cancelled" && (
                  <Button size={"sm"} variant={"outline"}>
                    <Link to={`/reservation-details/${v._id}`}>
                      {matches ? "Details" : "View reservation details"}
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 p-6 ">
          <Lottie
            loop={false}
            animationData={noReservations}
            className="h-32 w-32"
          />
          <span className="font-semibold text-gray-600">
            No current reservation
          </span>
        </div>
      )}
    </>
  );
}

export default CurrentReservations;
