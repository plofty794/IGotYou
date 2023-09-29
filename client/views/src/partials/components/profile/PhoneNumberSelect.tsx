import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCountries, getPhoneCode } from "libphonenumber-js";

function PhoneNumberSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Country/Region" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-72 w-full">
          {getCountries().map((country) => (
            <SelectItem value={country}>
              {country} (+{getPhoneCode(country)})
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}

export default PhoneNumberSelect;
