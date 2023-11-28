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
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { format, formatDistanceToNow } from "date-fns";
import { useContext, useMemo, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AllInbox({ notification }: { notification: any }) {
  const { toast } = useToast();
  const { socket } = useContext(SocketContextProvider);
  const [loading, setLoading] = useState(false);

  function updateNotification({
    notification,
    senderName,
    receiverName,
    status,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notification: any;
    senderName: string;
    receiverName: string;
    status: "accepted" | "declined";
  }) {
    socket?.emit("host-update-notification", {
      notification,
      senderName,
      receiverName,
      status,
    });
  }

  useMemo(() => {
    socket &&
      socket.on("res", (res) => {
        toast({
          title: "Nice!",
          description: "You have accepted the booking request.",
          className: "bg-white font-bold text-black",
        });
        console.log(res);
      });
  }, [socket, toast]);

  return (
    <Card className="px-4" key={notification._id}>
      <CardHeader className="w-full flex-row items-start justify-between">
        <div className="flex gap-4 ">
          <Avatar>
            <AvatarImage
              className="object-cover max-w-full w-10 h-10"
              src={notification.fromUserID.photoUrl}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="flex items-center gap font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              {notification.fromUserID.username}
            </CardTitle>
            <CardDescription className="font-semibold">
              sent{" "}
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </CardDescription>
          </div>
        </div>
        {!notification.read ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="#0866FF"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-[#0866FF] rounded-full"
          >
            <path
              d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-sm text-gray-600">
          Subject: {String(notification.notificationType).split("-").join(" ")}
        </h1>
        <CardDescription className="mt-4 font-semibold text-gray-600">
          Message: {notification.bookingRequest.message}
        </CardDescription>
        <CardFooter className="flex flex-col items-start gap-2 mt-2 p-0">
          <span className="text-sm font-semibold text-gray-600">
            {" "}
            Request: {notification.fromUserID.username} is requesting you to
            accept their booking on{" "}
            {format(
              new Date(
                notification.bookingRequest.requestedBookingDateStartsAt
              ),
              "PPPP"
            )}{" "}
            until{" "}
            {format(
              new Date(notification.bookingRequest.requestedBookingDateEndsAt),
              "PPPP"
            )}{" "}
            for this listing named{" "}
            <span className="text-green-600 underline underline-offset-2">
              "{notification.bookingRequest.listingID.serviceDescription}"
            </span>
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
                  Chat {notification.fromUserID.username}
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
                  updateNotification({
                    notification,
                    senderName: notification.receiverID.username,
                    receiverName: notification.senderID.username,
                    status: "accepted",
                  });
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
                updateNotification({
                  notification,
                  senderName: notification.receiverID.username,
                  receiverName: notification.senderID.username,
                  status: "declined",
                })
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
