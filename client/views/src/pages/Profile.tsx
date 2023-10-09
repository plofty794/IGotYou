import { Suspense, lazy, useEffect, useState } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
import { Link } from "react-router-dom";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import PromptUsername from "@/partials/components/PromptUsername";
import { DotPulse } from "@uiball/loaders";

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent")
);

function Profile() {
  const { data } = useGetUserProfile();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = "IGotYou - Profile";
    setTimeout(() => {
      setIsLoaded(true);
    }, 1100);
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F2F2] pb-10">
      <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
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
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <UserDropDownButton />
        </ul>
      </nav>
      {isLoaded ? (
        <Suspense fallback={<ProfileLoader />}>
          {data?.data.username ? (
            <ProfileContent data={data} />
          ) : (
            <PromptUsername />
          )}
        </Suspense>
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center">
          <DotPulse color="#222222" size={50} />
        </div>
      )}
    </main>
  );
}

export default Profile;
