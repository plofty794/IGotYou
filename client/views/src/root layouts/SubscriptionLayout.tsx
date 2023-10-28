import useMultistepForm from "@/hooks/useMultistepForm";
import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DotPulse } from "@uiball/loaders";
import { CheckIcon } from "@radix-ui/react-icons";

function SubscriptionLayout() {
  const { id } = useParams();
  const [paymentProofPhoto, setPaymentProofPhoto] = useState<string[]>([]);
  const {
    step,
    isFirstPage,
    isLastPage,
    isFetching,
    next,
    previous,
    currentStepIndex,
  } = useMultistepForm(["welcome", "send-payment", "confirm-payment"]);

  useEffect(() => {
    document.title = "IGotYou - Subscription";
  }, []);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      {<Navigate to={`/subscription/${id}/${step}`} replace />}
      <section className="relative min-h-screen">
        <form className="absolute bottom-0 w-full" onSubmit={handleFormSubmit}>
          {<Outlet context={{ paymentProofPhoto, setPaymentProofPhoto }} />}
          <div className="border-t-2 flex justify-between gap-4 p-8">
            {isFirstPage && (
              <>
                {" "}
                <Link to={"/"} replace>
                  <Button
                    type="button"
                    className="rounded-full p-6 font-medium text-lg w-max bg-[#222222] text-white"
                  >
                    Go back
                  </Button>
                </Link>
                <Button
                  type="button"
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-[#222222] text-white"
                >
                  {isFetching ? (
                    <DotPulse size={35} color="#FFF" />
                  ) : (
                    "Get started"
                  )}
                </Button>
              </>
            )}{" "}
            {currentStepIndex != 2 && !isFirstPage && (
              <>
                {" "}
                <Button
                  variant={"link"}
                  type="button"
                  onClick={() => previous()}
                  className="p-6 font-medium text-sm w-max"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-[#222222] text-white"
                >
                  {isFetching ? <DotPulse size={35} color="#FFF" /> : "Proceed"}
                </Button>
              </>
            )}
            {isLastPage && (
              <>
                {" "}
                <Button
                  variant={"link"}
                  type="button"
                  onClick={() => previous()}
                  className="p-6 font-medium text-sm w-max"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-[#222222] text-white"
                >
                  {isFetching ? (
                    <DotPulse size={30} color="#FFF" />
                  ) : (
                    <CheckIcon className="w-[25px] h-[25px]" />
                  )}
                </Button>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default SubscriptionLayout;
