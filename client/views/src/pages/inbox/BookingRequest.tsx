import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useGetBookingRequestDetails from "@/hooks/useGetBookingRequestDetails";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { compareAsc, differenceInDays, formatDistance } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";

function BookingRequest() {
  const { data, isPending } = useGetBookingRequestDetails();

  console.log(data?.data.bookingRequest);

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold text-xl">Booking request details</h1>
              <Badge
                className={` ${
                  data?.data.bookingRequest.status === "pending"
                    ? "bg-amber-600 hover:bg-amber-500"
                    : data?.data.bookingRequest.status === "approved"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                } uppercase w-max`}
              >
                {data?.data.bookingRequest.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-center w-max mx-auto">
              <div className="w-20 h-20">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    className="object-cover"
                    src={data?.data.bookingRequest.guestID.photoUrl}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-semibold text-lg">
                {data?.data.bookingRequest.guestID.username}
              </span>
              <span className="font-semibold text-sm text-gray-600">
                {formatDistance(
                  new Date(
                    data?.data.bookingRequest.requestedBookingDateEndsAt
                  ),
                  new Date(
                    data?.data.bookingRequest.requestedBookingDateStartsAt
                  )
                )}
                {" - "}
                {formatValue({
                  value: String(
                    data?.data.bookingRequest.listingID.price *
                      differenceInDays(
                        new Date(
                          data?.data.bookingRequest.requestedBookingDateEndsAt
                        ),
                        new Date(
                          data?.data.bookingRequest.requestedBookingDateStartsAt
                        )
                      )
                  ),
                  intlConfig: {
                    locale: "PH",
                    currency: "php",
                  },
                })}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2">
                <h3 className="uppercase font-semibold text-sm">Message</h3>
                <CardDescription className="text-sm font-semibold italic">
                  {data?.data.bookingRequest.message}
                </CardDescription>
              </div>

              <div className="w-full flex items-end justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-xs" variant={"outline"}>
                      View {data?.data.bookingRequest.guestID.username}'s
                      information
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Card className="w-max">
                      <CardHeader className="p-4"></CardHeader>
                      <CardContent className="flex flex-col gap-2">
                        {data?.data.bookingRequest.guestID.emailVerified ? (
                          <div className="w-max flex items-center justify-center gap-2">
                            {" "}
                            <CheckCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block bg-green-600 rounded-full"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Email verified
                            </p>
                          </div>
                        ) : (
                          <div className="w-max flex items-center justify-center gap-2">
                            {" "}
                            <CrossCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block bg-red-600 rounded-full"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Email verified
                            </p>
                          </div>
                        )}
                        {data?.data.bookingRequest.guestID.identityVerified ? (
                          <div className="w-max flex items-center justify-center gap-2">
                            {" "}
                            <CheckCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block bg-green-600 rounded-full"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Identity verified
                            </p>
                          </div>
                        ) : (
                          <div className="w-max flex items-center justify-center gap-2">
                            {" "}
                            <CrossCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block bg-red-600 rounded-full"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Identity (not verified)
                            </p>
                          </div>
                        )}
                        {data?.data.bookingRequest.guestID.mobileVerified ? (
                          <div className="w-max flex items-center justify-center gap-2">
                            {" "}
                            <CheckCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block bg-green-600 rounded-full"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Mobile verified
                            </p>
                            <p className="text-sm font-semibold text-gray-600">
                              {data?.data.bookingRequest.guestID.mobilePhone}
                            </p>
                          </div>
                        ) : (
                          <div className="w-max flex items-center justify-center gap-2">
                            {" "}
                            <CrossCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block bg-red-600 rounded-full"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Mobile (not verified)
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>

                <div className="w-max h-max border rounded-md p-4">
                  <div className="flex items-center justify-between gap-2">
                    <CardDescription className="font-semibold text-sm text-black">
                      Requested dates
                    </CardDescription>
                    {compareAsc(
                      new Date().setHours(0, 0, 0, 0),
                      new Date(
                        data?.data.bookingRequest.requestedBookingDateStartsAt
                      )
                    ) > 0 ? (
                      <Badge variant={"destructive"}>Expired</Badge>
                    ) : (
                      <Badge>Available</Badge>
                    )}
                  </div>
                  <CardDescription className="mt-2 font-medium">
                    {new Date(
                      data?.data.bookingRequest.requestedBookingDateStartsAt
                    ).toDateString()}
                    {" - "}
                    {new Date(
                      data?.data.bookingRequest.requestedBookingDateEndsAt
                    ).toDateString()}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="justify-between gap-2 p-4">
            <div className="flex items-center gap-2">
              <Button className="bg-gray-950 rounded-full">Accept</Button>
              <Button className="rounded-full" variant={"destructive"}>
                Decline
              </Button>
            </div>
            <Button variant={"link"}>
              <Link to={"/"}>View profile</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default BookingRequest;
