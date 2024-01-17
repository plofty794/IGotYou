import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type TProps = {
  availableAt: string;
  endsAt: string;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
};

function DatePicker({ availableAt, endsAt, date, setDate }: TProps) {
  return (
    <Calendar
      className="mx-auto w-max p-0"
      initialFocus
      fromYear={2023}
      fromMonth={new Date()}
      disabled={{
        before: new Date(availableAt),
        after: new Date(endsAt),
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
