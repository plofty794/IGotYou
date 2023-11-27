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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocketContextProvider } from "@/context/SocketContext";
import { format, formatDistanceToNow } from "date-fns";
import { useContext, useMemo, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AllInbox({ notification }: { notification: any }) {
  const { socket } = useContext(SocketContextProvider);
  const [loading, setLoading] = useState(false);

  function updateNotification(status: string, senderName: string) {
    socket?.emit("host-update-notification", { status, senderName });
  }

  useMemo(() => {
    socket && socket.on("res", (res) => console.log(res));
  }, [socket]);

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
            Request: {notification.senderID.username} is requesting you to
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"} className="rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                          />
                        </svg>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>Message</DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  Chat {notification.senderID.username}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              type="button"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  updateNotification(
                    "accepted",
                    notification.receiverID.username
                  );
                }, 1000);
              }}
              className={` bg-gray-950 rounded-full ${
                loading ? "opacity-70" : "opacity-100"
              }`}
            >
              Accept
            </Button>
            <Button
              type="button"
              onClick={() =>
                updateNotification("declined", notification.receiverID.username)
              }
              variant={"outline"}
              className=" rounded-full"
            >
              Decline
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default AllInbox;
