import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetBookingRequestDetails from "@/hooks/useGetBookingRequestDetails";
import { compareAsc, format, formatDistance } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";
import DeclineReasons from "./DeclineReasons";
import UserInformation, { TUserID } from "./UserInformation";
import useSendBookingRequestUpdate from "@/hooks/useSendBookingRequestUpdate";
import MessageGuest from "@/partials/components/messages/MessageGuest";
import { useMediaQuery } from "usehooks-ts";

function BookingRequest() {
  const matches = useMediaQuery("(max-width: 768px)");
  const { data, isPending } = useGetBookingRequestDetails();
  const sendBookingRequestUpdate = useSendBookingRequestUpdate();

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : data?.data.bookingRequest.type == "Service-Cancellation-Request" ? (
        <Card className="w-full">
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-bold">
                Service Cancellation Request Details
              </h1>
              <Badge
                className={` ${
                  data?.data.bookingRequest.status === "pending"
                    ? "bg-amber-600 hover:bg-amber-500"
                    : data?.data.bookingRequest.status === "approved"
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-red-600 hover:bg-red-500"
                } w-max uppercase`}
              >
                {data?.data.bookingRequest.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="mx-auto flex w-max flex-col items-center">
              <div className="h-20 w-20 max-md:h-12 max-md:w-12">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    className="object-cover"
                    src={data?.data.bookingRequest.guestID.photoUrl}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="max-w-xs text-center">
                <span className="mt-2 text-sm font-bold">
                  {data?.data.bookingRequest.guestID.username} wants to request
                  a service cancellation for{" "}
                </span>
                <Link
                  to={`/hosting-listings/edit/${data?.data.bookingRequest.listingID._id}`}
                  className="text-sm font-semibold capitalize underline"
                >
                  {data?.data.bookingRequest.listingID.serviceTitle}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2">
                <h3 className="text-base font-medium text-gray-600">
                  Cancellation reason
                </h3>
                <blockquote className="my-4 mt-2 border-s-4 border-gray-300 bg-gray-50 p-4">
                  <p className="font-medium capitalize italic max-sm:text-xs">
                    " {data?.data.bookingRequest.guestCancelReasons}"
                  </p>
                </blockquote>
              </div>
              <UserInformation
                userID={data?.data.bookingRequest.guestID as TUserID}
              />
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="justify-between gap-2 p-4">
            <Button size={"sm"} variant={"outline"}>
              <Link
                to={`/reservation-details/${data?.data.bookingRequest.reservationID}`}
              >
                {matches ? "Details" : " View reservation details"}
              </Link>
            </Button>
            <div className="flex items-center justify-center">
              <MessageGuest id={data?.data.bookingRequest.guestID._id} />
              <Button variant={"link"}>
                <Link
                  className="max-md:text-xs"
                  to={`/users/visit/show/${data?.data.bookingRequest.guestID._id}`}
                >
                  View profile
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader className="max-md:p-2">
            <div className="flex w-full items-center justify-between max-md:flex-col max-md:gap-2">
              <h1 className="text-xl font-bold max-md:text-lg max-sm:text-base">
                Booking Request Details
              </h1>
              <Badge
                className={` ${
                  data?.data.bookingRequest.status === "pending"
                    ? "bg-amber-600 hover:bg-amber-500"
                    : data?.data.bookingRequest.status === "approved"
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-red-600 hover:bg-red-500"
                } w-max uppercase`}
              >
                {data?.data.bookingRequest.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 max-md:p-2">
            <div className="mx-auto flex w-max flex-col items-center">
              <div className="h-20 w-20 max-md:h-12 max-md:w-12">
                <Avatar className="h-full w-full ">
                  <AvatarImage
                    className="object-cover"
                    src={data?.data.bookingRequest.guestID.photoUrl}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <span className="mt-2 text-sm font-bold">
                {data?.data.bookingRequest.guestID.username} wants to book{" "}
              </span>
              <div className="flex gap-1">
                <Link
                  to={`/hosting-listings/edit/${data?.data.bookingRequest.listingID._id}`}
                  className="text-sm font-semibold capitalize underline"
                >
                  {data?.data.bookingRequest.listingID.serviceTitle}
                </Link>
                <span className="text-sm font-semibold ">
                  for{" "}
                  {formatDistance(
                    new Date(
                      data?.data.bookingRequest.requestedBookingDateEndsAt,
                    ),
                    new Date(
                      data?.data.bookingRequest.requestedBookingDateStartsAt,
                    ),
                  )}
                  {" - "}
                  <span className="text-green-600">
                    {formatValue({
                      value: String(data?.data.bookingRequest.totalPrice),
                      intlConfig: {
                        locale: "PH",
                        currency: "php",
                      },
                      decimalScale: 2,
                    })}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2">
                <h3 className="text-base font-medium text-gray-600 max-sm:text-xs">
                  Message
                </h3>
                <blockquote className="my-4 mt-2 border-s-4 border-gray-300 bg-gray-50 p-4">
                  <p className="font-medium italic max-sm:text-xs">
                    "{data?.data.bookingRequest.message}"
                  </p>
                </blockquote>
              </div>
              <div className="flex w-full items-end justify-between max-md:w-full max-md:flex-col max-md:gap-2">
                <UserInformation
                  userID={data?.data.bookingRequest.guestID as TUserID}
                />
                <div className="h-max w-max rounded-md border p-3 shadow-md max-md:w-full">
                  <div className="flex items-center justify-between gap-2 ">
                    <CardDescription className="text-sm font-semibold text-black max-sm:text-xs">
                      Requested dates
                    </CardDescription>
                    {data?.data.bookingRequest.status === "approved" ? (
                      <Badge
                        variant={"outline"}
                        className="font-bold text-green-600"
                      >
                        Reserved
                      </Badge>
                    ) : compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ) > 0 ? (
                      <Badge variant={"destructive"}>Expired</Badge>
                    ) : (
                      <Badge
                        variant={"outline"}
                        className="font-bold text-green-600"
                      >
                        Valid
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-2 font-semibold max-sm:text-center max-sm:text-xs">
                    {format(
                      new Date(
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ),
                      "EEE MMMM do",
                    )}
                    {" - "}
                    {format(
                      new Date(
                        new Date(
                          data?.data.bookingRequest.requestedBookingDateEndsAt,
                        ),
                      ),
                      "EEE MMMM do",
                    )}
                  </CardDescription>
                  {data?.data.bookingRequest.guestCancelReasons && (
                    <Badge
                      variant={"destructive"}
                      className=" capitalize max-sm:!bg-white max-sm:p-0 max-sm:font-bold max-sm:text-red-600"
                    >
                      Cancellation Reason -{" "}
                      {data?.data.bookingRequest.guestCancelReasons}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          {data?.data.bookingRequest.status !== "approved" && (
            <>
              <Separator />
              <CardFooter className="justify-between gap-2 p-4 max-md:flex-col">
                <div className="flex items-center gap-2 ">
                  <Button
                    disabled={
                      compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ) > 0 ||
                      sendBookingRequestUpdate.isPending ||
                      data?.data.bookingRequest.status === "cancelled" ||
                      data?.data.bookingRequest.status === "declined"
                    }
                    onClick={() =>
                      sendBookingRequestUpdate.mutate({
                        bookingRequestID: data?.data.bookingRequest._id,
                        receiverName:
                          data?.data.bookingRequest.guestID.username,
                      })
                    }
                    className="rounded-full bg-gray-950"
                  >
                    Accept
                  </Button>
                  <DeclineReasons
                    bookingRequestID={data?.data.bookingRequest._id}
                    isCancelled={
                      data?.data.bookingRequest.status === "cancelled" ||
                      data?.data.bookingRequest.status === "declined"
                    }
                    isExpired={
                      compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ) > 0
                    }
                  />
                </div>
                <div className="flex items-center justify-center">
                  <MessageGuest id={data?.data.bookingRequest.guestID._id} />
                  <Button variant={"link"}>
                    <Link
                      className="max-md:text-xs"
                      to={`/users/visit/show/${data?.data.bookingRequest.guestID._id}`}
                    >
                      View profile
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
          {data?.data.bookingRequest.status === "approved" && (
            <>
              <Separator />
              <CardFooter className="justify-between gap-2 p-4 max-md:flex-col">
                <Button
                  className="max-md:w-full"
                  size={"sm"}
                  variant={"outline"}
                >
                  <Link
                    to={`/reservation-details/${data?.data.bookingRequest.reservationID}`}
                  >
                    {matches ? "Details" : " View reservation details"}
                  </Link>
                </Button>
                <div className="flex items-center justify-center">
                  <MessageGuest id={data?.data.bookingRequest.guestID._id} />
                  <Button variant={"link"}>
                    <Link
                      className="max-md:text-xs"
                      to={`/users/visit/show/${data?.data.bookingRequest.guestID._id}`}
                    >
                      View profile
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
}

export default BookingRequest;
