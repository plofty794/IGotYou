import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SubscriptionWelcome() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <div
      className={`${
        isFadingIn ? "opacity-0" : "opacity-100"
      } transition-opacity w-full flex lg:flex-row max-md:flex-col items-center justify-evenly gap-8 p-12`}
    >
      <div className="w-full text-center text-5xl font-semibold text-[#222222]">
        <h1>Welcome to IGotYou Subscription</h1>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-max mx-auto">
          <Label>
            To pay online, please consider every steps on the payment process.
          </Label>
        </div>
        <Accordion type="multiple" className="w-full flex flex-col">
          <AccordionItem value="item-2">
            <AccordionTrigger>Step 1 - Subscription Payment</AccordionTrigger>
            <AccordionContent>
              The amount of your subscription will be shown. Proceed to step 2.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Step 2 - Send your payment through our GCash account.
            </AccordionTrigger>
            <AccordionContent>
              Our GCash number will be shown. You can send your payment through
              Express Send or through scanning our QR code.
              <div className="mt-4 text-end">
                <Link
                  className="text-xs hover:underline underline-offset-2"
                  to={"https://www.gcash.com/"}
                  target="_blank"
                >
                  What is GCash?
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Step 3 - Complete your subscription
            </AccordionTrigger>
            <AccordionContent>
              Once your payment is confirmed, your subscription will be
              processed (2-4 minutes). You will receive a confirmation email
              with your subscription details.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SubscriptionWelcome;
