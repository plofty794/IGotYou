import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
import { CrossCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import useRemoveAsset from "@/hooks/useRemoveAsset";

type TPaymentProofPhoto = {
  public_id?: string;
  secure_url?: string;
};

type TOutletContext = {
  paymentProofPhoto: TPaymentProofPhoto[];
  setPaymentProofPhoto: React.Dispatch<
    React.SetStateAction<TPaymentProofPhoto[]>
  >;
};

function ConfirmPayment() {
  const [isFadingIn, setIsFadingIn] = useState(true);
  const { mutate } = useRemoveAsset();
  const { paymentProofPhoto, setPaymentProofPhoto } =
    useOutletContext<TOutletContext>();

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dop5kqpod",
      uploadPreset: "s6lymwwh",
      folder: "IGotYou-Subscriptions",
      resourceType: "image",
      multiple: false,
      cropping: false,
    },
    (_, res) => {
      if (res.event === "success") {
        setPaymentProofPhoto([
          {
            public_id: res.info.public_id,
            secure_url: res.info.secure_url,
          },
        ]);
      }
    }
  );

  return (
    <>
      <div
        className={`${
          isFadingIn ? "opacity-0" : "opacity-100"
        } transition-opacity flex justify-center items-center gap-12 h-full pb-12`}
      >
        <div className="w-[650px] flex flex-col items-center justify-center gap-4 p-8 shadow-xl rounded-xl">
          <div className="text-center flex flex-col gap-4 p-2">
            <h1 className="text-3xl font-semibold text-[#222222]">
              Confirm your payment
            </h1>
            <p className="text-sm font-medium text-zinc-500">
              Take a screenshot or download the photo of the proof of payment
              from GCash containing the amount and the Ref no. and upload it
              here.
            </p>
          </div>
          <div className="overflow-hidden w-3/4 rounded-lg border-dashed border border-zinc-600">
            {paymentProofPhoto[0].secure_url ? (
              <div className="relative bg-[#222222d6]">
                <CrossCircledIcon
                  onClick={() => {
                    mutate({
                      publicId: paymentProofPhoto[0].public_id,
                    });
                    setPaymentProofPhoto([{ public_id: "", secure_url: "" }]);
                  }}
                  className="absolute right-0 w-[25px] h-[25px] text-zinc-300 hover:text-zinc-100 m-1 cursor-pointer"
                />
                <img
                  src={paymentProofPhoto[0].secure_url}
                  className="w-full h-[150px] object-contain max-h-full max-w-full block"
                  alt="proof_of_payment"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center gap-2">
                <span className="text-center text-xs font-medium text-[#222222]">
                  Your photo will be shown here
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
            )}
          </div>
          <Button
            disabled={!!paymentProofPhoto[0].public_id}
            type="button"
            onClick={() => cloudinaryWidget.open()}
            className="bg-[#222222] text-white rounded-full font-medium flex gap-2"
            size={"lg"}
          >
            Upload <UploadIcon />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ConfirmPayment;