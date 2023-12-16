import useMultistepForm from "@/hooks/useMultistepForm";
import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import useSendSubscriptionPhotos from "@/hooks/useSendSubscriptionPhotos";
import { dotPulse } from "ldrs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
dotPulse.register();

type TPaymentProofPhoto = {
  public_id: string;
  secure_url: string;
};

type TGovernmentID = {
  public_id: string;
  secure_url: string;
};

export type TSubscriptionPhotos = {
  payment_proof: TPaymentProofPhoto;
  government_id: TGovernmentID;
};

function SubscriptionLayout() {
  const [isAgreed, setIsAgreed] = useState(
    sessionStorage.getItem("agreed") === "true" ? true : false
  );
  const { mutate, status } = useSendSubscriptionPhotos();
  const { id } = useParams();
  const [subscriptionPhotos, setSubscriptionPhotos] =
    useState<TSubscriptionPhotos>({
      government_id: { public_id: "", secure_url: "" },
      payment_proof: { public_id: "", secure_url: "" },
    });
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
    "identity-verification",
    "send-payment",
    "confirm-payment",
    "payment-success",
  ]);

  useEffect(() => {
    document.title = "IGotYou - Subscription";
  }, []);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      Object.values(subscriptionPhotos.government_id).length < 0 &&
      Object.values(subscriptionPhotos.payment_proof).length < 0
    )
      return;
    mutate({
      ...subscriptionPhotos,
    });
  }

  console.log(status);

  return (
    <>
      {status === "success" && <Navigate to={`/users/show/${id}`} replace />}
      {<Navigate to={`/subscription/${id}/${step}`} replace />}
      <section className="relative min-h-screen">
        <form className="absolute bottom-0 w-full" onSubmit={handleFormSubmit}>
          {<Outlet context={{ subscriptionPhotos, setSubscriptionPhotos }} />}
          <div className="border-t-2 flex justify-between gap-4 p-8">
            {isFirstPage && (
              <>
                {" "}
                <Link to={"/"} replace>
                  <Button
                    type="button"
                    className="rounded-full p-6 font-medium text-lg w-max bg-gray-950"
                  >
                    Go back
                  </Button>
                </Link>
                {!isAgreed && (
                  <Dialog defaultOpen={!isAgreed}>
                    <DialogTrigger asChild>
                      <Button variant={"link"} type="button">
                        <span className="text-xs font-bold">
                          View Terms and Agreements for Subscription
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0">
                      <DialogHeader className="p-4">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="blue"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                          <DialogTitle className="font-semibold">
                            Terms and Agreements for Subscription
                          </DialogTitle>
                        </div>
                      </DialogHeader>
                      <Separator />
                      <DialogFooter>
                        <ScrollArea className="h-72">
                          <div className="px-6 py-4">
                            <div className="flex flex-col justify-between gap-2">
                              <div className="text-sm flex flex-col gap-2">
                                <span className="font-bold">
                                  1. Acceptance of Terms
                                </span>
                                <span>
                                  By subscribing to IGotYou, you agree to the
                                  terms and conditions outlined in this
                                  document. These terms govern your use of our
                                  services and the collection of personal
                                  information.
                                </span>
                              </div>
                              <div className="text-sm flex flex-col gap-2">
                                <span className="font-bold">
                                  2. Collection of Information
                                </span>
                                <span>
                                  In the process of subscribing to our services,
                                  you may be required to provide personal
                                  information, including but not limited to
                                  government-issued identification. You hereby
                                  consent to the collection and use of this
                                  information for the purposes outlined in this
                                  agreement.
                                </span>
                              </div>
                              <div className="text-sm flex flex-col gap-2">
                                <span className="font-bold">
                                  3. Use of Information
                                </span>
                                <span>
                                  We will use the collected information for the
                                  purpose of identity verification, subscription
                                  processing, etc.. Your information will be
                                  treated with the utmost confidentiality and
                                  will not be shared with third parties unless
                                  required by law.
                                </span>
                              </div>
                              <div className="text-sm flex flex-col gap-2">
                                <span className="font-bold">
                                  4. Security Measures
                                </span>
                                <span>
                                  We employ reasonable security measures to
                                  protect your personal information from
                                  unauthorized access, disclosure, alteration,
                                  and destruction. However, no method of
                                  transmission over the internet or electronic
                                  storage is completely secure, and we cannot
                                  guarantee absolute security.
                                </span>
                              </div>
                              <span className="mt-4 text-sm">
                                By subscribing to our services, you acknowledge
                                that you have read, understood, and agreed to
                                these terms and conditions.
                              </span>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogFooter>
                      <Separator />
                      <div className="m-2 p-2 flex items-center justify-center gap-2 w-max ml-auto">
                        <Button
                          onClick={() => {
                            setIsAgreed(true);
                            sessionStorage.setItem("agreed", "true");
                          }}
                          className="rounded-full font-medium w-max bg-gray-950"
                        >
                          Agree
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button
                  type="button"
                  disabled={
                    sessionStorage.getItem("agreed") == null ||
                    sessionStorage.getItem("agreed") === "false"
                  }
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-gray-950"
                >
                  {isFetching ? (
                    // Default values shown
                    <l-dot-pulse
                      size="43"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    "Get started"
                  )}
                </Button>
              </>
            )}{" "}
            {currentStepIndex === 1 && (
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
                  disabled={!subscriptionPhotos.government_id.secure_url}
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-gray-950"
                >
                  {isFetching ? (
                    // Default values shown
                    <l-dot-pulse
                      size="43"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
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
                  type="button"
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-gray-950"
                >
                  {isFetching ? (
                    // Default values shown
                    <l-dot-pulse
                      size="43"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    <CheckIcon className="w-[25px] h-[25px]" />
                  )}
                </Button>
              </>
            )}
            {currentStepIndex === 3 && (
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
                  disabled={
                    !Object.values(subscriptionPhotos.payment_proof.public_id)
                      .length
                  }
                  type="button"
                  onClick={() => next()}
                  className="rounded-full p-6 font-medium text-lg w-max bg-gray-950"
                >
                  {isFetching ? (
                    // Default values shown
                    <l-dot-pulse
                      size="43"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    "Proceed"
                  )}
                </Button>
              </>
            )}
            {isLastPage && (
              <>
                <Button className="rounded-full p-6 font-medium text-lg w-max bg-gray-950 ">
                  Done
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
