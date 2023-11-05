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

type TUserData = {
  user: {
    email?: string;
    username?: string;
    hostStatus?: string;
    work?: string;
    address?: string;
    funFact?: string;
    school?: string;
    emailVerified: boolean;
    mobilePhone: string;
    mobileVerified: boolean;
  };
};

type TCollapsibleData = {
  data: QueryState<TUserData, unknown> | undefined;
};

function CollapsibleEmail({ data }: TCollapsibleData) {
  const [isOpen, setIsOpen] = useState(false);
  const hiddenEmail =
    data?.data?.user.email &&
    data?.data?.user.email.replace(/^(\w)+/, `${data.data.user.email[0]}***`);

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="flex justify-between items-start">
        <div className="text-sm">
          <Label htmlFor="email">Email</Label>
          <p id="email" className={`text-sm mt-2 ${isOpen ? "hidden" : ""}`}>
            {hiddenEmail}
          </p>
        </div>
        <CollapsibleTrigger>
          <span className="underline font-medium text-sm">
            {isOpen ? "Cancel" : "Edit"}
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <span className="text-xs">
          Use an email address you’ll always have access to.
        </span>
        <div className="mt-4 flex gap-2">
          <div className="w-full">
            <Input placeholder="Email address" />
          </div>
        </div>
        <Button className="text-xs mt-3 w-max font-semibold bg-[#222222] rounded-full">
          Save
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapsibleEmail;
