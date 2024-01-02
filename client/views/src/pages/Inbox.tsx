import { Input } from "@/components/ui/input";
import BookingRequestsFilter from "./inbox/BookingRequestsFilter";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import useGetHostBookingRequests from "@/hooks/useGetHostBookingRequests";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function Inbox() {
  const { id } = useParams();
  const { data } = useGetHostBookingRequests();

  useEffect(() => {
    document.title = "Host Inbox - IGotYou";
  }, []);

  return (
    <section className="flex gap-4 p-4">
      <div className="flex flex-col gap-2 w-1/3">
        <h1 className="font-bold text-2xl"> Booking requests</h1>
        <div className="flex items-center justify-between gap-2 w-full">
          <Input
            placeholder="Search guest name..."
            className="w-full font-medium"
          />
          <BookingRequestsFilter />
        </div>
        <ScrollArea className="mt-2 h-[420px]">
          <div className="flex flex-col gap-4 w-full">
            {data?.pages.flatMap((page) =>
              page.data.bookingRequests.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (v: any) => (
                  <NavLink
                    key={v._id}
                    to={`/hosting-inbox/booking-request/${v._id}`}
                    className="font-bold text-gray-600 shadow-md rounded-md border"
                  >
                    <div className="flex gap-2 py-2 px-4">
                      <Avatar>
                        <AvatarImage
                          className="object-cover"
                          src={v.guestID.photoUrl}
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs">{v.guestID.username}</span>
                          <span className="text-xs text-gray-600">
                            {formatDistanceToNow(new Date(v.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <span className="text-xs max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {v.message}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                )
              )
            )}
          </div>
        </ScrollArea>
        <Separator />
      </div>
      <div className="w-full">
        {id ? (
          <Outlet />
        ) : (
          <div className="min-h-[70vh] flex flex-col items-center justify-center w-full p-8">
            <h1 className="text-2xl font-bold">
              This is your Booking Requests page.
            </h1>
            <p className="text-lg font-medium text-gray-600">
              Select a booking request to be shown here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Inbox;
