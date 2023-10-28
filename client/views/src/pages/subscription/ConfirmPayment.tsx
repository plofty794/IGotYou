import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
import { UploadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type TOutletContext = {
  paymentProofPhoto: string[];
  setPaymentProofPhoto: React.Dispatch<React.SetStateAction<string[]>>;
};

function ConfirmPayment() {
  const [isFadingIn, setIsFadingIn] = useState(true);
  const { paymentProofPhoto, setPaymentProofPhoto } =
    useOutletContext<TOutletContext>();

  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dop5kqpod",
      uploadPreset: "s6lymwwh",
      folder: "IGotYou-Subscriptions",
      resourceType: "image",
      multiple: false,
      cropping: true,
    },
    (err, res) => console.log(res.info.thumbnail_url)
  );

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <>
      <div
        className={`${
          isFadingIn ? "opacity-0" : "opacity-100"
        } transition-opacity flex justify-center items-center gap-12 min-h-[80vh]`}
      >
        <div className="w-[650px] flex flex-col items-center justify-center gap-4 p-12 shadow-xl rounded-lg">
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
          <div className="p-8 w-max rounded-lg border-dashed border border-zinc-600">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-xs font-medium text-[#222222]">
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
          </div>
          <Button
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
