import useGetPreviousReservations from "@/hooks/useGetPreviousReservations";
import Lottie from "lottie-react";
import noReservations from "../../../../assets/no-pending-payments.json";
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
import { format, formatDistance } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageGuest from "../../messages/MessageGuest";
import { useMediaQuery } from "usehooks-ts";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function PreviousReservations() {
  const { data, isPending } = useGetPreviousReservations();
  const matches = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.pages[0].data.previousReservations?.length > 0 ? (
        <ScrollArea className="h-[17.5rem] p-2">
          {data?.pages.flatMap((page) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            page.data.previousReservations.map((v: any) => (
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
                    <div className="h-full w-44 overflow-hidden rounded-md max-md:w-full">
                      <Link to={`/hosting-listings/edit/${v.listingID._id}`}>
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
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-bold capitalize max-md:hidden">
                        {v.listingID.serviceTitle}
                      </span>
                      <span className="text-sm font-semibold capitalize max-md:hidden">
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
                              : v.listingID.cancellationPolicy ===
                                  "Non-refundable"
                                ? "text-red-600"
                                : " text-red-800"
                        }`}
                      >
                        Cancellation policy - {v.listingID.cancellationPolicy}
                      </Badge>
                      <Badge className="w-max max-md:hidden">
                        Booking ended{" "}
                        {formatDistance(
                          new Date(v.bookingStartsAt),
                          new Date().setHours(0, 0, 0, 0),
                          {
                            addSuffix: true,
                          },
                        ) === "less than a minute ago" && "Today"}
                        {formatDistance(
                          new Date(v.bookingStartsAt),
                          new Date().setHours(0, 0, 0, 0),
                          {
                            addSuffix: true,
                          },
                        ) !== "less than a minute ago" &&
                          formatDistance(
                            new Date(v.bookingStartsAt),
                            new Date().setHours(0, 0, 0, 0),
                            {
                              addSuffix: true,
                            },
                          )}
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
                      <Button
                        className="max-md:text-xs"
                        size={"sm"}
                        variant={"outline"}
                      >
                        <Link to={`/reservation-details/${v._id}`}>
                          {matches ? "Details" : "View reservation details"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )),
          )}
        </ScrollArea>
      ) : (
        <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 p-6">
          <Lottie
            loop={false}
            animationData={noReservations}
            className="h-32 w-32"
          />
          <span className="font-semibold text-gray-600">
            No previous reservations
          </span>
        </div>
      )}
    </>
  );
}

export default PreviousReservations;
