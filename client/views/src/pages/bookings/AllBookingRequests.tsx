import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { compareAsc, formatDistance } from "date-fns";
import Lottie from "lottie-react";
import { formatValue } from "react-currency-input-field";
import noRequest from "../../assets/no-pending-payments.json";
import useGetGuestBookingRequests from "@/hooks/useGetGuestBookingRequests";
import { jelly } from "ldrs";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import useSearchGuestBookingRequests from "@/hooks/useSearchGuestBookingRequests";
import SearchResults from "./SearchResults";
import { useQueryClient } from "@tanstack/react-query";
import CancelRequestDialog from "./components/CancelRequestDialog";
import useReAttemptBooking from "@/hooks/useReAttemptBooking";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
jelly.register();

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function AllBookingRequests() {
  const { data, isPending } = useGetGuestBookingRequests();
  const [search, setSearch] = useState("");
  const searchData = useSearchGuestBookingRequests(search);
  const queryClient = useQueryClient();
  const reAttemptBooking = useReAttemptBooking();

  useEffect(() => {
    document.title = "All Booking Requests - IGotYou";
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      queryClient.removeQueries({
        queryKey: ["booking-requests"],
        type: "inactive",
      });
    }
  }, [queryClient, search.length]);

  return (
    <>
      <span className="relative">
        <Input
          autoFocus
          className="sticky top-2 mx-auto mt-4 w-1/3 bg-white font-medium shadow-xl focus-visible:ring-0 max-md:w-full"
          value={search}
          placeholder="You can search by Service name or Host name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </span>
      {isPending || searchData.isFetching ? (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <l-jelly size="40" speed="0.9" color="black"></l-jelly>
        </div>
      ) : searchData.data?.data.searchResults ? (
        <SearchResults
          searchResults={searchData.data.data.searchResults as []}
        />
      ) : data?.pages.flatMap((page) => page.data.bookingRequests).length ??
        [].length > 0 ? (
        data?.pages.flatMap((page) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          page.data.bookingRequests.map((v: any) => (
            <Card className="my-2 w-full" key={v._id}>
              <CardHeader className="flex-row justify-between p-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="m-0">
                    <Badge className="rounded-full text-sm capitalize max-sm:bg-white max-sm:p-0 max-sm:text-xs max-sm:font-semibold max-sm:text-black">
                      {v.hostID.username}
                    </Badge>
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={"/messages"}>
                          <Button variant={"outline"} className="rounded-full">
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
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                              />
                            </svg>
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="capitalize">Chat {v.hostID.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button variant={"link"} className="p-0 text-xs">
                    <Link to={`/users/visit/show/${v.hostID._id}`}>
                      View profile
                    </Link>
                  </Button>
                </div>
                <Badge
                  className={`rounded-full font-bold uppercase ${
                    v.status === "pending"
                      ? "text-amber-600"
                      : v.status === "approved"
                        ? "text-green-600"
                        : v.status === "cancelled"
                          ? "text-red-600"
                          : "text-red-800"
                  }`}
                  variant={"outline"}
                >
                  {v.status}
                </Badge>
              </CardHeader>
              <Separator />
              <CardContent className="flex w-full justify-between p-4 max-md:flex-col">
                <div className="flex gap-2">
                  <div className="h-44 w-44 overflow-hidden rounded-md max-md:h-32 max-md:w-32 max-sm:hidden">
                    {v.listingID.listingAssets[0]?.format === "mp4" ? (
                      <AdvancedImage
                        className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                        cldImg={cld
                          .image(v.listingID.listingAssets[0].public_id)
                          .setAssetType("video")
                          .format("auto:image")}
                      />
                    ) : v.listingID.listingAssets[0]?.format === "mp3" ? (
                      <img
                        className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                        src={
                          "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                        }
                        alt="some image"
                        loading="lazy"
                      />
                    ) : (
                      <AdvancedImage
                        cldImg={cld.image(
                          v.listingID.listingAssets[0].public_id,
                        )}
                        plugins={[
                          lazyload(),
                          responsive({
                            steps: [800, 1000, 1400],
                          }),
                        ]}
                        className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold capitalize">
                      {v.listingID.serviceTitle}
                    </p>
                    <span className="text-sm font-semibold ">
                      {v.listingID.serviceType}
                    </span>
                    <span className="text-sm font-semibold">
                      Requested date:{" "}
                      {new Date(v.requestedBookingDateStartsAt).toDateString()}{" "}
                      - {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
                    </span>
                    <Badge
                      variant={"outline"}
                      className={`w-max font-bold ${
                        v.listingID.cancellationPolicy === "Flexible"
                          ? "text-green-600"
                          : v.listingID.cancellationPolicy === "Moderate"
                            ? "text-amber-600"
                            : v.listingID.cancellationPolicy ===
                                "Non-refundable"
                              ? "text-red-600"
                              : " text-red-800"
                      }`}
                    >
                      Cancellation policy - {v.listingID.cancellationPolicy}
                    </Badge>
                    <Badge className="w-max">
                      Duration{" "}
                      {formatDistance(
                        new Date(v.requestedBookingDateStartsAt).setHours(
                          0,
                          0,
                          0,
                          0,
                        ),
                        new Date(v.requestedBookingDateEndsAt).setHours(
                          0,
                          0,
                          0,
                          0,
                        ),
                      )}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between gap-2">
                  <div className="flex h-full flex-col items-end justify-between">
                    <div className="flex flex-col">
                      <Badge
                        variant={"secondary"}
                        className="w-max text-base font-bold"
                      >
                        Total:{" "}
                        {formatValue({
                          value: String(v.totalPrice),
                          intlConfig: {
                            locale: "PH",
                            currency: "php",
                          },
                        })}
                      </Badge>
                      {v.status === "pending" && (
                        <CancelRequestDialog
                          bookingRequestID={v._id as string}
                        />
                      )}
                    </div>
                    {v.status === "pending" &&
                      compareAsc(
                        new Date(v.requestedBookingDateStartsAt),
                        new Date().setHours(0, 0, 0, 0),
                      ) >= 0 && (
                        <Badge className="bg-green-600 hover:bg-green-500">
                          Awaiting host approval
                        </Badge>
                      )}
                    {v.status === "pending" &&
                      compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(v.requestedBookingDateStartsAt),
                      ) > 0 && (
                        <Badge variant={"destructive"}>
                          Expired booking request
                        </Badge>
                      )}
                    {v.status === "approved" && (
                      <Button size={"sm"} variant={"outline"}>
                        <Link to={`/reservation-details/${v.reservationID}`}>
                          {" "}
                          View reservation details
                        </Link>
                      </Button>
                    )}
                  </div>
                  {v.status === "cancelled" && (
                    <>
                      <Button
                        disabled={reAttemptBooking.isPending}
                        onClick={() =>
                          reAttemptBooking.mutate({ bookingRequestID: v._id })
                        }
                        variant={"outline"}
                      >
                        Request again
                      </Button>
                      <Badge className="w-max" variant={"destructive"}>
                        Cancellation Reason -
                        <span className="ml-1 capitalize">
                          {v.guestCancelReasons}
                        </span>
                      </Badge>
                    </>
                  )}
                  {v.status === "declined" && (
                    <>
                      <Badge className="w-max" variant={"destructive"}>
                        Decline Reason -
                        <span className="ml-1 capitalize">
                          {v.hostDeclineReasons}
                        </span>
                      </Badge>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )),
        )
      ) : (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center">
          <Lottie
            animationData={noRequest}
            loop={false}
            className="h-36 w-36"
          />{" "}
          <span className="text-lg font-bold text-gray-600">No requests</span>
        </div>
      )}
    </>
  );
}

export default AllBookingRequests;
