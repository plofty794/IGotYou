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

type TData = {
  email?: string;
  username?: string;
  hostStatus?: boolean;
  work?: string;
  address?: string;
  funFact?: string;
  school?: string;
  email_verified: boolean;
  mobile_phone: string;
};

type TCollapsibleData = {
  data: QueryState<TData, unknown> | undefined;
};

function CollapsibleUsername({ data }: TCollapsibleData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="flex justify-between items-start">
        <div className="text-sm">
          <Label htmlFor="username">Username</Label>
          <p id="username" className={`mt-2 ${isOpen ? "hidden" : ""}`}>
            {data?.data?.username}
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
          This is the name on your IGotYou account.
        </span>
        <div className="mt-4 flex gap-2">
          <div className="w-full">
            <Input placeholder="Username" autoFocus />
          </div>
        </div>
        <Button size={"sm"} className="mt-3 w-max font-semibold bg-[#222222]">
          Save
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapsibleUsername;
