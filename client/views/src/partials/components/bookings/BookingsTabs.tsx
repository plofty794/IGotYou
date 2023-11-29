import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatValue } from "react-currency-input-field";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import noRequest from "../../../assets/no-pending-payments.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BookingsTabs({ bookingRequests }: { bookingRequests: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [declinedRequests, setDeclinedRequests] = useState<any[]>([]);

  useEffect(() => {
    setPendingRequests(
      bookingRequests.filter((v) => v.status === "pending") ?? []
    );
    setApprovedRequests(
      bookingRequests.filter((v) => v.status === "approved") ?? []
    );
    setDeclinedRequests(
      bookingRequests.filter((v) => v.status === "declined") ?? []
    );
  }, [bookingRequests]);

  return (
    <Tabs defaultValue="all" className="mt-6 full">
      <TabsList className="justify-between items-center gap-2 bg-white">
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="all"
        >
          All Requests
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="approved"
        >
          Approved
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="pending"
        >
          Pending
        </TabsTrigger>

        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="declined"
        >
          Declined
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-6 p-4 rounded-md bg-[#F7F7F7]" value="all">
        <ScrollArea className="h-60">
          {bookingRequests.length > 0 ? (
            bookingRequests.map((v) => (
              <Card className="w-full" key={v._id}>
                <CardHeader className="flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="m-0">
                      <Badge className="text-sm rounded-full">
                        {v.hostID.username}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="">Chat</CardDescription>
                    <CardDescription className="">View profile</CardDescription>
                  </div>
                  <Badge
                    className="uppercase font-bold rounded-full"
                    variant={"outline"}
                  >
                    {v.status}
                  </Badge>
                </CardHeader>
                <Separator />
                <CardContent className="w-full flex justify-between py-4 px-6">
                  <div className="flex gap-2">
                    <div className="w-44 h-32 overflow-hidden rounded-md">
                      <img
                        src={v.listingID.listingPhotos[0].secure_url}
                        alt="Image"
                        className="object-cover w-full h-full hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-lg ">
                        {v.listingID.serviceDescription}
                      </span>
                      <span className="font-semibold text-sm ">
                        {v.listingID.serviceType}
                      </span>
                      <span className="font-medium text-sm text-gray-600">
                        Requested date:{" "}
                        {new Date(
                          v.requestedBookingDateStartsAt
                        ).toDateString()}{" "}
                        -{" "}
                        {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
                        (
                        {formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )}
                        )
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      {formatValue({
                        value: v.listingID.price.toString(),
                        intlConfig: {
                          locale: "ph-PH",
                          currency: "PHP",
                        },
                      })}{" "}
                      {/* x{" "}
                      {parseInt(
                        formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )
                      )} */}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="h-60 w-full flex flex-col items-center justify-center">
              <Lottie
                animationData={noRequest}
                loop={false}
                className="w-24 h-24"
              />{" "}
              <span className="text-gray-600 font-bold">No requests</span>
            </div>
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent className="mt-6 p-4 rounded-md bg-[#F7F7F7]" value="pending">
        <ScrollArea className="h-60">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((v) => (
              <Card className="w-full" key={v._id}>
                <CardHeader className="flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="m-0">
                      <Badge className="text-sm rounded-full">
                        {v.hostID.username}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="">Chat</CardDescription>
                    <CardDescription className="">View profile</CardDescription>
                  </div>
                  <Badge
                    className="uppercase rounded-full font-bold"
                    variant={"outline"}
                  >
                    {v.status}
                  </Badge>
                </CardHeader>
                <Separator />
                <CardContent className="w-full flex justify-between py-4 px-6">
                  <div className="flex gap-2">
                    <div className="w-44 h-32 overflow-hidden rounded-md">
                      <img
                        src={v.listingID.listingPhotos[0].secure_url}
                        alt="Image"
                        className="object-cover w-full h-full hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-lg ">
                        {v.listingID.serviceDescription}
                      </span>
                      <span className="font-semibold text-sm ">
                        {v.listingID.serviceType}
                      </span>
                      <span className="font-medium text-sm text-gray-600">
                        Requested date:{" "}
                        {new Date(
                          v.requestedBookingDateStartsAt
                        ).toDateString()}{" "}
                        -{" "}
                        {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
                        (
                        {formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )}
                        )
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      {formatValue({
                        value: v.listingID.price.toString(),
                        intlConfig: {
                          locale: "ph-PH",
                          currency: "PHP",
                        },
                      })}{" "}
                      x{" "}
                      {parseInt(
                        formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="h-60 w-full flex flex-col items-center justify-center">
              <Lottie
                animationData={noRequest}
                loop={false}
                className="w-24 h-24"
              />{" "}
              <span className="text-gray-600 font-bold">
                No pending requests
              </span>
            </div>
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent
        className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
        value="approved"
      >
        <ScrollArea className="h-60">
          {approvedRequests.length > 0 ? (
            approvedRequests.map((v) => (
              <Card className="w-full" key={v._id}>
                <CardHeader className="flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="m-0">
                      <Badge className="text-sm rounded-full">
                        {v.hostID.username}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="">Chat</CardDescription>
                    <CardDescription className="">View profile</CardDescription>
                  </div>
                  <Badge
                    className="uppercase font-bold rounded-full"
                    variant={"outline"}
                  >
                    {v.status}
                  </Badge>
                </CardHeader>
                <Separator />
                <CardContent className="w-full flex justify-between py-4 px-6">
                  <div className="flex gap-2">
                    <div className="w-44 h-32 overflow-hidden rounded-md">
                      <img
                        src={v.listingID.listingPhotos[0].secure_url}
                        alt="Image"
                        className="object-cover w-full h-full hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-lg ">
                        {v.listingID.serviceDescription}
                      </span>
                      <span className="font-semibold text-sm ">
                        {v.listingID.serviceType}
                      </span>
                      <span className="font-medium text-sm text-gray-600">
                        Requested date:{" "}
                        {new Date(
                          v.requestedBookingDateStartsAt
                        ).toDateString()}{" "}
                        -{" "}
                        {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
                        (
                        {formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )}
                        )
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      {formatValue({
                        value: v.listingID.price.toString(),
                        intlConfig: {
                          locale: "ph-PH",
                          currency: "PHP",
                        },
                      })}{" "}
                      x{" "}
                      {parseInt(
                        formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="h-60 w-full flex flex-col items-center justify-center">
              <Lottie
                animationData={noRequest}
                loop={false}
                className="w-24 h-24"
              />{" "}
              <span className="text-gray-600 font-bold">
                No approved requests
              </span>
            </div>
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent
        className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
        value="declined"
      >
        <ScrollArea className="h-60">
          {declinedRequests.length > 0 ? (
            declinedRequests.map((v) => (
              <Card className="w-full" key={v._id}>
                <CardHeader className="flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="m-0">
                      <Badge className="text-sm rounded-full">
                        {v.hostID.username}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="">Chat</CardDescription>
                    <CardDescription className="">View profile</CardDescription>
                  </div>
                  <Badge
                    className="uppercase rounded-full font-bold"
                    variant={"outline"}
                  >
                    {v.status}
                  </Badge>
                </CardHeader>
                <Separator />
                <CardContent className="w-full flex justify-between py-4 px-6">
                  <div className="flex gap-2">
                    <div className="w-44 h-32 overflow-hidden rounded-md">
                      <img
                        src={v.listingID.listingPhotos[0].secure_url}
                        alt="Image"
                        className="object-cover w-full h-full hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-lg ">
                        {v.listingID.serviceDescription}
                      </span>
                      <span className="font-semibold text-sm ">
                        {v.listingID.serviceType}
                      </span>
                      <span className="font-medium text-sm text-gray-600">
                        Requested date:{" "}
                        {new Date(
                          v.requestedBookingDateStartsAt
                        ).toDateString()}{" "}
                        -{" "}
                        {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
                        (
                        {formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )}
                        )
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      {formatValue({
                        value: v.listingID.price.toString(),
                        intlConfig: {
                          locale: "ph-PH",
                          currency: "PHP",
                        },
                      })}{" "}
                      x{" "}
                      {parseInt(
                        formatDistance(
                          new Date(v.requestedBookingDateStartsAt),
                          new Date(v.requestedBookingDateEndsAt)
                        )
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="h-60 w-full flex flex-col items-center justify-center">
              <Lottie
                animationData={noRequest}
                loop={false}
                className="w-24 h-24"
              />{" "}
              <span className="text-gray-600 font-bold">
                No declined requests
              </span>
            </div>
          )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}

export default BookingsTabs;
