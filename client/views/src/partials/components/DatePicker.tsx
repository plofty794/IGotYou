import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type TProps = {
  subscriptionExpiresAt: string;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
};

function DatePicker({ subscriptionExpiresAt, date, setDate }: TProps) {
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
