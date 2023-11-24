import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays } from "date-fns";

type TProps = {
  subscriptionExpiresAt: string;
};

function DatePicker({ subscriptionExpiresAt }: TProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(Date.now(), 2),
  });

  console.log(date);

  return (
    <Calendar
      className="w-max mx-auto p-0"
      initialFocus
      fromYear={2023}
      fromMonth={new Date()}
      disabled={{
        before: new Date(),
        after: new Date(subscriptionExpiresAt),
      }}
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
    />
  );
}

export default DatePicker;
