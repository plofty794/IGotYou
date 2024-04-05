import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import BookingRequestDatesCalendar from "@/partials/components/inbox filters/BookingRequestDatesCalendar";
import BookingRequestStatusSelect from "@/partials/components/inbox filters/BookingRequestStatusSelect";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { createSearchParams, useSearchParams } from "react-router-dom";

function BookingRequestsFilter() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 10),
  });
  const [bookingRequestStatus, setBookingRequestStatus] = useState("");
  const search = useSearchParams();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`rounded-full p-2 max-lg:w-full ${
            localStorage.getItem("hasHostBookingRequestFilter")
              ? "relative animate-bounce outline outline-2"
              : ""
          }`}
          variant={"outline"}
        >
          {localStorage.getItem("hasHostBookingRequestFilter") && (
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          )}
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Filters</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-8 px-0">
          <h2 className="text-xl font-semibold">Type of booking request</h2>
          <BookingRequestStatusSelect
            setBookingRequestStatus={setBookingRequestStatus}
          />
          <Separator />
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-xl font-semibold">Date range</h2>
            <p className="text-sm font-medium">Booking request dates</p>
            <BookingRequestDatesCalendar date={date} setDate={setDate} />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <Button
            disabled={
              localStorage.getItem("hasHostBookingRequestFilter") == null
            }
            variant={"outline"}
            onClick={() => {
              setDate({
                from: undefined,
                to: undefined,
              });
              setTimeout(() => document.location.reload(), 200);
              setBookingRequestStatus("");
              search[1]("");
              localStorage.removeItem("hasHostBookingRequestFilter");
            }}
          >
            Clear all
          </Button>
          <Button
            disabled={!bookingRequestStatus || !date?.from || !date.to}
            onClick={() => {
              const searchParams = createSearchParams([
                ["status", bookingRequestStatus],
                ["dateFrom", date!.from!.toDateString()],
                ["dateTo", date!.to!.toDateString()],
              ]);
              setTimeout(() => document.location.reload(), 200);
              search[1](searchParams.toString());
              localStorage.setItem("hasHostBookingRequestFilter", "true");
            }}
            className="bg-gray-950"
          >
            Save filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookingRequestsFilter;
