import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useDeclineBookingRequest from "@/hooks/useDeclineBookingRequest";
import { useState } from "react";

const REASONS = [
  "unverified identity",
  "maintenance/upkeep",
  "mismatched expectations",
  "safety concerns",
  "no reviews",
  "negative reviews",
];

function DeclineReasons({
  bookingRequestID,
  isExpired,
  isCancelled,
}: {
  isExpired: boolean;
  isCancelled?: boolean;
  bookingRequestID: string;
}) {
  const [declineReason, setDeclineReason] = useState("");
  const { mutate } = useDeclineBookingRequest();

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setDeclineReason("")}>
      <DialogTrigger disabled={isExpired || isCancelled} asChild>
        <Button className="rounded-full" variant={"destructive"}>
          Decline
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-4">
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl font-bold">
            Why are you declining this request?
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-64 pr-6">
          <RadioGroup onValueChange={(v) => setDeclineReason(v)}>
            {REASONS.map((reason, index) => (
              <>
                <div
                  key={index}
                  className="flex h-max w-full items-center justify-between py-2"
                >
                  <Label
                    htmlFor={reason}
                    className="text-base font-semibold capitalize"
                  >
                    {reason}
                  </Label>
                  <RadioGroupItem
                    className="h-5 w-5"
                    value={reason}
                    id={reason}
                  />
                </div>
                <Separator />
              </>
            ))}
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <Button
            disabled={!declineReason}
            onClick={() =>
              mutate({ bookingRequestID, hostDeclineReasons: declineReason })
            }
            className="rounded-full bg-gray-950"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeclineReasons;
