import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { format, formatDistanceToNow } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BookingRequests({ notification }: { notification: any }) {
  return (
    <Card key={notification._id}>
      <CardHeader className="flex-row gap-4">
        <Avatar>
          <AvatarImage
            className="object-cover max-w-full w-10 h-10"
            src={notification.senderID.photoUrl}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="font-bold">
            {notification.senderID.username}
          </CardTitle>
          <CardDescription className="font-semibold">
            sent{" "}
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-sm text-gray-600">
          Subject: {String(notification.notificationType).split("-").join(" ")}
        </h1>
        <CardDescription className="mt-4 font-semibold">
          Message: {notification.content.message}
        </CardDescription>
        <CardFooter className="flex flex-col items-start gap-2 mt-2 p-0">
          <span className="text-sm font-semibold text-gray-600">
            {" "}
            Request: {notification.senderID.username} is requesting to you
            accept their booking on{" "}
            {format(
              new Date(notification.content.requestedBookingDateStartsAt),
              "PPPP"
            )}{" "}
            until{" "}
            {format(
              new Date(notification.content.requestedBookingDateEndsAt),
              "PPPP"
            )}{" "}
          </span>

          <div className="flex gap-2 ml-auto">
            <Button variant={"default"} className=" bg-gray-950 rounded-full">
              Accept
            </Button>
            <Button variant={"outline"} className=" rounded-full">
              Decline
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default BookingRequests;
