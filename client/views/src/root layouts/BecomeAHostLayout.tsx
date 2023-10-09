import { Link, Navigate, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { DotPulse } from "@uiball/loaders";
import { auth } from "@/firebase config/config";
import { useState } from "react";
import UserDropDownButton from "@/partials/components/UserDropDownButton";

type TServiceType = {
  serviceType: string;
  serviceDescription?: string;
};

function BecomeAHostLayout() {
  const [service, setService] = useState<TServiceType>({
    serviceType: "Events and Entertainment",
    serviceDescription: "",
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
  ]);

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
          next();
          console.log(service);
        }}
      >
        {<Outlet context={{ setService, service }} />}
        <div className="w-full flex justify-between items-center px-8 py-6">
          {!isFirstPage && (
            <Button
              type="button"
              onClick={previous}
              variant={"link"}
              className="font-medium p-6"
            >
              Back
            </Button>
          )}
          {!isLastPage && (
            <Button
              size={"lg"}
              className="bg-[#222222] rounded-full text-lg font-semibold p-6"
            >
              {isFetching ? (
                <DotPulse size={40} color="#FFF" />
              ) : currentStepIndex > 0 ? (
                "Next"
              ) : (
                "Get started"
              )}
            </Button>
          )}
          {isLastPage && (
            <Button
              size={"lg"}
              className="bg-[#222222] rounded-full text-lg font-semibold p-6"
            >
              Done
            </Button>
          )}
        </div>
      </form>
    </main>
  );
}

export default BecomeAHostLayout;
