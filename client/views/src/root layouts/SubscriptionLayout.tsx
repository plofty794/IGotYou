import useMultistepForm from "@/hooks/useMultistepForm";
import { FormEvent, Suspense, lazy, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DotPulse } from "@uiball/loaders";
import { CheckIcon } from "@radix-ui/react-icons";
import useSubscription from "@/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const Pending = lazy(() => import("@/pages/subscription/Pending"));

type TPaymentProofPhoto = {
  public_id?: string;
  secure_url?: string;
};

function SubscriptionLayout() {
  const queryClient = useQueryClient();
  const { mutate, status } = useSubscription();
  const { id } = useParams();
  const data = queryClient.getQueryData<AxiosResponse>(["profile", id]);
  const [paymentProofPhoto, setPaymentProofPhoto] = useState<
    TPaymentProofPhoto[]
  >([
    {
      public_id: "",
      secure_url: "",
    },
  ]);
  const {
    step,
    isFirstPage,
    isLastPage,
    isFetching,
    next,
    previous,
    currentStepIndex,
  } = useMultistepForm([
    "welcome",
    "send-payment",
    "confirm-payment",
    "payment-success",
  ]);

  console.log(data?.data.user.subscriptionStatus);

  useEffect(() => {
    document.title = "IGotYou - Subscription";
  }, []);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ subscriptionStatus: "pending" });
  }

  return (
    <>
      {status === "success" && <Navigate to={`/users/show/${id}`} replace />}
      {<Navigate to={`/subscription/${id}/${step}`} replace />}
      {data?.data.user.subscriptionStatus === "pending" ? (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Pending user={data.data.user} />
        </Suspense>
      ) : (
        <section className="relative min-h-screen">
          <form
            className="absolute bottom-0 w-full"
            onSubmit={handleFormSubmit}
          >
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
              {!isFirstPage && currentStepIndex != 2 && !isLastPage && (
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
                    {isFetching ? (
                      <DotPulse size={35} color="#FFF" />
                    ) : (
                      "Proceed"
                    )}
                  </Button>
                </>
              )}
              {currentStepIndex === 2 && (
                <>
                  <Button
                    variant={"link"}
                    type="button"
                    onClick={() => previous()}
                    className="p-6 font-medium text-sm w-max"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!paymentProofPhoto[0].public_id}
                    type="button"
                    onClick={() => next()}
                    className="rounded-full p-6 font-medium text-lg w-max bg-[#222222] text-white"
                  >
                    {isFetching ? (
                      <DotPulse size={35} color="#FFF" />
                    ) : (
                      <CheckIcon className="w-[25px] h-[25px]" />
                    )}
                  </Button>
                </>
              )}
              {isLastPage && (
                <>
                  <Button
                    variant={"link"}
                    type="button"
                    onClick={() => previous()}
                    className="p-6 font-medium text-sm w-max"
                  >
                    Cancel
                  </Button>
                  <Button className="rounded-full p-6 font-medium text-lg w-max bg-[#222222] text-white">
                    Done
                  </Button>
                </>
              )}
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default SubscriptionLayout;
