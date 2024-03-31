import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { compareAsc, format, parseISO } from "date-fns";
import pickADate from "../../assets/pick-a-date.json";
import Lottie from "lottie-react";
import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/firebase config/config";
import { AxiosResponse } from "axios";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { useMediaQuery } from "usehooks-ts";

type TSetServiceProps = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ListingDate() {
  const matches = useMediaQuery("(max-width: 768px)");
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<AxiosResponse>([
    "profile",
    auth.currentUser && auth.currentUser.uid,
  ]);
  const { setService } = useOutletContext<TSetServiceProps>();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isFadingIn, setIsFadingIn] = useState(true);

  useMemo(() => {
    setService((prev) => ({
      ...prev,
      date: { from: date?.from, to: date?.to },
    }));
  }, [date, setService]);

  useEffect(() => {
    document.title = "Listing Price - IGotYou";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <div
      className={`w-full transition-opacity ${
        isFadingIn ? "opacity-0" : "opacity-100"
      }`}
    >
      <section className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <Lottie
          loop={false}
          animationData={pickADate}
          className="h-52 w-52 max-md:h-40 max-md:w-40"
        />
        <span className="w-3/4 text-center text-5xl font-bold max-lg:text-3xl max-md:text-xl max-sm:text-lg">
          It's time to set the availability dates for your fantastic listing.
        </span>
        <span className="text-center text-lg font-semibold text-gray-600 max-md:text-sm">
          Choose the start and end dates for when your listing will be
          available.
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className="w-[260px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {compareAsc(date.from, date.to) === 0 ? (
                      <span className="font-medium text-red-600">
                        Invalid dates!
                      </span>
                    ) : (
                      `${format(date.from, "LLL dd y")} - ${format(
                        date.to,
                        "LLL dd y",
                      )}`
                    )}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            {matches ? (
              <Calendar
                initialFocus
                mode="range"
                disabled={{
                  before: new Date(),
                  after: parseISO(userData?.data.user.subscriptionExpiresAt),
                }}
                modifiersStyles={{
                  range_start: {
                    color: "white",
                  },
                  selected: {
                    backgroundColor: "#222222",
                  },
                  range_middle: {
                    backgroundColor: "gainsboro",
                  },
                }}
                fromYear={new Date().getFullYear()}
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            ) : (
              <Calendar
                initialFocus
                mode="range"
                disabled={{
                  before: new Date(),
                  after: parseISO(userData?.data.user.subscriptionExpiresAt),
                }}
                modifiersStyles={{
                  range_start: {
                    color: "white",
                  },
                  selected: {
                    backgroundColor: "#222222",
                  },
                  range_middle: {
                    backgroundColor: "gainsboro",
                  },
                }}
                fromYear={new Date().getFullYear()}
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            )}
          </PopoverContent>
        </Popover>
      </section>
    </div>
  );
}

export default ListingDate;
