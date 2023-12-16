import { Button } from "@/components/ui/button";
import useRemoveAsset from "@/hooks/useRemoveAsset";
import { TSubscriptionPhotos } from "@/root layouts/SubscriptionLayout";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export type TStateSubscriptionPhotos = {
  subscriptionPhotos: TSubscriptionPhotos;
  setSubscriptionPhotos: Dispatch<React.SetStateAction<TSubscriptionPhotos>>;
};

function IdentityVerification() {
  const [isFadingIn, setIsFadingIn] = useState(true);
  const { mutate } = useRemoveAsset();
  const { subscriptionPhotos, setSubscriptionPhotos } =
    useOutletContext<TStateSubscriptionPhotos>();

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dop5kqpod",
      uploadPreset: "s6lymwwh",
      folder: "IGotYou-GovernmentID",
      resourceType: "image",
      multiple: false,
      cropping: false,
    },
    (_, res) => {
      if (res.event === "success") {
        setSubscriptionPhotos({
          government_id: {
            public_id: res.info.public_id,
            secure_url: res.info.secure_url,
          },
          payment_proof: { public_id: "", secure_url: "" },
        });
      }
    }
  );

  return (
    <>
      <div
        className={`${
          isFadingIn ? "opacity-0" : "opacity-100"
        } transition-opacity flex justify-center items-center gap-12 h-full`}
      >
        <div className="w-2/4 flex flex-col items-center justify-center gap-2 p-8">
          <div className="text-center flex flex-col gap-4 p-2">
            <h1 className="text-4xl font-semibold ">Identity Verification</h1>
            <p className="text-lg font-semibold text-gray-600">
              Upload a scanned copy or clear photo of your government-issued ID
              through a secure document upload interface.{" "}
              <span className="text-sm mt-1 block font-bold text-amber-600">
                Note: Make sure that the credentials in the photo is not blurry.
              </span>
            </p>
          </div>
          <div className="overflow-hidden w-3/4 rounded-lg border-dashed border border-zinc-600">
            {subscriptionPhotos.government_id.secure_url ? (
              <div className="relative bg-[#222222d6]">
                <CrossCircledIcon
                  onClick={() => {
                    mutate({
                      publicId: subscriptionPhotos.government_id.public_id,
                    });
                    setSubscriptionPhotos({
                      government_id: { public_id: "", secure_url: "" },
                      payment_proof: { public_id: "", secure_url: "" },
                    });
                  }}
                  className="absolute right-0 w-[25px] h-[25px] text-zinc-300 hover:text-zinc-100 m-1 cursor-pointer"
                />
                <img
                  src={subscriptionPhotos.government_id.secure_url}
                  className="mx-auto h-48 object-cover max-w-full hover:scale-110 transition-transform"
                  alt="proof_of_payment"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center gap-2">
                <span className="text-center text-sm font-semibold text-gray-600">
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
            disabled={!!subscriptionPhotos.government_id.public_id}
            type="button"
            onClick={() => cloudinaryWidget.open()}
            className="bg-gray-950 rounded-full font-medium flex gap-2"
            size={"lg"}
          >
            <span className="text-sm font-semibold">Upload</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}

export default IdentityVerification;
