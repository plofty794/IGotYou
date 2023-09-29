import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible } from "@radix-ui/react-collapsible";
import { QueryState } from "@tanstack/react-query";
import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneNumberSelect from "../PhoneNumberSelect";

type TData = {
  email?: string;
  username?: string;
  hostStatus?: boolean;
  work?: string;
  address?: string;
  funFact?: string;
  school?: string;
  phoneNumber?: string;
};

type TCollapsibleData = {
  data: QueryState<TData, unknown> | undefined;
};

console.log(isValidPhoneNumber("09487892785"));

function CollapsiblePhoneNumber({ data }: TCollapsibleData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="flex justify-between">
        <div>
          <Label className="text-md" htmlFor="phone-number">
            Phone number
          </Label>
          <p id="phone-number" className={`text-xs ${isOpen ? "hidden" : ""}`}>
            {data?.data?.phoneNumber
              ? data?.data.phoneNumber
              : "Add a number so confirmed guests and IGotYou can get in touch."}
          </p>
        </div>
        <CollapsibleTrigger>
          <span className="underline font-medium text-sm">
            {isOpen ? "Cancel" : "Edit"}
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <span className="text-sm">
          Use a phone number you’ll always have access to.
        </span>
        <div className="mt-4 flex gap-2">
          <div className="w-full flex flex-col gap-2">
            <Input placeholder="Phone number" />
            <PhoneNumberSelect />
          </div>
        </div>
        <Button size={"sm"} className="mt-3 w-max font-semibold bg-[#222222]">
          Save
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapsiblePhoneNumber;
