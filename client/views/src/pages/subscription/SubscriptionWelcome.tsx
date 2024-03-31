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
      } flex w-full items-center justify-evenly gap-8 px-12 transition-opacity max-md:flex-col lg:flex-row`}
    >
      <div className="w-full text-center text-5xl font-semibold max-lg:text-3xl max-md:text-xl">
        <h1>Welcome to IGotYou Subscription</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Label className="text-lg font-semibold max-lg:text-base max-md:text-sm">
          To pay online, please consider every steps on the payment process.
        </Label>
        <Accordion type="single" collapsible className="flex w-full flex-col">
          <AccordionItem value="item-1">
            <AccordionTrigger className="max-md:text-xs">
              Step 1 - Subscription Payment
            </AccordionTrigger>
            <AccordionContent className="max-md:text-xs">
              You will be prompted how much our monthly subscription costs. You
              can go back if you don't want to continue.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="max-md:text-xs">
              Step 2 - Send your payment through our GCash account.
            </AccordionTrigger>
            <AccordionContent className="max-md:text-xs">
              Our GCash number will be shown. You can send your payment through
              Express Send or through scanning our QR code.
              <div className="mt-4 font-medium text-[#5551FF] max-md:text-xs">
                <Link
                  className="text-xs underline-offset-2 hover:underline"
                  to={"https://www.gcash.com/"}
                  target="_blank"
                >
                  What is GCash?
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="max-md:text-xs">
              Step 3 - Confirm your payment
            </AccordionTrigger>
            <AccordionContent className="max-md:text-xs">
              Once you've sent your payment you'll need to upload a screenshot
              of your payment transaction for checking. This process will ensure
              that you've sent the right amount and also verifies if the Ref no.
              transaction has been made by you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="max-md:text-xs">
              Step 4 - Complete your subscription
            </AccordionTrigger>
            <AccordionContent className="max-md:text-xs">
              Once your payment is confirmed, your subscription will be
              processed (5-10 minutes). You will receive a confirmation email
              with your subscription details.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SubscriptionWelcome;
