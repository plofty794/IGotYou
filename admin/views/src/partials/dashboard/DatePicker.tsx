import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

function DatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const search = useSearchParams();

  return (
    <div className="grid gap-2">
      <Popover>
        <div className="flex items-center justify-center gap-1">
          <PopoverTrigger asChild>
            <Button
              type="button"
              id="date"
              variant={"outline"}
              className={`w-[260px] justify-start text-left font-normal `}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span className="font-normal text-gray-500">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <Button
            onClick={() => {
              const params = createSearchParams([
                ["dateFrom", date!.from!.toDateString()],
                ["dateTo", date!.to!.toDateString()],
              ]);
              search[1](params);
              setTimeout(() => document.location.reload(), 200);
            }}
            type="button"
            disabled={!date?.from && !date?.to}
            className="bg-gray-950"
          >
            Set date
          </Button>
          <Button
            onClick={() => {
              search[1]("");
              setTimeout(() => document.location.reload(), 200);
            }}
            type="button"
            disabled={!location.search}
            className="bg-gray-950"
          >
            Clear
          </Button>
        </div>

        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            fromYear={2023}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
