import { Link, Navigate, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { DotPulse } from "@uiball/loaders";
import { auth } from "@/firebase config/config";
import { useEffect, useState } from "react";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import useUploadListing from "@/hooks/useUploadListing";
import { BASE_PRICE, PRICE_CAP } from "@/constants/price";

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  thumbnail_url: string;
  format: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: TFileType[];
  price: number;
};

function BecomeAHostLayout() {
  const { mutate, isLoading, status } = useUploadListing();
  const [service, setService] = useState<TListing>({
    serviceType: "Events and Entertainment",
    serviceDescription: "",
    listingPhotos: [],
    price: 0,
  });
  const User = auth.currentUser;
  const {
    step,
    next,
    previous,
    isFetching,
    isLastPage,
    isFirstPage,
    currentStepIndex,
  } = useMultistepForm([
    "overview",
    "about-your-service",
    "service",
    "service-description",
    "make-it-standout",
    "photos",
    "price",
    "success",
  ]);

  useEffect(() => {
    if (status === "success") {
      next();
    }
  }, [next, status]);

  return (
    <main>
      {<Navigate to={`/become-a-host/${User && User.uid}/${step}`} replace />}
      <nav className="bg-white sticky top-0 z-10 py-8 px-16 flex justify-between items-center">
        <Link to={"/"}>
          <span>
            <img
              className="w-[30px] h-[30px]"
              loading="lazy"
              src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
              alt="logo"
            />
          </span>
        </Link>
        <UserDropDownButton />
      </nav>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            service.serviceDescription == null &&
            service.listingPhotos.length < 5
          )
            return console.log("Invalid");
          mutate(service);
        }}
      >
        {<Outlet context={{ setService, service }} />}
        <div className="w-full flex justify-between items-center px-8 py-6">
          {isFirstPage && (
            <Button
              type="button"
              onClick={next}
              size={"lg"}
              className="bg-[#222222] rounded-full text-lg font-semibold p-6"
            >
              {isFetching ? <DotPulse size={40} color="#FFF" /> : "Get started"}
            </Button>
          )}
          {currentStepIndex > 0 &&
            currentStepIndex !== 3 &&
            currentStepIndex !== 5 &&
            currentStepIndex !== 6 &&
            !isLastPage && (
              <>
                <Button
                  type="button"
                  onClick={previous}
                  size={"lg"}
                  variant={"link"}
                  className="text-sm font-medium p-6"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={next}
                  size={"lg"}
                  className="bg-[#222222] rounded-full text-lg font-semibold p-6"
                >
                  {isFetching ? <DotPulse size={40} color="#FFF" /> : "Next"}
                </Button>
              </>
            )}
          {currentStepIndex === 3 && (
            <>
              <Button
                type="button"
                onClick={previous}
                size={"lg"}
                variant={"link"}
                className="text-sm font-medium p-6"
              >
                Back
              </Button>
              <Button
                disabled={!service.serviceDescription}
                type="button"
                onClick={next}
                size={"lg"}
                className="bg-[#222222] rounded-full text-lg font-semibold p-6"
              >
                {isFetching ? <DotPulse size={40} color="#FFF" /> : "Next"}
              </Button>
            </>
          )}
          {currentStepIndex === 5 && (
            <>
              <Button
                disabled={service.listingPhotos.length > 0}
                type="button"
                onClick={previous}
                size={"lg"}
                variant={"link"}
                className="text-sm font-medium p-6"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={next}
                disabled={service.listingPhotos.length < 5}
                size={"lg"}
                className="bg-[#222222] rounded-full text-lg font-semibold p-6"
              >
                {isFetching ? <DotPulse size={40} color="#FFF" /> : "Next"}
              </Button>
            </>
          )}
          {currentStepIndex === 6 && (
            <>
              <Button
                disabled={service.price != null}
                type="button"
                onClick={previous}
                size={"lg"}
                variant={"link"}
                className="text-sm font-medium p-6"
              >
                Back
              </Button>
              <Button
                disabled={
                  service.price < BASE_PRICE || service.price > PRICE_CAP
                }
                size={"lg"}
                className="bg-[#222222] rounded-full text-lg font-semibold p-6"
              >
                {isLoading ? <DotPulse size={40} color="#FFF" /> : "Finish"}
              </Button>
            </>
          )}
          {isLastPage && (
            <>
              <Button
                type="button"
                size={"lg"}
                className="bg-[#222222] rounded-full text-lg font-semibold p-6"
              >
                {isLoading ? (
                  <DotPulse size={40} color="#FFF" />
                ) : (
                  "Check your listing"
                )}
              </Button>
            </>
          )}
        </div>
      </form>
    </main>
  );
}

export default BecomeAHostLayout;
