import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetNotifications from "@/hooks/useGetNotifications";
import { useEffect } from "react";
import AllInbox from "./inbox/AllInbox";
import BookingRequests from "./inbox/BookingRequests";
import { ScrollArea } from "@/components/ui/scroll-area";

function Inbox() {
  const { data, isPending } = useGetNotifications();

  useEffect(() => {
    document.title = "Host Inbox - IGotYou";
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex gap-4">
          <div className="flex justify-between w-1/4 bg-slate h-max">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center justify-center bg-white gap-4 p-7 rounded-full border text-black hover:bg-white hover:shadow-lg">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Compose
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Message</DialogTitle>
              </DialogContent>
            </Dialog>
          </div>
          <Tabs
            defaultValue="account"
            onValueChange={(value) => console.log(value)}
            className="bg-[#F5F5F5] rounded-md p-1 shadow-lg border"
          >
            <TabsList className="bg-white mb-1">
              <TabsTrigger
                className="flex items-center justify-center gap-4 text-sm px-6 font-bold"
                value="account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                  />
                </svg>
                <span>Inbox ({data?.data.notifications.length})</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center justify-center gap-4 text-sm px-6 font-bold"
                value="password"
              >
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                Booking requests (
                {
                  data?.data.notifications.map(
                    (v: { notificationType: string }) =>
                      v.notificationType === "Booking-Request"
                  ).length
                }
                )
              </TabsTrigger>
            </TabsList>
            {isPending ? (
              <span>Loading...</span>
            ) : (
              <>
                <div className="flex">
                  <ScrollArea className="h-[70vh]">
                    <TabsContent
                      className="grid grid-cols-1 grid-rows-2 gap-1"
                      value="account"
                    >
                      {data?.data.notifications.map((notification: unknown) => (
                        <AllInbox
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          key={notification._id}
                          notification={notification}
                        />
                      ))}
                    </TabsContent>
                  </ScrollArea>
                  <ScrollArea className="h-[70vh]">
                    <TabsContent
                      className="grid grid-cols-1 grid-rows-2 gap-1"
                      value="password"
                    >
                      {data?.data.notifications.map(
                        (notification: { notificationType: string }) =>
                          notification.notificationType ===
                            "Booking-Request" && (
                            <BookingRequests
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              key={notification._id}
                              notification={notification}
                            />
                          )
                      )}
                    </TabsContent>
                  </ScrollArea>
                </div>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Inbox;
